export interface IListParams {
    page: number;
    limit: number;

    type?: string;
    search?: string;
    from?: number;
    to?: number;
}
