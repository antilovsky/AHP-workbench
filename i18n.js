(() => {
  const STORAGE_KEY = 'ahp-workbench-language';
  const supported = ['zh', 'ja', 'en'];
  let language = supported.includes(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : 'zh';

  const exact = {
    ja: {
      'AHP 决策工作台': 'AHP 意思決定ワークベンチ',
      '语言': '言語',
      '说明': '説明',
      '1 设置': '1 設定',
      '2 指标权重': '2 評価基準のウェイト',
      '3 子指标权重': '3 要因のウェイト',
      '4 ABC筛选': '4 ABC分析',
      '5 方案评价': '5 代替案評価',
      '6 结果': '6 結果',
      '3 方案评价': '3 代替案評価',
      '4 结果': '4 結果',
      '决策结构': '意思決定構造',
      '决策课题': '意思決定課題',
      'AHP 流程': 'AHP方式',
      '基本 AHP': '基本AHP',
      '最低期望水平 AHP': '希求水準型AHP',
      '决策模式': '意思決定メンバー数',
      '单人决策': '個人意思決定',
      '群决策': 'グループ意思決定',
      '群体汇总方式': 'グループ集約方法',
      '几何平均（默认）': '幾何平均（デフォールト）',
      '加权平均': '加重平均',
      '评估指标': '評価基準',
      '候选方案': '代替案',
      '子指标（可选）': '要因（任意）',
      '删除': '削除',
      '+ 添加': '+ 追加',
      '+ 添加子指标': '+ 要因を追加',
      '+ 添加成员': '+ メンバーを追加',
      '各评估指标的最低期望水平': '各評価基準の希求水準',
      '各筛选子指标的最低期望水平': '選別された要因の希求水準',
      '导入已保存的决策': '保存済み意思決定の読込み',
      '选择 JSON 文件': 'JSONファイルを選択',
      '当前层次结构图': '現在の階層構造',
      '群决策成员': 'グループ意思決定メンバー',
      '成员权重': 'メンバーのウェイト採点',
      '指标权重': '評価基準のウェイト',
      '指标比较': '評価基準の比較',
      '子指标权重': '要因のウェイト',
      'ABC 筛选': 'ABC分析',
      '全局指标权重（ABC 入选）': '総合基準ウェイト（ABC分析結果）',
      '排序': '順位',
      '子指标': '要因',
      '全局权重': '総合ウェイト',
      '累计权重': '累積ウェイト',
      '方案评价': '代替案評価',
      '排名': '順位',
      '方案': '代替案',
      '综合得分': '総合得点',
      '导出决策数据（JSON）': '意思決定データを書き出す（JSON）',
      '重置工作台': 'ワークベンチをリセット',
      '当前填写人': '現在の入力者',
      '评价方式': '評価方法',
      '图形控件模式': 'グラフィカルモード',
      '标度选择模式': '尺度選択モード',
      '填写模式': '数値入力モード',
      '一致性可接受': '整合性は許容範囲',
      '建议调整判断': '判断の見直しを推奨',
      '较不重要': '重要度が低い',
      '较重要': '重要度が高い',
      '特征值与权重偏差（用于定位可调整评分）': '固有値・ウェイト偏差（評価見直しの特定用）',
      '行 / 列': '行 / 列',
      '查看本矩阵权重与检验': 'この行列のウェイトと検定を表示',
      '什么是 AHP？': 'AHPとは？',
      '使用流程': '利用手順',
      '常见问题': 'よくある質問',
      '为什么采用 1–9 标度？': 'なぜ1–9尺度を使うのですか？',
      '方根法与和积法选哪个？': '幾何平均法と正規化列平均法のどちらを使いますか？',
      '一致性检验不通过怎么办？': '整合性検定を通過しない場合は？',
      '1 阶或 2 阶矩阵还需要一致性检验吗？': '1次・2次行列にも整合性検定は必要ですか？',
      '单层指标数量多少合适？': '1階層の基準数はどの程度が適切ですか？',
      '同等重要／同等优势': '同じぐらい重要／同等じぐらいの優位性',
      '略占优势': 'わずかに優位',
      '较为重要／具备一定优势': 'やや重要／一定の優位性',
      '介于较为与很重要之间': 'やや重要とかなり重要の中間',
      '很重要／具备优势': 'かなり重要／優位性がある',
      '介于很重要与非常重要之间': '重要と非常に重要の中間',
      '非常重要／具备很大优势': '非常に重要／大きな優位性',
      '介于非常与极其重要之间': '非常に重要と極めて重要の中間',
      '极其重要／具备极大优势': '極めて重要／極めて大きな優位性',
      '无效': '無効',
      '未填写': '未入力',
      '暂定结果': '暫定結果',
      '推荐结果': '推奨結果'
      ,'至少保留 1 个评估指标。': '評価基準を少なくとも1件残してください。'
      ,'至少保留 2 个候选方案。': '代替案を少なくとも2件残してください。'
      ,'至少保留 1 名决策成员。': '意思決定メンバーを少なくとも1名残してください。'
      ,'成员权重总和必须大于 0。': 'メンバーのウェイト採点の合計は0より大きくしてください。'
      ,'已导入并验证决策数据。': '意思決定データを読み込み、検証しました。'
      ,'无法读取所选文件。': '選択したファイルを読み込めません。'
      ,'清空当前所有判断？': '現在のすべての判断を消去しますか？'
      ,'博咨达与立命馆大学联合研究': 'ボスター・立命館大学共同研究'
      ,'选择语言': '言語を選択'
      ,'最低期望水平': '希求水準'
      ,'一级评估指标': '第1階層の評価基準'
      ,'群体汇总': 'グループ集約'
      ,'选择文件': 'ファイルを選択'
      ,'未选择任何文件': 'ファイルが選択されていません'
    },
    en: {
      'AHP 决策工作台': 'AHP Decision Workbench',
      '语言': 'Language',
      '说明': 'Guide',
      '1 设置': '1 Setup',
      '2 指标权重': '2 Criteria Weights',
      '3 子指标权重': '3 Subcriteria Weights',
      '4 ABC筛选': '4 ABC Analysis',
      '5 方案评价': '5 Alternative Evaluation',
      '6 结果': '6 Results',
      '3 方案评价': '3 Alternative Evaluation',
      '4 结果': '4 Results',
      '决策结构': 'Decision Structure',
      '决策课题': 'Decision Goal',
      'AHP 流程': 'AHP Method',
      '基本 AHP': 'Basic AHP',
      '最低期望水平 AHP': 'Aspiration-level AHP',
      '决策模式': 'Member(s)',
      '单人决策': 'Individual Decision',
      '群决策': 'Group Decision',
      '群体汇总方式': 'Group Aggregation',
      '几何平均（默认）': 'Geometric Mean (default)',
      '加权平均': 'Weighted Mean',
      '评估指标': 'Evaluation Criteria',
      '候选方案': 'Alternatives',
      '子指标（可选）': 'Subcriteria (optional)',
      '删除': 'Delete',
      '+ 添加': '+ Add',
      '+ 添加子指标': '+ Add subcriterion',
      '+ 添加成员': '+ Add member',
      '各评估指标的最低期望水平': 'Aspiration level for each criterion',
      '各筛选子指标的最低期望水平': 'Aspiration level for selected subcriteria',
      '导入已保存的决策': 'Import a Saved Decision',
      '选择 JSON 文件': 'Choose a JSON file',
      '当前层次结构图': 'Current Hierarchy',
      '群决策成员': 'Group Decision Members',
      '成员权重': 'Member weight',
      '指标权重': 'Criteria Weights',
      '指标比较': 'Criteria Comparison',
      '子指标权重': 'Subcriteria Weights',
      'ABC 筛选': 'ABC Analysis',
      '全局指标权重（ABC 入选）': 'Global Criteria Weights (ABC analysis selected)',
      '排序': 'Rank',
      '子指标': 'Subcriterion',
      '全局权重': 'Global Weight',
      '累计权重': 'Cumulative Weight',
      '方案评价': 'Alternative Evaluation',
      '排名': 'Rank',
      '方案': 'Alternative',
      '综合得分': 'Overall Score',
      '导出决策数据（JSON）': 'Export Decision Data (JSON)',
      '重置工作台': 'Reset Workbench',
      '当前填写人': 'Current respondent',
      '评价方式': 'Evaluation Mode',
      '图形控件模式': 'Graphical Mode',
      '标度选择模式': 'Scale Selection Mode',
      '填写模式': 'Direct Entry Mode',
      '一致性可接受': 'Consistency acceptable',
      '建议调整判断': 'Review judgments',
      '较不重要': 'Less important',
      '较重要': 'More important',
      '特征值与权重偏差（用于定位可调整评分）': 'Eigenvalue–weight deviation (to locate judgments to review)',
      '行 / 列': 'Row / Column',
      '查看本矩阵权重与检验': 'View weights and consistency details',
      '什么是 AHP？': 'What is AHP?',
      '使用流程': 'Workflow',
      '常见问题': 'Frequently Asked Questions',
      '为什么采用 1–9 标度？': 'Why use a 1–9 scale?',
      '方根法与和积法选哪个？': 'Geometric mean or normalized-column mean?',
      '一致性检验不通过怎么办？': 'What if the consistency test fails?',
      '1 阶或 2 阶矩阵还需要一致性检验吗？': 'Do first- or second-order matrices need a consistency test?',
      '单层指标数量多少合适？': 'How many criteria should one level contain?',
      '同等重要／同等优势': 'Equal importance / equal advantage',
      '略占优势': 'Slight advantage',
      '较为重要／具备一定优势': 'Moderately more important / some advantage',
      '介于较为与很重要之间': 'Between moderate and strong',
      '很重要／具备优势': 'Strongly more important / clear advantage',
      '介于很重要与非常重要之间': 'Between strong and very strong',
      '非常重要／具备很大优势': 'Very strongly more important / major advantage',
      '介于非常与极其重要之间': 'Between very strong and extreme',
      '极其重要／具备极大优势': 'Extremely more important / extreme advantage',
      '无效': 'Invalid',
      '未填写': 'Not entered',
      '暂定结果': 'Provisional Result',
      '推荐结果': 'Recommended Result'
      ,'至少保留 1 个评估指标。': 'Keep at least one evaluation criterion.'
      ,'至少保留 2 个候选方案。': 'Keep at least two alternatives.'
      ,'至少保留 1 名决策成员。': 'Keep at least one decision member.'
      ,'成员权重总和必须大于 0。': 'The total member weight must be greater than 0.'
      ,'已导入并验证决策数据。': 'Decision data imported and validated.'
      ,'无法读取所选文件。': 'The selected file could not be read.'
      ,'清空当前所有判断？': 'Clear all current judgments?'
      ,'博咨达与立命馆大学联合研究': 'Joint research by Bozida and Ritsumeikan University'
      ,'选择语言': 'Choose language'
      ,'最低期望水平': 'Aspiration level'
      ,'一级评估指标': 'Top-level evaluation criteria'
      ,'群体汇总': 'Group aggregate'
      ,'选择文件': 'Choose File'
      ,'未选择任何文件': 'No file selected'
    }
  };

  const paragraphs = {
    ja: {
      '最多 15 项；项目较多时建议通过子指标建立层次结构。': '最大15項です。項目が多い場合は、要因を使って階層化してください。',
      '添加后会启用“子指标权重”和“ABC 筛选”页面。': '追加すると「要因のウェイト」と「ABC分析」ページが有効になります。',
      '填写可接受的最低标准（如“客户满意度 ≥ 85 分”）。在方案评价时，系统会把它作为一个基准方案加入成对比较。': '許容できる希求基準（例：「顧客満足度 85点以上」）を入力します。代替案評価では基準案として一対比較に追加されます。',
      'ABC 入选的子指标将以此最低期望水平作为基准方案参与方案评价。未填写时，方案评价页会提示补充。': 'ABC分析で選定された要因は、この希求水準を基準案として代替案評価に参加します。未入力の場合は評価ページで通知します。',
      '选择由本工作台导出的 JSON 文件，可恢复课题、指标、方案、成员、全部成对比较及结果设置。': '本ワークベンチから書き出したJSONを選ぶと、課題、基準、代替案、メンバー、すべての一対比較、結果設定を復元できます。',
      '标度选择模式下评分使用 Saaty 1–9 标度；系统使用方根法（行几何平均）计算权重，并按 RI 表计算 CR。一致性建议：CR ≤ 0.10。': '尺度選択モードではSaatyの1–9尺度を使用します。ウェイトは幾何平均法（行の幾何平均）で計算し、RI表からCRを算出します。整合性の目安は CR ≤ 0.10 です。',
      '几何平均模式下，各成员权重均等。如要为成员设置不同权重，请选择“加权平均”作为群体汇总方式。': '幾何平均では全メンバーを同じウェイトで扱います。異なるウェイトを設定する場合は、集約方法に「加重平均」を選択してください。',
      '可为成员设置相对权重。': 'メンバーごとの相対的なウェイトを設定できます。',
      '逐对判断“行指标相对于列指标”的重要性。群决策时，页面会按选择的方法聚合每个人的判断。': '行の基準が列の基準に対してどれだけ重要かを一対ずつ判断します。グループ意思決定では、選択した方法で各メンバーの判断を集約します。',
      '这里展示所有已添加子指标的权重矩阵。逐对判断“行指标相对于列指标”的重要性。群决策时，页面会按选择的方法聚合每个人的判断。': '追加したすべての要因のウェイト行列を表示します。行と列の重要度を一対ずつ判断し、グループの場合は選択した方法で集約します。',
      '柱形为全局权重，红线为累计权重；橙色虚线为 80%。蓝色柱为入选项，按累计前 80%且最多 15 项筛选。': '棒は総合ウェイト、赤線は累積ウェイト、オレンジの破線は80%を示します。青い棒が選定項目で、累積80%まで、最大15項を採用します。',
      '向右表示更重要；点击两点查看投影关系': '右ほど重要です。2点を選ぶと投影関係を表示します',
      '选中两点后，投影线从较不重要一方的 1 开始，按对数间距显示至另一端的连续相对重要度。': '2点を選ぶと、重要度の低い側を1として、もう一方までの連続的な相対重要度を対数間隔で表示します。',
      '单元格显示 |aᵢⱼ × wⱼ − (Aw)ᵢ|。每一行中，最小偏差为白色、最大偏差为红色，中间值按比例渐变；可优先复核颜色更深的评分。': 'セルには |aᵢⱼ × wⱼ − (Aw)ᵢ| を表示します。各行の最小偏差は白、最大偏差は赤、中間値は比例した色で示します。色の濃い判断から確認してください。',
      '对每个参与评价的指标，比较候选方案的优劣。': '評価に使う各基準について、代替案を一対比較します。',
      'AHP（Analytic Hierarchy Process，层次分析法）由 Thomas L. Saaty 于 1971 年提出，用于在不确定或评价因素较多的决策情境中，基于要素重要度的两两比较来辅助选择。': 'AHP（Analytic Hierarchy Process、階層分析法）はThomas L. Saatyが1971年に提唱した手法で、不確実性や多数の評価要因を含む意思決定において、要素の重要度を一対比較して選択を支援します。',
      '它的特点是先建立与决策有关的层次结构：决策课题位于顶层，评估指标位于中间层，多个候选方案位于底层；当指标需要进一步细分时，可以增加子指标层。随后通过两两比较得到权重，并据此对方案进行综合排序。': 'まず、意思決定課題を最上位、評価基準を中間層、代替案を最下位に置く階層を作ります。必要に応じて要因を追加し、一対比較からウェイトを求めて代替案を総合順位付けします。',
      '在“设置”中填写课题、评估指标与候选方案。': '「設定」で課題、評価基準、代替案を入力します。',
      '在指标和方案矩阵中按 Saaty 1–9 标度完成两两比较。': '基準と代替案の行列でSaatyの1–9尺度による一対比較を行います。',
      '查看 CR 一致性检验；若偏高，可参考“特征值与权重偏差”优先复核相关评分。': 'CR整合性を確認し、高い場合は「固有値・ウェイト偏差」を参考に判断を見直します。',
      '如有子指标，先完成子指标权重并在 ABC 页面确认入选项，再进行方案评价。': '要因がある場合はウェイトを決定し、ABCページで選定項目を確認してから代替案を評価します。',
      '在结果页查看综合排序，并可导出 JSON 保存当前决策。': '結果ページで総合順位を確認し、JSONとして保存できます。',
      '心理学研究认为，人们对两个事物属性的差异通常能较可靠地区分约 5–9 个等级。1–9 标度既能表达重要度差异，也不会因刻度过细而降低判断稳定性。': '心理学研究では、人は2つの対象の属性差をおよそ5～9段階で比較的安定して識別できるとされます。1–9尺度は差を表現しつつ、細かすぎる尺度による判断の不安定化を避けます。',
      '两者计算的权重通常非常接近。方根法（行几何平均法）先计算判断矩阵各行的几何平均数，再归一化得到权重；和积法则先按列归一化、再求行均值。本工作台采用方根法。': '両者のウェイトは通常ほぼ同じです。幾何平均法は各行の幾何平均を正規化し、正規化列平均法は列ごとに正規化して行平均を求めます。本ワークベンチは幾何平均法を採用します。',
      'CR ≤ 0.10 一般视为满足一致性。若 CR > 0.10，请检查是否出现逻辑矛盾，例如“甲比乙重要、乙比丙重要，却判断丙明显比甲重要”。可优先调整偏差较大的评分。0.10–0.15 在部分初步研究中可接受，但应说明理由；CR > 0.15 建议重新评估。': 'CR ≤ 0.10 は一般に整合的とみなします。CR > 0.10 の場合は論理矛盾がないか確認し、偏差の大きい判断から見直してください。0.10–0.15を予備的研究で許容する場合は理由を明示し、CR > 0.15 は再評価を推奨します。',
      '不需要。此时随机一致性指标 RI 为 0，且判断矩阵天然完全一致。': '不要です。この場合RIは0で、判断行列は必ず完全整合となります。',
      '经典 Saaty RI 表可覆盖到 15 阶，但指标过多会显著增加判断难度。超过 15 项时，建议通过子指标建立层次结构后分组比较。': '標準的なSaaty RI表は15次まで対応しますが、基準が多いほど判断は難しくなります。15項を超える場合は要因で階層化し、グループごとに比較してください。'
      ,'最低期望水平会作为最后一列基准方案；最终排序将包含该基准。': '希求水準は最終列の基準案として追加され、最終順位にも含まれます。'
      ,'请先回到“设置”页，在“各筛选子指标的最低期望水平”中填写基准。': '先に「設定」へ戻り、「選別された要因の希求水準」で基準を入力してください。'
      ,'ABC 分析后，入选项参与方案综合评价；入选权重已重新归一化为 100%。': 'ABC分析後、選定項目が代替案の総合評価に参加し、選定項目のウェイトは100%に再正規化されます。'
      ,'以“最低期望水平”为基准，排名低于该基准的方案及其低于基准的指标得分以红色显示。': '「希求水準」を基準とし、それより順位が低い代替案と基準を下回る項目得点を赤で表示します。'
      ,'一致性检查未全部通过，本结果仅供复核。': 'すべての整合性検定を通過していないため、この結果は確認用です。'
      ,'ABC 分析筛选后，仅突出显示入选子指标；未入选项已排除。': 'ABC分析後は選定された要因のみを強調し、未選定項目は除外します。'
      ,'已显示子指标层。': '要因層を表示しています。'
    },
    en: {
      '最多 15 项；项目较多时建议通过子指标建立层次结构。': 'Up to 15 items. For larger sets, organize the decision into subcriteria.',
      '添加后会启用“子指标权重”和“ABC 筛选”页面。': 'Adding subcriteria enables the Subcriteria Weights and ABC Analysis pages.',
      '填写可接受的最低标准（如“客户满意度 ≥ 85 分”）。在方案评价时，系统会把它作为一个基准方案加入成对比较。': 'Enter the minimum acceptable standard (for example, “Customer satisfaction ≥ 85”). It will be added as a reference alternative during evaluation.',
      'ABC 入选的子指标将以此最低期望水平作为基准方案参与方案评价。未填写时，方案评价页会提示补充。': 'For ABC analysis-selected subcriteria, this aspiration level becomes the reference alternative. Missing values will be flagged on the evaluation page.',
      '选择由本工作台导出的 JSON 文件，可恢复课题、指标、方案、成员、全部成对比较及结果设置。': 'Choose a JSON file exported by this workbench to restore the goal, criteria, alternatives, members, pairwise judgments, and result settings.',
      '标度选择模式下评分使用 Saaty 1–9 标度；系统使用方根法（行几何平均）计算权重，并按 RI 表计算 CR。一致性建议：CR ≤ 0.10。': 'Scale Selection Mode uses the Saaty 1–9 scale. Weights are calculated with the row geometric mean method, and CR is calculated from the RI table. Recommended consistency: CR ≤ 0.10.',
      '几何平均模式下，各成员权重均等。如要为成员设置不同权重，请选择“加权平均”作为群体汇总方式。': 'Geometric aggregation gives every member equal weight. To use different member weights, select Weighted Mean.',
      '可为成员设置相对权重。': 'You can assign relative weights to members.',
      '逐对判断“行指标相对于列指标”的重要性。群决策时，页面会按选择的方法聚合每个人的判断。': 'Judge how important each row criterion is relative to each column criterion. For group decisions, individual judgments are aggregated using the selected method.',
      '这里展示所有已添加子指标的权重矩阵。逐对判断“行指标相对于列指标”的重要性。群决策时，页面会按选择的方法聚合每个人的判断。': 'This page shows the weight matrices for all added subcriteria. Compare each row against each column; group judgments are aggregated using the selected method.',
      '柱形为全局权重，红线为累计权重；橙色虚线为 80%。蓝色柱为入选项，按累计前 80%且最多 15 项筛选。': 'Bars show global weights and the red line shows cumulative weight. The orange dashed line marks 80%. Blue bars are selected items: the leading 80%, up to 15 items.',
      '向右表示更重要；点击两点查看投影关系': 'Farther right means more important; select two points to view their projection',
      '选中两点后，投影线从较不重要一方的 1 开始，按对数间距显示至另一端的连续相对重要度。': 'After selecting two points, the projection starts at 1 for the less important item and shows the continuous relative importance to the other endpoint on logarithmic spacing.',
      '单元格显示 |aᵢⱼ × wⱼ − (Aw)ᵢ|。每一行中，最小偏差为白色、最大偏差为红色，中间值按比例渐变；可优先复核颜色更深的评分。': 'Each cell shows |aᵢⱼ × wⱼ − (Aw)ᵢ|. Within each row, the smallest deviation is white, the largest is red, and intermediate values use a proportional gradient. Review darker judgments first.',
      '对每个参与评价的指标，比较候选方案的优劣。': 'Compare the alternatives for every criterion included in the evaluation.',
      'AHP（Analytic Hierarchy Process，层次分析法）由 Thomas L. Saaty 于 1971 年提出，用于在不确定或评价因素较多的决策情境中，基于要素重要度的两两比较来辅助选择。': 'AHP (Analytic Hierarchy Process), introduced by Thomas L. Saaty in 1971, supports choices under uncertainty or with many evaluation factors by comparing their relative importance in pairs.',
      '它的特点是先建立与决策有关的层次结构：决策课题位于顶层，评估指标位于中间层，多个候选方案位于底层；当指标需要进一步细分时，可以增加子指标层。随后通过两两比较得到权重，并据此对方案进行综合排序。': 'It first builds a hierarchy with the decision goal at the top, criteria in the middle, and alternatives at the bottom. Subcriteria can be added when needed. Pairwise comparisons then produce weights used to rank the alternatives.',
      '在“设置”中填写课题、评估指标与候选方案。': 'Enter the goal, evaluation criteria, and alternatives under Setup.',
      '在指标和方案矩阵中按 Saaty 1–9 标度完成两两比较。': 'Complete the pairwise comparisons in the criteria and alternative matrices using the Saaty 1–9 scale.',
      '查看 CR 一致性检验；若偏高，可参考“特征值与权重偏差”优先复核相关评分。': 'Check the CR consistency result. If it is high, use the eigenvalue–weight deviation panel to identify judgments to review first.',
      '如有子指标，先完成子指标权重并在 ABC 页面确认入选项，再进行方案评价。': 'If subcriteria are used, complete their weights and confirm the selected items on the ABC page before evaluating alternatives.',
      '在结果页查看综合排序，并可导出 JSON 保存当前决策。': 'Review the overall ranking on the Results page and export JSON to save the decision.',
      '心理学研究认为，人们对两个事物属性的差异通常能较可靠地区分约 5–9 个等级。1–9 标度既能表达重要度差异，也不会因刻度过细而降低判断稳定性。': 'Research in psychology suggests that people can distinguish roughly five to nine levels of difference with reasonable reliability. The 1–9 scale expresses meaningful differences without making judgments unstable through excessive precision.',
      '两者计算的权重通常非常接近。方根法（行几何平均法）先计算判断矩阵各行的几何平均数，再归一化得到权重；和积法则先按列归一化、再求行均值。本工作台采用方根法。': 'The two methods usually produce very similar weights. The geometric mean method normalizes the geometric mean of each row; the normalized-column method normalizes each column and averages the rows. This workbench uses the geometric mean method.',
      'CR ≤ 0.10 一般视为满足一致性。若 CR > 0.10，请检查是否出现逻辑矛盾，例如“甲比乙重要、乙比丙重要，却判断丙明显比甲重要”。可优先调整偏差较大的评分。0.10–0.15 在部分初步研究中可接受，但应说明理由；CR > 0.15 建议重新评估。': 'CR ≤ 0.10 is generally considered consistent. If CR > 0.10, check for logical contradictions and review judgments with larger deviations first. Values from 0.10 to 0.15 may be accepted in some exploratory studies if justified; CR > 0.15 should be reassessed.',
      '不需要。此时随机一致性指标 RI 为 0，且判断矩阵天然完全一致。': 'No. In these cases RI is 0 and the judgment matrix is inherently fully consistent.',
      '经典 Saaty RI 表可覆盖到 15 阶，但指标过多会显著增加判断难度。超过 15 项时，建议通过子指标建立层次结构后分组比较。': 'The standard Saaty RI table covers matrices up to order 15, but too many criteria make judgments much harder. For more than 15 items, create a hierarchy with subcriteria and compare them in groups.'
      ,'最低期望水平会作为最后一列基准方案；最终排序将包含该基准。': 'The aspiration level is added as the reference alternative in the last column and is included in the final ranking.'
      ,'请先回到“设置”页，在“各筛选子指标的最低期望水平”中填写基准。': 'Return to Setup and enter the reference values under “Aspiration level for selected subcriteria”.'
      ,'ABC 分析后，入选项参与方案综合评价；入选权重已重新归一化为 100%。': 'After ABC analysis, selected items participate in the overall alternative evaluation and their weights are renormalized to 100%.'
      ,'以“最低期望水平”为基准，排名低于该基准的方案及其低于基准的指标得分以红色显示。': 'Using the aspiration level as the benchmark, alternatives ranked below it and criterion scores below the benchmark are shown in red.'
      ,'一致性检查未全部通过，本结果仅供复核。': 'Not all consistency checks passed; use this result for review only.'
      ,'ABC 分析筛选后，仅突出显示入选子指标；未入选项已排除。': 'After ABC analysis, only selected subcriteria are emphasized; unselected items are excluded.'
      ,'已显示子指标层。': 'The subcriteria level is shown.'
    }
  };

  const defaults = {
    zh: {
      goal: '选择最佳方案',
      criteria: ['指标 1', '指标 2', '指标 3'],
      alternatives: ['方案 A', '方案 B', '方案 C'],
      person: n => `决策者 ${n}`,
      child: n => `子指标 ${n}`,
      criterion: '新指标',
      alternative: '新方案'
    },
    ja: {
      goal: '最適な代替案を選ぶ',
      criteria: ['評価基準 1', '評価基準 2', '評価基準 3'],
      alternatives: ['代替案 A', '代替案 B', '代替案 C'],
      person: n => `意思決定者 ${n}`,
      child: n => `要因 ${n}`,
      criterion: '新しい評価基準',
      alternative: '新しい代替案'
    },
    en: {
      goal: 'Select the best alternative',
      criteria: ['Criterion 1', 'Criterion 2', 'Criterion 3'],
      alternatives: ['Alternative A', 'Alternative B', 'Alternative C'],
      person: n => `Decision maker ${n}`,
      child: n => `Subcriterion ${n}`,
      criterion: 'New criterion',
      alternative: 'New alternative'
    }
  };

  function translateExact(value) {
    if (language === 'zh') return value;
    return exact[language][value] || paragraphs[language][value] || value;
  }

  function translateDynamic(value) {
    if (language === 'zh') return value;
    const ja = language === 'ja';
    let out = translateExact(value);
    if (out !== value) return out;
    Object.entries(paragraphs[language])
      .sort((a, b) => b[0].length - a[0].length)
      .forEach(([source, target]) => {
        if (out.includes(source)) out = out.split(source).join(target);
      });
    const replacements = [
      [/^（(\d+) 个子指标）$/, ja ? '（$1件の要因）' : ' ($1 subcriteria)'],
      [/^权重 ([\d.]+%)$/, ja ? 'ウェイト $1' : 'Weight $1'],
      [/^其余 (\d+) 项已由 ABC 分析筛选排除$/, ja ? '残り$1項はABC分析で除外されました' : '$1 remaining item(s) excluded by ABC analysis'],
      [/^课题 → 评估指标( → 子指标)? → 候选方案$/, ja ? '課題 → 評価基準$1 → 代替案' : 'Goal → Criteria$1 → Alternatives'],
      [/^最低期望：(.+)$/, ja ? '希求水準：$1' : 'Minimum expectation: $1'],
      [/^当前填写人的 CR：([\d.]+)；页首 CR 为群体汇总后的结果。$/, ja ? '現在の入力者のCR：$1。上部のCRはグループ集約結果です。' : 'Current respondent CR: $1. The CR above is the group aggregate.'],
      [/^仅有一个子指标「(.+)」，自动继承该一级指标的全部权重，无需成对比较。$/, ja ? '要因「$1」は1件のみのため、上位基準のウェイトをすべて継承し、一対比較は不要です。' : 'There is only one subcriterion, “$1”, so it inherits the full parent weight and needs no pairwise comparison.'],
      [/^(.+) 的子指标比较$/, ja ? '$1 の要因比較' : '$1 — Subcriteria Comparison'],
      [/^按「(.+)」评价方案$/, ja ? '「$1」による代替案評価' : 'Evaluate Alternatives by “$1”'],
      [/^本页仅显示 ABC 筛选后的指标：(\d+) \/ (\d+) 项。$/, ja ? 'このページにはABC分析後の基準のみを表示します：$1 / $2項。' : 'This page shows only criteria selected by ABC analysis: $1 of $2.'],
      [/^当前仍有 (\d+) 项未填写。$/, ja ? '現在$1項が未入力です。' : '$1 item(s) are still missing.'],
      [/^全部 (\d+) 个相关矩阵均通过一致性检验。$/, ja ? '関連する全$1行列が整合性検定を通過しました。' : 'All $1 relevant matrices passed the consistency test.'],
      [/^共检查 (\d+) 个矩阵，(\d+) 个需要调整：$/, ja ? '$1行列を検査し、$2行列で見直しが必要です：' : '$1 matrices checked; $2 require revision:'],
      [/^(.+)：暂定结果$/, ja ? '$1：暫定結果' : '$1: Provisional Result'],
      [/^(.+)：推荐结果$/, ja ? '$1：推奨結果' : '$1: Recommended Result'],
      [/^切换前矩阵的 CR 为 ([\d.]+)。图形模式已用对数最小二乘法投影为最接近的一维一致解；原有判断的平均对数偏差为 ([\d.]+)，图形表格将显示该投影后的连续值。$/, ja ? '切替前の行列のCRは$1です。グラフィカルモードでは対数最小二乗法により最も近い一次元整合解へ投影しました。元の判断の平均対数偏差は$2で、表には投影後の連続値を表示します。' : 'The matrix CR before switching was $1. Graphical Mode projected it to the nearest one-dimensional consistent solution using logarithmic least squares. The mean logarithmic deviation was $2; the table shows the projected continuous values.']
    ];
    for (const [pattern, replacement] of replacements) out = out.replace(pattern, replacement);
    const scalePhrases = [
      '同等重要／同等优势',
      '略占优势',
      '较为重要／具备一定优势',
      '介于较为与很重要之间',
      '很重要／具备优势',
      '介于很重要与非常重要之间',
      '非常重要／具备很大优势',
      '介于非常与极其重要之间',
      '极其重要／具备极大优势'
    ];
    scalePhrases.forEach(source => {
      if (out.includes(source)) out = out.split(source).join(exact[language][source]);
    });
    return out
      .replace(/（(\d+) 个子指标）/g, ja ? '（$1件の要因）' : ' ($1 subcriteria)')
      .replace(' → 子指标', ja ? ' → 要因' : ' → Subcriteria')
      .replace(/当前仍有 (\d+) 项未填写。/g, ja ? '現在$1項が未入力です。' : '$1 item(s) are still missing.')
      .replace(/未填写/g, ja ? '未入力' : 'Not entered')
      .replace(/ABC 分析后，(\d+) 项指标参与方案综合评价；入选权重已重新归一化为 100%。/g, ja ? 'ABC分析後、$1項の基準が代替案の総合評価に参加し、選定項目のウェイトは100%に再正規化されます。' : 'After ABC analysis, $1 criteria participate in the overall alternative evaluation and their weights are renormalized to 100%.')
      .replace(/^无法导入：(.+)$/, ja ? '読み込めません：$1' : 'Import failed: $1')
      .replace(/^本地保存的数据无效，已使用默认决策开始：(.+)$/, ja ? 'ローカル保存データが無効なため、既定の意思決定で開始しました：$1' : 'Saved local data was invalid; started with the default decision: $1');
  }

  function translateAttribute(value) {
    if (!value || language === 'zh') return value;
    let out = translateDynamic(value);
    const ja = language === 'ja';
    out = out
      .replace(/^例如：≥ 85 分$/, ja ? '例：85点以上' : 'Example: ≥ 85')
      .replace(/^拖动或选择 (.+)$/, ja ? '$1をドラッグまたは選択' : 'Drag or select $1')
      .replace(/^(\d+) 对 (\d+) 的相对重要度$/, ja ? '$1対$2の相対重要度' : 'Relative importance of $1 versus $2');
    return out;
  }

  function localizeDom() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja' : 'en';
    const localizedTitle = translateExact('AHP 决策工作台');
    document.title = `${localizedTitle} Beta`;
    const titleText = document.getElementById('app-title-text');
    if (titleText) titleText.textContent = localizedTitle;
    const select = document.getElementById('language-select');
    if (select) select.value = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style')) return;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) return;
      const translated = translateDynamic(trimmed);
      if (translated !== trimmed) node.nodeValue = raw.replace(trimmed, translated);
    });
    document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(element => {
      ['placeholder', 'title', 'aria-label'].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        element.setAttribute(attribute, translateAttribute(element.getAttribute(attribute)));
      });
    });
    const caption = document.querySelector('.partnership-caption');
    if (caption) {
      if (language === 'en') {
        caption.innerHTML = 'Bostar–Ritsumeikan University Joint Research<br>on Hit Product Evaluation Criteria';
      } else {
        caption.textContent = language === 'zh'
          ? '博咨达-立命馆大学爆品评价基准共同研究'
          : '博咨达-立命館大学 ヒット商品評価基準共同研究';
      }
    }
  }

  function mapIndexed(value, family, index) {
    for (const code of supported) {
      if (defaults[code][family]?.[index] === value) return defaults[language][family][index];
    }
    return value;
  }

  function mapGenerated(value, family) {
    for (const code of supported) {
      const source = defaults[code][family];
      if (typeof source === 'string' && value === source) return defaults[language][family];
      if (typeof source === 'function') {
        for (let n = 1; n <= 99; n++) {
          if (value === source(n)) return defaults[language][family](n);
        }
      }
    }
    return value;
  }

  function localizeDefaultData() {
    for (const code of supported) {
      if (S.goal === defaults[code].goal) {
        S.goal = defaults[language].goal;
        break;
      }
    }
    S.criteria = S.criteria.map((value, index) =>
      mapGenerated(mapIndexed(value, 'criteria', index), 'criterion'));
    S.alternatives = S.alternatives.map((value, index) =>
      mapGenerated(mapIndexed(value, 'alternatives', index), 'alternative'));
    S.people.forEach(person => person.name = mapGenerated(person.name, 'person'));
    Object.keys(S.child).forEach(id => {
      S.child[id] = (S.child[id] || []).map(value => mapGenerated(value, 'child'));
    });
  }

  const nativeAlert = window.alert.bind(window);
  const nativeConfirm = window.confirm.bind(window);
  window.alert = message => nativeAlert(translateDynamic(String(message)));
  window.confirm = message => nativeConfirm(translateDynamic(String(message)));

  const baseRender = render;
  render = function localizedRender() {
    localizeDefaultData();
    baseRender();
    localizeDom();
  };

  window.setLanguage = next => {
    if (!supported.includes(next) || next === language) return;
    language = next;
    localStorage.setItem(STORAGE_KEY, language);
    localizeDefaultData();
    save();
    render();
  };

  render();
})();
