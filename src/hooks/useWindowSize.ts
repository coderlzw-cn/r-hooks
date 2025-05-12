import {useEffect, useState} from 'react';

interface WindowSize {
    width: number; // 窗口宽度
    height: number; // 窗口高度
}

/**
 * 一个跟踪浏览器窗口尺寸的 Hook
 * @returns {WindowSize} 包含窗口宽度和高度的对象
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        // 清理函数：移除事件监听器
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}