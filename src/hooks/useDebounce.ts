import {useEffect, useState} from 'react';

/**
 * 防抖Hook - 返回一个防抖后的值
 * @param value 需要防抖的值
 * @param delay 防抖延迟时间(毫秒)
 * @returns 防抖后的值
 * @example
 * // 使用示例
 * const searchTerm = "test";
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * // debouncedSearchTerm 会在 searchTerm 停止变化 500ms 后更新
 */
export function useDebounce<T>(value: T, delay: number): T {
    // 存储防抖后的值
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}