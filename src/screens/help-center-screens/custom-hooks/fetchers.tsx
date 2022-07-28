import { FetchNextPageOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { HelpServices } from '../../../services';
import { faqCategoriesResponseDataType, faqRequestParmsType, faqResponseDataType, PaginatedResponse, paginationParams } from '../../../@types';
import { useState } from 'react';
import { matrixToList } from '../../../helpers';

/** */
export const useFetchFaqs = (params: faqRequestParmsType) => {
    const initial_pagination_parms: paginationParams = {
        limit: 4,
        offset: 0
    }
    const QUERY_QEY = ['faqs', ...Object.values(params || {})]

    const {
        data: infinit_faqs,
        error,
        isLoading: faqs_loading,
        isFetchingNextPage: loading_more,
        fetchNextPage:loadMore,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<PaginatedResponse<faqResponseDataType>, Error>(
        QUERY_QEY,
        ({ pageParam = params }: any) => HelpServices.fetchFAQs(pageParam), {
        getNextPageParam: (lastPage, pages) => lastPage.next || undefined
    })

    
    const result_matrix = infinit_faqs?.pages.map(item => item.results)
    const faqs = matrixToList(result_matrix)
    return { faqs, faqs_loading, loading_more, loadMore }
}

/** */
export const useFetchFaqCategories = () => {

    const { data: fasq_categories, isLoading: faqs_cats_loading } = useQuery<faqCategoriesResponseDataType[], Error>(
        ['faqs_categories'],
        HelpServices.fetchQuestionCategories,
        {
            retry: 1
        }
    );

    return { fasq_categories, faqs_cats_loading }
}
/** */