import {type RefObject, useEffect} from 'react';

/**
 * 用于检测点击目标元素外部的自定义 Hook
 *
 * @param ref 需要检测外部点击的目标元素的 ref 引用
 * @param handler 点击外部时的回调处理函数
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const ref = useRef(null);
 *
 *   useClickOutside(ref, () => {
 *     console.log('点击了元素外部');
 *   });
 *
 *   return <div ref={ref}>目标元素</div>;
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;

            // 如果元素不存在,或者点击的是元素自身及其子元素,则不触发处理
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        // 清理事件监听
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}