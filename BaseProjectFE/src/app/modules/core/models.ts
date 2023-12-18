// models.ts

export interface BaseContentRespone<T> {
    status: number;
    message: string;
    success: boolean;
    data: T;
    errors: Error[] | null;
}