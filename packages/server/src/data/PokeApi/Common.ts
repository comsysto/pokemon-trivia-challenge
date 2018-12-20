export interface ApiResourceResponse {
    name: string;
}

export interface NamedApiResourceResponse extends ApiResourceResponse {
    url: string;
}

export interface ResourceListResponse<ResourceType extends ApiResourceResponse | NamedApiResourceResponse> {
    count: number;
    next?: string;
    previous: string;
    results: ResourceType[];
}
