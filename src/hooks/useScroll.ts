import { useCallback, useEffect, useState } from 'react';

interface ScrollPosition {
    x: number;  // 横向滚动距离
    y: number;  // 纵向滚动距离
    progress: {  // 滚动进度百分比
        x: number;  // 横向滚动进度(0-1)
        y: number;  // 纵向滚动进度(0-1)
    };
}

interface ScrollOptions {
    throttle?: number;  // 节流时间(ms)
    target?: HTMLElement | Window;  // 监听的目标元素,默认为window
}

/**
 * 滚动监听Hook,支持节流和自定义目标元素
 * @param options 配置项,包含节流时间和监听目标
 * @returns 当前滚动位置信息,包含具体距离和滚动进度
 */
export function useScroll(options: ScrollOptions = {}): ScrollPosition {
    const { throttle = 100, target = window } = options;
    const [position, setPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        progress: { x: 0, y: 0 }
    });

    // 获取滚动位置和进度
    const getScrollPosition = useCallback(() => {
        if (target === window) {
            // 窗口滚动
            const maxScrollX = document.documentElement.scrollWidth - window.innerWidth;
            const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
            const x = window.pageXOffset;
            const y = window.pageYOffset;
            return {
                x,
                y,
                progress: {
                    x: maxScrollX ? x / maxScrollX : 0,
                    y: maxScrollY ? y / maxScrollY : 0
                }
            };
        }
        // 元素滚动
        const element = target as HTMLElement;
        const maxScrollX = element.scrollWidth - element.clientWidth;
        const maxScrollY = element.scrollHeight - element.clientHeight;
        const x = element.scrollLeft;
        const y = element.scrollTop;
        return {
            x,
            y,
            progress: {
                x: maxScrollX ? x / maxScrollX : 0,
                y: maxScrollY ? y / maxScrollY : 0
            }
        };
    }, [target]);

    useEffect(() => {
        let timeoutId: number | undefined;
        let lastScrollPosition = getScrollPosition();

        // 处理滚动事件
        const handleScroll = () => {
            if (timeoutId) {
                return;  // 节流中,跳过
            }

            // 节流处理
            timeoutId = window.setTimeout(() => {
                const currentPosition = getScrollPosition();
                if (
                    currentPosition.x !== lastScrollPosition.x ||
                    currentPosition.y !== lastScrollPosition.y
                ) {
                    setPosition(currentPosition);
                    lastScrollPosition = currentPosition;
                }
                timeoutId = undefined;
            }, throttle);
        };

        // 添加滚动监听
        target.addEventListener('scroll', handleScroll, { passive: true });
        setPosition(getScrollPosition());

        // 清理
        return () => {
            target.removeEventListener('scroll', handleScroll);
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [target, throttle, getScrollPosition]);

    return position;
}