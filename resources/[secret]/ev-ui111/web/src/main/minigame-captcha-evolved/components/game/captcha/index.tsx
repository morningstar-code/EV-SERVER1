import { LinearProgress, Typography } from "@mui/material";
import Input from "components/input/input";
import Text from "components/text/text";
import React, { FunctionComponent } from "react";
import useStyles from "../../index.styles";

const Captcha: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
        setTimeout(() => {
            setProgress(0);
        }, 32);
    }, []);

    return (
        <div className={classes.wrapperAnswers}>
            {props.progressOnly && (
                <div className={classes.progressWrapper}>
                    <div style={{ flex: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            color="secondary"
                            classes={{ bar1Determinate: classes.progressBar }}
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            color="secondary"
                            classes={{ bar1Determinate: classes.progressBar }}
                        />
                    </div>
                </div>
            )}
            {!props.progressOnly && (
                <div className={classes.wrapperAnswersFlex}>
                    <div className={classes.wrapperAnswersInner}>
                        <div className={classes.textWrapper}>
                            <Typography className={classes.inputText}>
                                Enter the &nbsp;
                            </Typography>
                            <Typography className={classes.inputText}>
                                {props.requiredAnswers[0].name} &nbsp;
                            </Typography>
                            <Typography className={classes.inputText}>
                                and &nbsp;
                            </Typography>
                            <Typography className={classes.inputText}>
                                {props.requiredAnswers[1].name} &nbsp;
                            </Typography>
                            {props.requiredAnswers && props.requiredAnswers[2] && ((
                                <Typography className={classes.inputText}>
                                    and &nbsp;
                                </Typography>
                            ))}
                            {props.requiredAnswers && props.requiredAnswers[2] && ((
                                <Typography className={classes.inputText}>
                                    {props.requiredAnswers[2].name} &nbsp;
                                </Typography>
                            ))}
                        </div>
                    </div>
                    <div className={classes.inputFieldWrapper}>
                        {props.debugShowAnswer && (
                            <Text variant="body2">
                                Debug Answer: {props.answerCorrect}
                            </Text>
                        )}
                        <Input.Text
                            autoFocus={true}
                            icon="user-secret"
                            label="Answer"
                            onChange={props.changeAnswerValue}
                            placeholder={props.requiredAnswers && props.requiredAnswers[2] ? 'blue square triangle' : 'blue square'}
                            value={props.answerValue}
                            onPaste={(e: any) => e.preventDefault()}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Captcha;