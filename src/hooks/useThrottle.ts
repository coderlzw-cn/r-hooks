import { useEffect, useRef, useState } from 'react';

interface ThrottleOptions {
    leading?: boolean; // 是否在延迟开始前执行
    trailing?: boolean; // 是否在延迟结束后执行
}

/**
 * 节流Hook - 用于限制函数的执行频率
 * @param value 需要节流的值
 * @param delay 节流延迟时间(ms)
 * @param options 配置选项
 * @returns 节流后的值
 * @example
 * ```tsx
 * const throttledValue = useThrottle(value, 1000);
 * // 或者使用选项
 * const throttledValue = useThrottle(value, 1000, { leading: true, trailing: false });
 * ```
 */
export function useThrottle<T>(
    value: T,
    delay: number,
    options: ThrottleOptions = { leading: true, trailing: true }
): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(Date.now());
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        const { leading = true, trailing = true } = options;
        const now = Date.now();
        const timeLeft = delay - (now - lastExecuted.current);

        // 清除之前的定时器
        if (timer.current) {
            clearTimeout(timer.current);
        }

        // 首次执行或者已经超过节流时间
        if (timeLeft <= 0) {
            if (leading) {
                setThrottledValue(value);
                lastExecuted.current = now;
            }
        } else if (trailing) {
            // 设置定时器在延迟结束后执行
            timer.current = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, timeLeft);
        }

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [value, delay, options]);

    return throttledValue;
}