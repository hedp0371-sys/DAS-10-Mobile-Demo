const views = [...document.querySelectorAll('.view')];
const navItems = [...document.querySelectorAll('.nav-item')];

const demoCases = {
  ceramics: {
    title: '新材料中试申请',
    scenario: '研发试验',
    objective: '确认中试方案是否具备进入内部复核的证据。',
    evidence: ['test', 'review'],
    resultTitle: '补齐试验记录的来源与复核签字',
    reason: '虚构场景：已有试验摘要和复核意见，但摘要中的关键测量值还不能追溯到原始记录。',
    nextSteps: ['关联带批次号的原始测量记录', '注明试验设备与校准状态', '由授权复核人确认关键数据']
  },
  quality: {
    title: '原料供应商变更',
    scenario: '质量变更',
    objective: '确认供应商切换前需要完成哪些影响分析与验证。',
    evidence: ['review'],
    resultTitle: '补充变更影响范围和验证计划',
    reason: '虚构场景：变更申请已提交，但尚未说明受影响的产品批次、检验项目和放行责任人。',
    nextSteps: ['列出受影响产品与库存批次', '补充新旧原料的对比验证方案', '指定质量负责人并记录批准依据']
  },
  automation: {
    title: '缺陷识别模型上线',
    scenario: 'AI / 自动化上线',
    objective: '确认模型上线前的人工接管、回退和验证材料是否完整。',
    evidence: ['test', 'policy'],
    resultTitle: '补充人工接管和回退验证证据',
    reason: '虚构场景：离线测试摘要和适用规则已列出，但异常时谁接管、如何停用或回退还没有演练记录。',
    nextSteps: ['记录人工复核与接管触发条件', '演练停用和回退流程并留存结果', '由业务与质量负责人共同复核']
  }
};

let activeCase = 'ceramics';

function showView(name) {
  for (const view of views) {
    const active = view.id === name;
    view.hidden = !active;
    view.classList.toggle('active', active);
  }
  for (const item of navItems) {
    item.classList.toggle('selected', item.dataset.view === name);
  }
  document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function chooseCase(caseId) {
  const sample = demoCases[caseId];
  if (!sample) return;
  activeCase = caseId;
  for (const card of document.querySelectorAll('[data-case]')) {
    const selected = card.dataset.case === caseId;
    card.classList.toggle('selected', selected);
    card.setAttribute('aria-pressed', String(selected));
  }
  document.getElementById('case-title').value = sample.title;
  document.getElementById('scenario').value = sample.scenario;
  document.getElementById('objective').value = sample.objective;
  for (const checkbox of document.querySelectorAll('input[name="evidence"]')) {
    checkbox.checked = sample.evidence.includes(checkbox.value);
  }
  document.getElementById('demo-result').hidden = true;
}

document.addEventListener('click', (event) => {
  const viewControl = event.target.closest('[data-view]');
  if (viewControl) showView(viewControl.dataset.view);

  const caseControl = event.target.closest('[data-case]');
  if (caseControl) chooseCase(caseControl.dataset.case);
});

document.getElementById('demo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  // The receipt depends only on the selected fictional case. Form values are never read, sent, or stored.
  const sample = demoCases[activeCase];
  document.getElementById('demo-result-title').textContent = sample.resultTitle;
  document.getElementById('demo-result-reason').textContent = sample.reason;
  const list = document.getElementById('demo-next-steps');
  list.replaceChildren(...sample.nextSteps.map((step) => {
    const item = document.createElement('li');
    item.textContent = step;
    return item;
  }));
  document.getElementById('demo-result').hidden = false;
  document.getElementById('demo-result').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

chooseCase(activeCase);

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
