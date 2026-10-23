const views = [...document.querySelectorAll('.view')];
const navItems = [...document.querySelectorAll('.nav-item')];

const demoCases = {
  pilot: {
    title: '新项目试点立项',
    scenario: '项目 / 试点评审',
    objective: '确认试点目标、范围和风险控制是否具备进入内部复核的证据。',
    evidence: ['test', 'review'],
    resultTitle: '补齐关键材料的来源与复核签字',
    reason: '虚构场景：已有方案摘要和初步复核意见，但关键指标的来源、验收标准及责任人还不能完整追溯。',
    nextSteps: ['补充关键指标的数据来源与验收标准', '明确试点范围、期限和停止条件', '由授权复核人确认材料完整性']
  },
  change: {
    title: '关键流程变更评审',
    scenario: '关键流程变更',
    objective: '确认流程调整前需要完成哪些影响分析、验证和责任交接。',
    evidence: ['review'],
    resultTitle: '补充变更影响范围和验证计划',
    reason: '虚构场景：变更申请已提交，但尚未说明受影响的团队、上下游流程、验证标准和批准责任人。',
    nextSteps: ['列出受影响的团队、流程和相关方', '补充变更前后的验证方案与回退条件', '指定责任人并记录批准依据']
  },
  automation: {
    title: '自动化功能上线',
    scenario: 'AI / 自动化上线',
    objective: '确认自动化功能上线前的人工接管、回退和验证材料是否完整。',
    evidence: ['test', 'policy'],
    resultTitle: '补充人工接管和回退验证证据',
    reason: '虚构场景：测试摘要和适用规则已列出，但异常时谁接管、如何停用或回退还没有演练记录。',
    nextSteps: ['记录人工复核与接管触发条件', '演练停用和回退流程并留存结果', '由业务负责人和系统负责人共同复核']
  }
};

let activeCase = 'pilot';

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
