
export type faqRequestParmsType={
    category?:number,
    search?:string
}
export type faqResponseDataType={
    id:number
    title:string
    content:string
}
export type faqCategoriesResponseDataType={
    id:number
    name:string
    icon?:string
}