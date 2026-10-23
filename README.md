# DAS-10 Mobile Demo

**移动端交互演示 / Mobile interaction demo**

这是 DAS-10 的手机端体验原型，帮助收集流程与易用性反馈。当前版本使用虚构案例和预设脚本，不连接 DAS-10 引擎，不作真实评估，也不能用于业务决策。

## 演示内容

- 新材料中试申请（研发试验）
- 原料供应商变更（质量变更）
- 缺陷识别模型上线（自动化）
- 选中案例后载入虚构材料，展示对应的脚本回执和下一步清单

脚本回执只由选中的案例决定，与表单内容无关。请勿输入真实客户资料、个人信息、商业秘密或其他敏感内容。

## 试用

本地运行：

```bash
python -m http.server 8080
```

然后访问 `http://127.0.0.1:8080/`。

也可以在 GitHub 仓库的 **Settings → Pages** 中，将 **Build and deployment** 设置为 **Deploy from a branch → main → /(root)**。部署后的静态演示网址可直接通过手机访问；iPhone 用户可在 Safari 分享菜单选择“添加到主屏幕”。GitHub Pages 仅托管静态页面，本仓库不包含或运行后端服务。

## 数据与安全边界

- 页面脚本不会读取、上传或持久化你填写的表单值。
- 本演示无登录、无 API、无真实客户记录；界面中的案例与回执均为虚构样例。
- 结果不代表 DAS-10 引擎判断，不授予任何执行权限。
- 公开客户端源码可被查看和下载；DAS-10 服务端、规则、密钥和审计材料不在此仓库。

## 反馈

欢迎通过 GitHub Issues 反馈：使用的案例、设备/浏览器、卡住的步骤、缺少的信息，以及你希望回执提供什么帮助。请只提交通用、脱敏的体验反馈，不要提交客户资料、个人信息或保密材料。

## 版权

本仓库没有授予开源复用许可。DAS-10 名称、产品核心、规则与服务端知识产权保留。公开演示客户端仅用于体验和反馈。

---

This is a mobile interaction prototype for usability feedback. It uses fictional cases and predetermined demo receipts, has no connection to the DAS-10 engine, and must not be used for real decisions. The form values are not read, uploaded, or persisted by the demo script. Do not enter confidential, personal, or customer data.
