import {useCallback, useState} from "react";

export interface Pagination {
    pageIndex: number;
    pageSize: number;
}

export interface PaginationResponse<T> {
    total: number;
    pages: number;
    currentPage: number;
    pageSize: number;
    records: T[];
}

export interface PaginationState extends Pagination {
    total: number;
    pages: number;
}

export const initialPagination = {pageIndex: 1, pageSize: 10};

interface UsePaginationOptions {
    initialPage?: number;
    initialPageSize?: number;
    total?: number;
    onChange?: (pagination: Pagination) => void;
}

interface UsePaginationReturn {
    pagination: Pagination;
    paginationState: PaginationState;  // 分页状态
    setPageIndex: (page: number) => void; // 设置页码
    setPageSize: (size: number) => void; // 设置页大小
    setTotal: (total: number) => void; // 设置总条数
    reset: () => void; // 重置
    nextPage: () => void; // 下一页
    prevPage: () => void; // 上一页
    hasNextPage: boolean; // 是否有下一页
    hasPrevPage: boolean; // 是否有上一页
}

/**
 * A hook for handling pagination
 * @param options Pagination options
 * @returns Pagination controls and state
 * @example
 * const {
 *   pagination,
 *   paginationState,
 *   setpageIndex,
 *   setPageSize,
 *   nextPage,
 *   prevPage
 * } = usePagination({
 *   initialPage: 1,
 *   initialPageSize: 10,
 *   total: 100,
 *   onChange: (pagination) => {
 *     console.log('Pagination changed:', pagination);
 *   }
 * });
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
    const {
        initialPage = initialPagination.pageIndex,
        initialPageSize = initialPagination.pageSize,
        total = 0,
        onChange
    } = options;

    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: initialPage,
        pageSize: initialPageSize
    });

    const [totalItems, setTotalItems] = useState(total);

    const calculatePages = useCallback((total: number, pageSize: number) => {
        return Math.ceil(total / pageSize);
    }, []);

    const paginationState: PaginationState = {
        ...pagination,
        total: totalItems,
        pages: calculatePages(totalItems, pagination.pageSize)
    };

    const setpageIndex = useCallback(
        (page: number) => {
            setPagination((prev) => {
                const newPagination = {...prev, pageIndex: page};
                onChange?.(newPagination);
                return newPagination;
            });
        },
        [onChange]
    );

    const setPageSize = useCallback(
        (size: number) => {
            setPagination((prev) => {
                const newPagination = {...prev, pageSize: size, pageIndex: 1};
                onChange?.(newPagination);
                return newPagination;
            });
        },
        [onChange]
    );

    const setTotal = useCallback((total: number) => {
        setTotalItems(total);
    }, []);

    const reset = useCallback(() => {
        setPagination({
            pageIndex: initialPage,
            pageSize: initialPageSize
        });
    }, [initialPage, initialPageSize]);

    const nextPage = useCallback(() => {
        if (paginationState.pageIndex < paginationState.pages) {
            setpageIndex(paginationState.pageIndex + 1);
        }
    }, [paginationState.pageIndex, paginationState.pages, setpageIndex]);

    const prevPage = useCallback(() => {
        if (paginationState.pageIndex > 1) {
            setpageIndex(paginationState.pageIndex - 1);
        }
    }, [paginationState.pageIndex, setpageIndex]);

    const hasNextPage = paginationState.pageIndex < paginationState.pages;
    const hasPrevPage = paginationState.pageIndex > 1;

    return {
        pagination,
        paginationState,
        setPageIndex: setpageIndex,
        setPageSize,
        setTotal,
        reset,
        nextPage,
        prevPage,
        hasNextPage,
        hasPrevPage
    };
}

export default usePagination;
