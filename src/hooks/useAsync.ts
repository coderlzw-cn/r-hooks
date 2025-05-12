import {useCallback, useState} from 'react';

interface AsyncState<T> {
    data: T | null;      // 异步操作的返回数据
    loading: boolean;    // 是否正在加载中
    error: Error | null; // 错误信息
}

/**
 * 处理异步操作的自定义 Hook
 * @param asyncFunction 需要执行的异步函数
 * @returns [execute, state] 返回执行函数和当前状态
 */
export function useAsync<T, P extends any[]>(
    asyncFunction: (...args: P) => Promise<T>
): [(...args: P) => Promise<void>, AsyncState<T>] {
    // 使用 useState 管理异步操作的状态
    const [state, setState] = useState<AsyncState<T>>({
        data: null,    // 初始数据为空
        loading: false, // 初始非加载状态
        error: null    // 初始无错误
    });

    // 使用 useCallback 缓存执行函数,避免不必要的重渲染
    const execute = useCallback(
        async (...args: P) => {
            // 开始执行时,设置加载状态,清空之前的数据和错误
            setState({data: null, loading: true, error: null});

            try {
                // 执行异步操作
                const data = await asyncFunction(...args);
                // 成功后更新数据,关闭加载状态
                setState({data, loading: false, error: null});
            } catch (error) {
                // 发生错误时,记录错误信息,关闭加载状态
                setState({data: null, loading: false, error: error as Error});
            }
        },
        [asyncFunction]
    );

    return [execute, state];
}