import axios from "axios";
import { OpenTriviaDBApiResult } from "../data/OpenTriviaDBApiResult";
import { QueryToGetQuestionArgs } from "../schema";

const apiEndpoint = "https://opentdb.com/api.php";

function getApiUrlFromArguments({ difficulty, type }: QueryToGetQuestionArgs, amount: number = 1) {
    return `${apiEndpoint}?difficulty=${(difficulty || "").toLowerCase()}&type=${(
        type || ""
    ).toLowerCase()}&amount=${amount}`;
}

export async function fetchQuestion(args: QueryToGetQuestionArgs) {
    const request = await axios.get(getApiUrlFromArguments(args));
    const responseData = request.data as OpenTriviaDBApiResult;
    return responseData;
}
