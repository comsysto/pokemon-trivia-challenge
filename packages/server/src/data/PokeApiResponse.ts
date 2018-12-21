export interface ApiResourceResponse<T> {
    url: string;
}

export interface NamedApiResourceResponse<T> extends ApiResourceResponse<T> {
    name: string;
}

export interface ResourceListResponse<ResourceType> {
    count: number;
    next?: string;
    previous?: string;
    results: ResourceType[];
}

export interface NamedResourceListResponse<T> extends ResourceListResponse<NamedApiResourceResponse<T>> {}

export interface Node {
    id: number;
    name: string;
    names: NameResponse[];
}

export interface NameResponse {
    name: string;
    language: NamedApiResourceResponse<LanguageResponse>;
}

export interface LanguageResponse extends Node {
    iso3166: string;
}

export interface RegionResponse extends Node {
    locations: NamedApiResourceResponse<LocationResponse>[];
}

export interface LocationResponse extends Node {
    region: NamedApiResourceResponse<RegionResponse>;
    areas: NamedApiResourceResponse<LocationAreaResponse>[];
}

export interface LocationAreaResponse extends Node {
    location: NamedApiResourceResponse<LocationResponse>;
}
