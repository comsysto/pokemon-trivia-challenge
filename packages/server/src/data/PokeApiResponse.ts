type GraphQLID = string;

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

export interface BaseNode {
    id: GraphQLID;
    name: string;
}

export interface Node extends BaseNode {
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
    pokemon_encounters: PokemonEncounterResponse[];
}

export interface PokemonEncounterResponse {
    pokemon: NamedApiResourceResponse<PokemonResponse>;
    version_details: VersionEncounterDetailResponse[];
}

export interface PokemonResponse extends BaseNode {
    sprites: PokemonSpritesResponse;
    species: NamedApiResourceResponse<PokemonSpeciesResponse>;
}

export interface PokemonSpritesResponse {
    front_default: string;
}

export interface PokemonSpeciesResponse extends Node {
    capture_rate: number;
    flavor_text_entries: FlavorTextResponse[];
}

export interface FlavorTextResponse {
    flavor_text: string;
    language: NamedApiResourceResponse<LanguageResponse>;
    version: NamedApiResourceResponse<VersionResponse>;
}

export interface VersionResponse extends Node {
}

export interface VersionEncounterDetailResponse {
    version: NamedApiResourceResponse<VersionResponse>;
    max_chance: number;
    encounter_details: EncounterResponse[];
}

export interface EncounterResponse {
    chance: number;
}
