import { Resolvers } from "../generated/schema";

import { Query } from "./Query";
import { Question } from "./Question";
import { Region } from "./Region";

export const resolvers: Resolvers = {
    Query,
    Question,
    Region,
};
