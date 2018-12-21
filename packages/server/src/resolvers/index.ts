import { Resolvers } from "../api/ResolverTypes";

import { Language } from "./Language";
import { Name } from "./Name";
import { Query } from "./Query";
import { Question } from "./Question";
import { Region } from "./Region";

export const resolvers: Resolvers = {
    Language,
    Name,
    Query,
    Question,
    Region,
};
