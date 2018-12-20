import { NamedApiResourceResponse, ResourceListResponse } from "./Common";

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
