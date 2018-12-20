import axios from "axios";
import * as qs from "querystring";
import { OpenTriviaDbApiResult } from "../data/OpenTriviaDbApiResult";
import { QueryResolvers } from "../generated/schema";

const apiEndpoint = "https://opentdb.com/api.php";

function getApiUrlFromArguments({ difficulty, type }: QueryResolvers.ArgsTriviaQuestion, amount: number = 1) {
    const querystring = qs.stringify({
        difficulty: (difficulty || "").toLowerCase(),
        type: (type || "").toLowerCase(),
        amount,
    });
    return `${apiEndpoint}?${querystring}`;
}

export async function fetchQuestion(args: QueryResolvers.ArgsTriviaQuestion) {
    const request = await axios.get<OpenTriviaDbApiResult>(getApiUrlFromArguments(args));
    return request.data;
}
