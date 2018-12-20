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

export interface NameResponse {
    name: string;
    language: NamedApiResourceResponse[];
}

export interface LanguageResponse {
    id: number;
    name: string;
    // names: Name[];
    iso3166: string;
}

export interface RegionResponse {
    id: number;
    // locations: MainGeneration[];
    name: string;
    names: NameResponse[];
}

export interface RegionsResponse extends ResourceListResponse<NamedApiResourceResponse> {}
