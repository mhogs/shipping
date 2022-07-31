
import axios from "axios"
import { faqCategoriesResponseDataType, faqRequestParmsType, faqResponseDataType, PaginatedResponse, paginationParams } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import { extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class HelpServices {

    static async fetchFAQs(pageParam:faqRequestParmsType | string ): Promise<PaginatedResponse<faqResponseDataType>> {
       

        const url = `${BACKEND_BASE_URL}/help/faqs/`
        const initial_page_params: paginationParams = { limit: 2, offset: 0 }
        const ready_url = typeof pageParam === "string"
        try {
            const response = await axios.get(
                ready_url ? pageParam : url
                , {
                    params: ready_url ? {} : { ...pageParam, ...initial_page_params }
                })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async fetchQuestionCategories(params: any): Promise<faqCategoriesResponseDataType[]> {
        const url = `${BACKEND_BASE_URL}/help/faq_categories/`
        try {
            const response = await axios.get(url, {
                params: { ...params }
            })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }



}











