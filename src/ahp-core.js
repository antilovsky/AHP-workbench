(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AHPCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DATA_VERSION = 2;
  const RI = {
    1: 0, 2: 0, 3: 0.58, 4: 0.90, 5: 1.12,
    6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49,
    11: 1.51, 12: 1.48, 13: 1.56, 14: 1.57, 15: 1.59,
  };

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function defaultState() {
    return {
      schemaVersion: DATA_VERSION,
      goal: '选择最佳方案',
      criteria: ['指标 1', '指标 2', '指标 3'],
      criteriaIds: [uid('criterion'), uid('criterion'), uid('criterion')],
      alternatives: ['方案 A', '方案 B', '方案 C'],
      alternativeIds: [uid('alternative'), uid('alternative'), uid('alternative')],
      group: false,
      method: 'geo',
      people: [{ id: uid('person'), name: '决策者 1', weight: 1 }],
      active: 0,
      child: {},
      childIds: {},
      childOpen: {},
      judges: {},
      minMode: false,
      minimums: {},
      childMinimums: {},
      matrixModes: {},
      graphs: {},
      graphFits: {},
      graphVersion: 2,
    };
  }

  function validObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function validId(value) {
    return typeof value === 'string' && /^[A-Za-z0-9_-]+$/.test(value);
  }

  function pairs(n) {
    const result = [];
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) result.push([i, j]);
    }
    return result;
  }

  function stablePair(ids, i, j) {
    return `${ids[Math.min(i, j)]}~${ids[Math.max(i, j)]}`;
  }

  function migrateState(raw) {
    if (!validObject(raw)) throw new Error('决策数据必须是对象');
    const legacy = raw.schemaVersion !== DATA_VERSION;
    const state = { ...defaultState(), ...raw };

    if (typeof state.goal !== 'string') throw new Error('决策课题必须是文本');
    if (
      !Array.isArray(state.criteria)
      || state.criteria.length < 1
      || state.criteria.length > 15
      || state.criteria.some((item) => typeof item !== 'string')
    ) throw new Error('评估指标必须为 1–15 个文本项');
    if (
      !Array.isArray(state.alternatives)
      || state.alternatives.length < 2
      || state.alternatives.length > 15
      || state.alternatives.some((item) => typeof item !== 'string')
    ) throw new Error('候选方案必须为 2–15 个文本项');
    if (
      !Array.isArray(state.people)
      || state.people.length < 1
      || state.people.some((person) => (
        !validObject(person)
        || typeof person.name !== 'string'
        || !Number.isFinite(+person.weight)
        || +person.weight < 0
      ))
    ) throw new Error('群决策成员或权重无效');
    if (!['geo', 'weighted'].includes(state.method)) throw new Error('群体汇总方式无效');
    if (
      state.method === 'weighted'
      && state.people.reduce((sum, person) => sum + (+person.weight || 0), 0) <= 0
    ) throw new Error('成员权重总和必须大于 0');

    const objectFields = [
      'child', 'childOpen', 'judges', 'minimums', 'childMinimums',
      'matrixModes', 'graphs', 'graphFits',
    ];
    objectFields.forEach((key) => {
      if (!validObject(state[key])) throw new Error(`${key} 数据无效`);
    });

    state.criteriaIds = (
      Array.isArray(state.criteriaIds) && state.criteriaIds.length === state.criteria.length
        ? state.criteriaIds.map(String)
        : state.criteria.map(() => uid('criterion'))
    );
    state.alternativeIds = (
      Array.isArray(state.alternativeIds)
      && state.alternativeIds.length === state.alternatives.length
        ? state.alternativeIds.map(String)
        : state.alternatives.map(() => uid('alternative'))
    );
    state.people = state.people.map((person) => ({
      id: typeof person.id === 'string' && person.id ? person.id : uid('person'),
      name: person.name,
      weight: +person.weight,
    }));

    const topLevelIds = [
      ...state.criteriaIds,
      ...state.alternativeIds,
      ...state.people.map((person) => person.id),
    ];
    if (topLevelIds.some((id) => !validId(id))) throw new Error('数据中存在非法 ID');
    if (
      new Set(state.criteriaIds).size !== state.criteriaIds.length
      || new Set(state.alternativeIds).size !== state.alternativeIds.length
      || new Set(state.people.map((person) => person.id)).size !== state.people.length
    ) throw new Error('数据中存在重复 ID');

    const oldChild = state.child;
    const oldChildIds = state.childIds || {};
    const oldMinimums = state.minimums;
    const oldChildMinimums = state.childMinimums;
    const oldOpen = state.childOpen;
    const child = {};
    const childIds = {};
    const minimums = {};
    const childMinimums = {};
    const childOpen = {};

    state.criteria.forEach((_, index) => {
      const criterionId = state.criteriaIds[index];
      const children = legacy ? (oldChild[index] || []) : (oldChild[criterionId] || []);
      if (
        !Array.isArray(children)
        || children.length > 15
        || children.some((item) => typeof item !== 'string')
      ) throw new Error('子指标数据无效');
      child[criterionId] = children;

      const ids = legacy ? [] : (oldChildIds[criterionId] || []);
      childIds[criterionId] = (
        Array.isArray(ids) && ids.length === children.length
          ? ids.map(String)
          : children.map(() => uid('subcriterion'))
      );
      if (
        childIds[criterionId].some((id) => !validId(id))
        || new Set(childIds[criterionId]).size !== childIds[criterionId].length
      ) throw new Error('子指标 ID 无效或重复');

      const minimum = legacy ? oldMinimums[index] : oldMinimums[criterionId];
      if (minimum != null) minimums[criterionId] = String(minimum);
      childOpen[criterionId] = Boolean(legacy ? oldOpen[index] : oldOpen[criterionId]);

      children.forEach((__, childIndex) => {
        const childId = childIds[criterionId][childIndex];
        const value = legacy
          ? oldChildMinimums[`c${index}-${childIndex}`]
          : oldChildMinimums[childId];
        if (value != null) childMinimums[childId] = String(value);
      });
    });

    const allSubjectIds = [...state.criteriaIds, ...Object.values(childIds).flat()];
    if (new Set(allSubjectIds).size !== allSubjectIds.length) {
      throw new Error('指标与子指标 ID 必须全局唯一');
    }
    state.child = child;
    state.childIds = childIds;
    state.minimums = minimums;
    state.childMinimums = childMinimums;
    state.childOpen = childOpen;

    if (legacy) {
      const remapSubject = (type, subject) => {
        if (type === 'criteria') return 'root';
        if (type === 'child') return state.criteriaIds[+subject];
        if (type === 'alternative') {
          const match = /^c(\d+)(?:-(\d+))?$/.exec(subject);
          if (!match) return subject;
          const criterionId = state.criteriaIds[+match[1]];
          return match[2] == null
            ? criterionId
            : state.childIds[criterionId]?.[+match[2]];
        }
        return subject;
      };
      const remapIds = (type, subject) => {
        if (type === 'criteria') return state.criteriaIds;
        if (type === 'child') return state.childIds[subject] || [];
        if (type === 'alternative') {
          return [...state.alternativeIds, `minimum:${subject}`];
        }
        return [];
      };

      const judges = {};
      Object.entries(state.judges).forEach(([oldKey, values]) => {
        if (!validObject(values)) throw new Error('判断矩阵数据无效');
        const [type, oldSubject, personIndex] = oldKey.split('|');
        const subject = remapSubject(type, oldSubject);
        const person = state.people[+personIndex];
        if (!subject || !person) return;
        const ids = remapIds(type, subject);
        const target = {};
        Object.entries(values).forEach(([pair, value]) => {
          const match = /^(\d+)-(\d+)$/.exec(pair);
          const numericValue = +value;
          if (!match || !Number.isFinite(numericValue) || numericValue <= 0) return;
          const i = +match[1];
          const j = +match[2];
          if (ids[i] && ids[j]) target[stablePair(ids, i, j)] = numericValue;
        });
        judges[`${type}|${subject}|${person.id}`] = target;
      });

      const modes = {};
      Object.entries(state.matrixModes).forEach(([oldKey, mode]) => {
        const [type, oldSubject] = oldKey.split('|');
        const subject = remapSubject(type, oldSubject);
        if (subject && ['graph', 'scale', 'input'].includes(mode)) {
          modes[`${type}|${subject}`] = mode;
        }
      });
      state.judges = judges;
      state.matrixModes = modes;
      state.graphs = {};
      state.graphFits = {};
    }

    Object.values(state.judges).forEach((values) => {
      if (
        !validObject(values)
        || Object.values(values).some((value) => !Number.isFinite(+value) || +value <= 0)
      ) throw new Error('判断值必须是大于 0 的有限数值');
    });
    Object.values(state.graphs).forEach((points) => {
      if (
        !Array.isArray(points)
        || points.some((point) => (
          !validObject(point)
          || !Number.isFinite(+point.x)
          || !Number.isFinite(+point.y)
        ))
      ) throw new Error('图形控件数据无效');
    });
    Object.values(state.graphFits).forEach((fit) => {
      if (
        !validObject(fit)
        || !Number.isFinite(+fit.sourceCr)
        || !Number.isFinite(+fit.error)
      ) throw new Error('图形拟合数据无效');
    });

    state.schemaVersion = DATA_VERSION;
    state.active = Math.max(0, Math.min(state.people.length - 1, +state.active || 0));
    state.group = Boolean(state.group);
    state.minMode = Boolean(state.minMode);
    state.graphVersion = 2;
    if (state.method === 'geo') state.people.forEach((person) => { person.weight = 1; });
    return state;
  }

  function calc(names, pairValues) {
    const n = names.length;
    if (!n) {
      return {
        A: [], w: [], lambda: NaN, ci: NaN, cr: Infinity, valid: false,
      };
    }
    const matrixPairs = pairs(n);
    const valid = (
      pairValues.length === matrixPairs.length
      && pairValues.every((value) => Number.isFinite(value) && value > 0)
    );
    const A = Array.from({ length: n }, () => Array(n).fill(1));
    matrixPairs.forEach(([i, j], index) => {
      const value = valid ? pairValues[index] : 1;
      A[i][j] = value;
      A[j][i] = 1 / value;
    });
    const geometricMeans = A.map((row) => (
      Math.pow(row.reduce((product, value) => product * value, 1), 1 / n)
    ));
    const total = geometricMeans.reduce((sum, value) => sum + value, 0);
    const weights = geometricMeans.map((value) => value / total);
    const aw = A.map((row) => (
      row.reduce((sum, value, index) => sum + value * weights[index], 0)
    ));
    const lambda = aw.reduce(
      (sum, value, index) => sum + value / weights[index],
      0,
    ) / n;
    const ci = n < 3 ? 0 : (lambda - n) / (n - 1);
    const cr = n < 3 ? 0 : ci / (RI[n] || 1.59);
    return {
      A, w: weights, lambda, ci, cr, valid,
    };
  }

  function weightedGeometric(values, weights) {
    if (
      !Array.isArray(values)
      || !Array.isArray(weights)
      || values.length !== weights.length
      || values.some((value) => !Number.isFinite(value) || value <= 0)
      || weights.some((weight) => !Number.isFinite(weight) || weight < 0)
    ) throw new Error('加权几何平均输入无效');
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    if (total <= 0) throw new Error('权重总和必须大于 0');
    return Math.exp(values.reduce(
      (sum, value, index) => sum + (weights[index] / total) * Math.log(value),
      0,
    ));
  }

  function normalizeWeights(items) {
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    if (!Number.isFinite(total) || total <= 0) throw new Error('待归一化权重无效');
    return items.map((item) => ({
      ...item,
      rawWeight: item.weight,
      weight: item.weight / total,
    }));
  }

  return {
    DATA_VERSION,
    RI,
    calc,
    defaultState,
    migrateState,
    normalizeWeights,
    pairs,
    stablePair,
    uid,
    validId,
    validObject,
    weightedGeometric,
  };
});
