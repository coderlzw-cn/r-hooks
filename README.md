# r-hooks

[English](#english) | [中文](#chinese)

<a name="english"></a>
# English

A collection of useful React hooks for your daily development.

## Installation

```bash
# Using npm
npm install r-hooks

# Using yarn
yarn add r-hooks

# Using pnpm
pnpm add r-hooks
```

## Available Hooks

### useTheme
A hook for managing theme (dark/light/system) with persistence.

```tsx
import { useTheme, ThemeProvider } from 'r-hooks';

function App() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### useResizeObserver
A hook for observing element size changes.

```tsx
import { useResizeObserver } from 'r-hooks';

function Component() {
  const [ref, size] = useResizeObserver();
  
  return (
    <div ref={ref}>
      Width: {size.width}, Height: {size.height}
    </div>
  );
}
```

### useThrottle
A hook for throttling function calls.

```tsx
import { useThrottle } from 'r-hooks';

function Component() {
  const throttledFn = useThrottle(() => {
    // Your function here
  }, 1000);
}
```

### useDebounce
A hook for debouncing function calls.

```tsx
import { useDebounce } from 'r-hooks';

function Component() {
  const debouncedFn = useDebounce(() => {
    // Your function here
  }, 1000);
}
```

### useScroll
A hook for tracking scroll position.

```tsx
import { useScroll } from 'r-hooks';

function Component() {
  const { x, y, direction } = useScroll();
  
  return (
    <div>
      Scroll X: {x}, Y: {y}, Direction: {direction}
    </div>
  );
}
```

### useMediaQuery
A hook for responding to media queries.

```tsx
import { useMediaQuery } from 'r-hooks';

function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

### useQueryParams
A hook for managing URL query parameters.

```tsx
import { useQueryParams } from 'r-hooks';

function Component() {
  const [params, setParams] = useQueryParams();
  
  return (
    <div>
      <button onClick={() => setParams({ page: 2 })}>
        Go to page 2
      </button>
    </div>
  );
}
```

### useAsync
A hook for handling asynchronous operations.

```tsx
import { useAsync } from 'r-hooks';

function Component() {
  const [execute, { data, loading, error }] = useAsync(async () => {
    const response = await fetch('/api/data');
    return response.json();
  });
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </div>
  );
}
```

### useClickOutside
A hook for detecting clicks outside an element.

```tsx
import { useClickOutside } from 'r-hooks';

function Component() {
  const ref = useRef(null);
  
  useClickOutside(ref, () => {
    // Handle click outside
  });
  
  return <div ref={ref}>Click outside me</div>;
}
```

### useWindowSize
A hook for tracking window size.

```tsx
import { useWindowSize } from 'r-hooks';

function Component() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      Window size: {width}x{height}
    </div>
  );
}
```

### usePagination
A hook for managing pagination state.

```tsx
import { usePagination } from 'r-hooks';

function Component() {
  const {
    pagination,
    paginationState,
    setPageIndex,
    setPageSize,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage
  } = usePagination({
    initialPage: 1,
    initialPageSize: 10,
    total: 100
  });
  
  return (
    <div>
      <button onClick={prevPage} disabled={!hasPrevPage}>Previous</button>
      <span>Page {pagination.pageIndex}</span>
      <button onClick={nextPage} disabled={!hasNextPage}>Next</button>
    </div>
  );
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint
```

## License

ISC © coderlzw