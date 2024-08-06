export enum StatusResponse {
    success,
    failed,
    authenticationFailed,
}

export interface SchemaError {
    instancePath: string,
    message: string,
}

export interface ResponseObject {
    status: StatusResponse,
    message: string,
    error?: string | SchemaError[] | unknown,
    data?: any | any[] | undefined | null,
    limit?: number,
    totalPage?: number,
    currentPage?: null | number,
    interval?: number
}