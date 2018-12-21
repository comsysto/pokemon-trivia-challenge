export interface ApiResourceResponse {
    url: string;
}

export interface NamedApiResourceResponse extends ApiResourceResponse {
    name: string;
}

export interface ResourceListResponse<ResourceType extends ApiResourceResponse | NamedApiResourceResponse> {
    count: number;
    next?: string;
    previous?: string;
    results: ResourceType[];
}

export interface NameResponse {
    name: string;
    language: NamedApiResourceResponse;
}

export interface LanguageResponse {
    id: number;
    name: string;
    names: NameResponse[];
    iso3166: string;
}

export interface RegionResponse {
    id: number;
    // locations: MainGeneration[];
    name: string;
    names: NameResponse[];
}

export interface RegionsResponse extends ResourceListResponse<NamedApiResourceResponse> {}
