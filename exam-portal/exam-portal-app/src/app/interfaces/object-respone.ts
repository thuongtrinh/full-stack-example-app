export interface ObjectRespone<T> {
    timestamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    result: T;
    results: T[]
}
