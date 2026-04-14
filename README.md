# themis-contracts

`themis-contracts` 是 Themis 三层拆仓里的显式契约仓。

当前已经首轮导出的模块有：

- `managed-agent-platform-worker`
- `managed-agent-platform-projects`
- `managed-agent-platform-work-items`
- `managed-agent-platform-collaboration`
- `managed-agent-platform-agents`
- `managed-agent-platform-access`

这些模块覆盖：

- `/api/platform/*` 当前拆仓所需的 DTO / payload / result
- 其中 `managed-agent-platform-worker` 已开始对齐节点 detail / reclaim / worker-runs 的真实返回 shape
- 平台服务 Bearer 鉴权头格式
- 平台专用错误码：`PLATFORM_ROUTE_NOT_FOUND`、`PLATFORM_SERVICE_AUTH_DENIED`、`PLATFORM_SERVICE_FORBIDDEN`、`PLATFORM_SERVICE_OWNER_MISMATCH`

## 本地验证

```bash
npm install
npm run test
npm run typecheck
npm run build
```

## 当前边界

- 这是 standalone contracts 首包，不再直接 import `themis` 主仓的业务源码
- 当前先导出平台主链显式契约，还没有把主仓改成直接消费这个 sibling repo
- 下一步应开始让 `themis-platform` / `themis-main` / `themis-worker-node` 逐步改依赖这个仓
