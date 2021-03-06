import axios from "axios";
import * as qs from "querystring";
import { QueryResolvers } from "../api/ResolverTypes";
import { OpenTriviaDbApiResponse } from "../data/OpenTriviaDbApiResponse";

const apiEndpoint = "https://opentdb.com/api.php";

function buildUrl({ difficulty, type }: QueryResolvers.ArgsTriviaQuestion, amount: number = 1) {
    const querystring = qs.stringify({
        difficulty: (difficulty || "").toLowerCase(),
        type: (type || "").toLowerCase(),
        amount,
    });
    return `${apiEndpoint}?${querystring}`;
}

export async function fetchOpenTriviaDbApi(args: QueryResolvers.ArgsTriviaQuestion) {
    const request = await axios.get<OpenTriviaDbApiResponse>(buildUrl(args));
    return request.data;
}
