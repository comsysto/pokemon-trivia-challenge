import { Button, Intent, NonIdealState } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../app/constants";
import { Quiz } from "../components/Quiz";
import { WithQuizContext, withQuizContext } from "../cotexts/QuizContext";

type QuizContainerBaseProps = WithQuizContext & RouteComponentProps;

function QuizContainerBase(props: QuizContainerBaseProps) {
    const { history, quizContext } = props;

    const onClickZoneSelection = () => {
        history.push(Constants.ExploreRoute);
    };

    if (quizContext.selectedZone === undefined) {
        return (
            <NonIdealState
                icon="warning-sign"
                title="No zone selected"
                description="You cannot participate in the quiz without selecting a zone."
                action={
                    <Button onClick={onClickZoneSelection} intent={Intent.PRIMARY} icon="map" large>
                        Go to zone selection
                    </Button>
                }
            />
        );
    }

    return <Quiz />;
}

export const QuizContainer = withRouter(withQuizContext(QuizContainerBase));
