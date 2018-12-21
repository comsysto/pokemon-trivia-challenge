import { Resolvers } from "../api/ResolverTypes";

import { Language } from "./Language";
import { Location } from "./Location";
import { LocationArea } from "./LocationArea";
import { Name } from "./Name";
import { Query } from "./Query";
import { Question } from "./Question";
import { Region } from "./Region";

export const resolvers: Resolvers = {
    Language,
    Location,
    LocationArea,
    Name,
    Query,
    Question,
    Region,
};
