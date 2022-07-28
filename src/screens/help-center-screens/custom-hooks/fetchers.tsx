import { useQuery } from '@tanstack/react-query';
import { HelpServices } from '../../../services';
import { faqCategoriesResponseDataType, faqRequestParmsType, faqResponseDataType } from '../../../@types';
import { useState } from 'react';

/** */
export const useFetchFaqs = (params:faqRequestParmsType) => {
    const QUERY_QEY=['faqs', ...Object.values(params || {})]
    const { data:faqs, isLoading:faqs_loading } = useQuery<faqResponseDataType[], Error>(
        QUERY_QEY,
        ()=>HelpServices.fetchQuestions(params),
        {
            retry: 1
        }
    );

    return { faqs, faqs_loading}
}

/** */
export const useFetchFaqCategories = () => {

    const { data:fasq_categories ,  isLoading:faqs_cats_loading } = useQuery<faqCategoriesResponseDataType[], Error>(
        ['faqs_categories'],
        HelpServices.fetchQuestionCategories,
        {
            retry: 1
        }
    );

    return { fasq_categories,faqs_cats_loading }
}
/** */