import { faqCategoriesResponseDataType, faqRequestParmsType, faqResponseDataType } from "../../@types";
import { useFetche, useInfinitFetche } from "../useFetche";


export function useInfinitFAQ(params: faqRequestParmsType) {
    const PAGESIZE = 4
    const {
        results: faqs,
        isLoading: faqs_loading,
        isFetchingNextPage: loading_more,
        fetchNextPage: loadMore,
        hasNextPage: can_load_more
    } = useInfinitFetche<faqResponseDataType>("faqs", "/help/faqs", params, PAGESIZE)
    
    return { faqs, faqs_loading, loading_more, can_load_more, loadMore }
}
export function useFaqCategories() {
    const {
        data: fasq_categories,
        isLoading: faqs_cats_loading
    } = useFetche<faqCategoriesResponseDataType>("faq_categories", "/help/faq_categories", {})
    return { fasq_categories, faqs_cats_loading }
}