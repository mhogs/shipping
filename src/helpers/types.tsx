export type userType = {
    id?: string,
    username: string,
    token: string;
}

export type endPointType = {
    methode: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    id?: string;
    route?: string
    params?: any,
    data?: any,
    protected?: boolean,
    extra_headers?: any,
}

export type EmailBodyType = {
    subject: string;
    message:string;
    source: string;
    to: string[],
    cc?: string[]
    attachments?:string[] 
}

