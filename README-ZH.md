一个实用的 React Hooks 集合，为你的日常开发提供便利。

## 安装

```bash
# 使用 npm
npm install r-hooks

# 使用 yarn
yarn add r-hooks

# 使用 pnpm
pnpm add r-hooks
```

## 可用的 Hooks

### useTheme

用于管理主题（暗色/亮色/系统）的 Hook，支持持久化存储。

```tsx
import { useTheme, ThemeProvider } from 'r-hooks';

function App() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <div>
            <button onClick={() => setTheme('dark')}>暗色</button>
            <button onClick={() => setTheme('light')}>亮色</button>
            <button onClick={() => setTheme('system')}>跟随系统</button>
        </div>
    );
}
```

### useResizeObserver

用于监听元素尺寸变化的 Hook。

```tsx
import { useResizeObserver } from 'r-hooks';

function Component() {
    const [ref, size] = useResizeObserver();

    return (
        <div ref={ref}>
            宽度: {size.width}, 高度: {size.height}
        </div>
    );
}
```

### useThrottle

用于节流函数调用的 Hook。

```tsx
import { useThrottle } from 'r-hooks';

function Component() {
    const throttledFn = useThrottle(() => {
        // 你的函数
    }, 1000);
}
```

### useDebounce

用于防抖函数调用的 Hook。

```tsx
import { useDebounce } from 'r-hooks';

function Component() {
    const debouncedFn = useDebounce(() => {
        // 你的函数
    }, 1000);
}
```

### useScroll

用于追踪滚动位置的 Hook。

```tsx
import { useScroll } from 'r-hooks';

function Component() {
    const { x, y, direction } = useScroll();

    return (
        <div>
            横向滚动: {x}, 纵向滚动: {y}, 方向: {direction}
        </div>
    );
}
```

### useMediaQuery

用于响应媒体查询的 Hook。

```tsx
import { useMediaQuery } from 'r-hooks';

function Component() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return isMobile ? <移动端视图 /> : <桌面端视图 />;
}
```

### useQueryParams

用于管理 URL 查询参数的 Hook。

```tsx
import { useQueryParams } from 'r-hooks';

function Component() {
    const [params, setParams] = useQueryParams();

    return (
        <div>
            <button onClick={() => setParams({ page: 2 })}>跳转到第 2 页</button>
        </div>
    );
}
```

### useAsync

用于处理异步操作的 Hook。

```tsx
import { useAsync } from 'r-hooks';

function Component() {
    const [execute, { data, loading, error }] = useAsync(async () => {
        const response = await fetch('/api/data');
        return response.json();
    });

    return (
        <div>
            {loading && <div>加载中...</div>}
            {error && <div>错误: {error.message}</div>}
            {data && <div>数据: {JSON.stringify(data)}</div>}
        </div>
    );
}
```

### useClickOutside

用于检测元素外部点击的 Hook。

```tsx
import { useClickOutside } from 'r-hooks';

function Component() {
    const ref = useRef(null);

    useClickOutside(ref, () => {
        // 处理外部点击
    });

    return <div ref={ref}>点击我外部</div>;
}
```

### useWindowSize

用于追踪窗口尺寸的 Hook。

```tsx
import { useWindowSize } from 'r-hooks';

function Component() {
    const { width, height } = useWindowSize();

    return (
        <div>
            窗口尺寸: {width}x{height}
        </div>
    );
}
```

### usePagination

用于管理分页状态的 Hook。

```tsx
import { usePagination } from 'r-hooks';

function Component() {
    const { pagination, paginationState, setPageIndex, setPageSize, nextPage, prevPage, hasNextPage, hasPrevPage } =
        usePagination({
            initialPage: 1,
            initialPageSize: 10,
            total: 100,
        });

    return (
        <div>
            <button onClick={prevPage} disabled={!hasPrevPage}>
                上一页
            </button>
            <span>第 {pagination.pageIndex} 页</span>
            <button onClick={nextPage} disabled={!hasNextPage}>
                下一页
            </button>
        </div>
    );
}
```

## 开发

```bash
# 安装依赖
pnpm install

# 开始开发
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint
```

## 许可证

ISC © coderlzw
