import {useEffect, useState} from 'react';

type MediaType = Pick<MediaQueryListEvent, "matches" | "media">;

/**
 * 用于监听媒体查询匹配状态的 Hook
 * @param query 媒体查询字符串,例如 "(max-width: 768px)"
 * @returns 返回一个对象,包含:
 * - matches: 布尔值,表示是否匹配查询条件
 * - media: 字符串,表示原始的媒体查询语句
 * @example
 * // 判断是否为移动设备
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * console.log(isMobile.matches); // true/false
 */
export function useMediaQuery(query: string) {
    const [media, setMedia] = useState<MediaType>(() => {
        const media = window.matchMedia(query);
        return {matches: media.matches, media: media.media};
    });

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = (event: MediaQueryListEvent) => {
            setMedia({matches: event.matches, media: event.media});
        };

        media.addEventListener('change', listener);

        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);

    return media;
}