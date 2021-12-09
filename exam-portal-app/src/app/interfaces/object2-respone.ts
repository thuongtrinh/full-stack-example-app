export interface Object2Respone<T, K> {
    timestamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    result: T;
    results: K[]
}
