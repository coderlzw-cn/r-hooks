import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';

// 元素尺寸信息接口
interface Size {
    width: number;   // 宽度
    height: number;  // 高度
    top: number;     // 顶部距离
    left: number;    // 左侧距离
    right: number;   // 右侧距离
    bottom: number;  // 底部距离
    x: number;       // x坐标
    y: number;       // y坐标
}

// ResizeObserver配置选项接口
interface UseResizeObserverOptions {
    box?: 'content-box' | 'border-box' | 'device-pixel-content-box'; // 观察的盒模型类型
    debounceTime?: number;  // 防抖延迟时间(ms)
}

/**
 * 监听DOM元素尺寸变化的Hook
 * @param options ResizeObserver的配置选项
 * @returns [ref, size] 返回一个ref(用于绑定到目标元素)和当前的尺寸信息
 */
export function useResizeObserver<T extends HTMLElement>(
    options: UseResizeObserverOptions = {}
): [React.RefObject<T>, Size | null] {
    const {box = 'content-box', debounceTime = 0} = options;
    const ref = useRef<T>(null);
    const [size, setSize] = useState<Size | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // 创建ResizeObserver实例
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            // 更新尺寸信息的函数
            const updateSize = () => {
                const {width, height, top, left, right, bottom, x, y} = entry.contentRect;
                setSize({width, height, top, left, right, bottom, x, y});
            };

            // 处理防抖逻辑
            if (debounceTime > 0) {
                if (timeoutRef.current) {
                    window.clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = window.setTimeout(updateSize, debounceTime);
            } else {
                updateSize();
            }
        });

        // 开始观察元素
        observer.observe(element, {box});

        // 清理函数
        return () => {
            observer.disconnect();
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, [box, debounceTime]);

    return [ref as React.RefObject<T>, size];
}

/**
 * 监听多个DOM元素尺寸变化的Hook
 * @param count 需要监听的元素数量
 * @param options ResizeObserver的配置选项
 * @returns [refs, sizes] 返回一个ref数组(用于绑定到目标元素)和当前的尺寸信息数组
 */
export function useResizeObserverMulti<T extends HTMLElement>(
    count: number,
    options: UseResizeObserverOptions = {}
): [React.RefObject<T>[], (Size | null)[]] {
    // 创建ref数组
    const refs = useMemo(() =>
            Array(count).fill(null).map(() => React.createRef<T>()),
        [count]
    );

    // 初始化尺寸状态数组
    const [sizes, setSizes] = useState<(Size | null)[]>(Array(count).fill(null));
    const timeoutRef = useRef<number | undefined>(undefined);
    const {box = 'content-box', debounceTime = 0} = options;

    useEffect(() => {
        // 过滤出有效的元素
        const elements = refs.map(ref => ref.current).filter(Boolean) as T[];
        if (elements.length === 0) return;

        // 创建ResizeObserver实例
        const observer = new ResizeObserver((entries) => {
            const updateSizes = () => {
                setSizes(prevSizes => {
                    const newSizes = [...prevSizes];
                    entries.forEach(entry => {
                        const index = elements.indexOf(entry.target as T);
                        if (index !== -1) {
                            const {width, height, top, left, right, bottom, x, y} = entry.contentRect;
                            newSizes[index] = {width, height, top, left, right, bottom, x, y};
                        }
                    });
                    return newSizes;
                });
            };

            // 处理防抖逻辑
            if (debounceTime > 0) {
                if (timeoutRef.current) {
                    window.clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = window.setTimeout(updateSizes, debounceTime);
            } else {
                updateSizes();
            }
        });

        // 开始观察所有元素
        elements.forEach(element => observer.observe(element, {box}));

        // 清理函数
        return () => {
            observer.disconnect();
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, [refs, box, debounceTime, count]);

    return [refs as React.RefObject<T>[], sizes];
}