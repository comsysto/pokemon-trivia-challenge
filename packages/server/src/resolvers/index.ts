import { Resolvers } from "../api/ResolverTypes";

import { Encounter } from "./Encounter";
import { FlavorText } from "./FlavorText";
import { Language } from "./Language";
import { Location } from "./Location";
import { LocationArea } from "./LocationArea";
import { Name } from "./Name";
import { Pokemon } from "./Pokemon";
import { PokemonEncounter } from "./PokemonEncounter";
import { PokemonSpecies } from "./PokemonSpecies";
import { PokemonSprites } from "./PokemonSprites";
import { Query } from "./Query";
import { Question } from "./Question";
import { Region } from "./Region";
import { Version } from "./Version";
import { VersionEncounterDetail } from "./VersionEncounterDetail";

export const resolvers: Resolvers = {
    Encounter,
    FlavorText,
    Language,
    Location,
    LocationArea,
    Name,
    Pokemon,
    PokemonEncounter,
    PokemonSpecies,
    PokemonSprites,
    Query,
    Question,
    Region,
    Version,
    VersionEncounterDetail,
};
