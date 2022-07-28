
import axios from "axios"
import {   faqCategoriesResponseDataType, faqRequestParmsType,faqResponseDataType } from "../@types"
import { BACKEND_BASE_URL } from "../constants"
import {  extractErrorMessage, getAuthHeaders, showErrorToast, showsuccessToast } from "../helpers"




export class HelpServices {

    static async fetchQuestions(params?:faqRequestParmsType): Promise<faqResponseDataType[]> {
        const url = `${BACKEND_BASE_URL}/help/faqs/`
        try {
            const response = await axios.get(url, {
                params:{...params}
            })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
    static async fetchQuestionCategories(params:any): Promise<faqCategoriesResponseDataType[]> {
        const url = `${BACKEND_BASE_URL}/help/faq_categories/`
        try {
            const response = await axios.get(url, {
                params:{...params}
            })
            return response.data
        } catch (err: any) {
            const parsedError = extractErrorMessage(err)
            showErrorToast(parsedError.status, parsedError.detail)
            throw Error(parsedError.detail);
        }
    }
   
   

}











