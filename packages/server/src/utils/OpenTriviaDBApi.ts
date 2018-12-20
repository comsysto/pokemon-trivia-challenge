import axios from "axios";
import * as qs from "querystring";
import { OpenTriviaDBApiResult } from "../data/OpenTriviaDBApiResult";
import { QueryToGetQuestionArgs } from "../schema";

const apiEndpoint = "https://opentdb.com/api.php";

function getApiUrlFromArguments({ difficulty, type }: QueryToGetQuestionArgs, amount: number = 1) {
    const querystring = qs.stringify({
        difficulty: (difficulty || "").toLowerCase(),
        type: (type || "").toLowerCase(),
        amount,
    });
    return `${apiEndpoint}?${querystring}`;
}

export async function fetchQuestion(args: QueryToGetQuestionArgs) {
    const request = await axios.get<OpenTriviaDBApiResult>(getApiUrlFromArguments(args));
    return request.data;
}
