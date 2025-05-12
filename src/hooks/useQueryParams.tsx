import {useMemo} from 'react';

type QueryParams = Record<string, string | string[]>;

/**
 * 将查询字符串解析为对象
 * @param queryString 要解析的查询字符串
 * @returns 包含解析后参数的对象
 */
function parseQueryString(queryString: string): QueryParams {
    const params: QueryParams = {};

    // 如果存在前导'?'则移除
    const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;

    // 如果查询字符串为空则返回空对象
    if (!query) return params;

    // 使用URLSearchParams API解析查询字符串
    const searchParams = new URLSearchParams(query);

    // 遍历所有的参数键值对
    for (const [key, value] of searchParams.entries()) {
        if (params[key]) {
            // 如果键已存在，将值转换为数组
            const currentValue = params[key];
            if (Array.isArray(currentValue)) {
                // 如果当前值已经是数组，则直接添加新值
                currentValue.push(value);
            } else {
                // 如果当前值是字符串，则转换为包含两个值的数组
                params[key] = [currentValue, value];
            }
        } else {
            // 如果键不存在，直接设置值
            params[key] = value;
        }
    }

    return params;
}

/**
 * 用于解析URL查询参数的Hook
 * @param url 要解析的URL或查询字符串
 * @returns 包含解析后参数的对象
 */
export function useQueryParams(url: string): QueryParams {
    return useMemo(() => {
        try {
            // 如果输入是完整URL，提取查询字符串部分
            if (url.startsWith('http://') || url.startsWith('https://')) {
                const urlObj = new URL(url);
                return parseQueryString(urlObj.search);
            }

            // 如果输入只是查询字符串，直接解析
            return parseQueryString(url);
        } catch (error) {
            console.error('URL解析错误:', error);
            return {};
        }
    }, [url]); // 只在url变化时重新计算
}

/**
 * 用于获取当前URL查询参数的Hook
 * @returns 包含当前URL参数的对象 *
 */
export function useCurrentQueryParams(): QueryParams {
    return useMemo(() => {
        // 在服务器端渲染时返回空对象
        if (typeof window === 'undefined') return {};
        return parseQueryString(window.location.search);
    }, []);
}