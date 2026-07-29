'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calc,
  defaultState,
  migrateState,
  normalizeWeights,
  stablePair,
  weightedGeometric,
} = require('../src/ahp-core.js');

test('完全一致矩阵给出预期权重和零 CR', () => {
  const result = calc(['A', 'B', 'C'], [2, 6, 3]);
  assert.equal(result.valid, true);
  assert.ok(Math.abs(result.cr) < 1e-10);
  assert.deepEqual(result.w.map((value) => +value.toFixed(6)), [0.6, 0.3, 0.1]);
});

test('空矩阵和非法判断值被标记为无效', () => {
  assert.equal(calc([], []).valid, false);
  assert.equal(calc(['A', 'B'], [0]).valid, false);
});

test('群体判断使用成员权重的加权几何平均', () => {
  const value = weightedGeometric([4, 9], [1, 3]);
  assert.ok(Math.abs(value - Math.exp((Math.log(4) + 3 * Math.log(9)) / 4)) < 1e-12);
  assert.throws(() => weightedGeometric([4, 9], [0, 0]), /权重总和/);
});

test('ABC 入选权重重新归一化且保留原始权重', () => {
  const items = normalizeWeights([{ id: 'a', weight: 0.5 }, { id: 'b', weight: 0.3 }]);
  assert.equal(items.reduce((sum, item) => sum + item.weight, 0), 1);
  assert.deepEqual(items.map((item) => item.rawWeight), [0.5, 0.3]);
});

test('旧版索引键迁移为稳定 ID 键', () => {
  const legacy = defaultState();
  delete legacy.schemaVersion;
  legacy.criteriaIds = undefined;
  legacy.alternativeIds = undefined;
  legacy.people = [{ name: '甲', weight: 1 }];
  legacy.child = { 0: ['子项'] };
  legacy.childIds = {};
  legacy.judges = { 'criteria|root|0': { '0-1': 3 } };
  const migrated = migrateState(legacy);
  const key = `criteria|root|${migrated.people[0].id}`;
  assert.equal(migrated.judges[key][stablePair(migrated.criteriaIds, 0, 1)], 3);
});

test('导入校验拒绝结构损坏、零总权重和非法 ID', () => {
  assert.throws(() => migrateState({ ...defaultState(), judges: null }), /judges/);
  assert.throws(
    () => migrateState({ ...defaultState(), method: 'weighted', people: [{ name: '甲', weight: 0 }] }),
    /权重总和/,
  );
  const invalidId = defaultState();
  invalidId.criteriaIds[0] = '<script>';
  assert.throws(() => migrateState(invalidId), /非法 ID/);
});

test('稳定配对键不随显示名称变化', () => {
  const ids = ['criterion-a', 'criterion-b'];
  assert.equal(stablePair(ids, 0, 1), 'criterion-a~criterion-b');
  assert.equal(stablePair(ids, 1, 0), 'criterion-a~criterion-b');
});
