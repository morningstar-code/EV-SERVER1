import { LinearProgress } from "@mui/material";
import Text from "components/text/text";

export default (props: any) => {
    const tracked = props.tracked;
    const progress = Math.min((tracked.minValue / tracked.maxValue) * 100, 100);

    return (
        <div className="activity-tracked-item">
            <div className="top">
                <Text variant="body2">
                    {tracked.name}
                </Text>
            </div>
            <div className="middle">
                <LinearProgress
                    variant="determinate"
                    color={progress > 75 ? 'secondary' : 'primary'}
                    value={progress}
                />
            </div>
            <div className="bottom">
                <Text variant="body2">
                    {tracked.minLabel}
                </Text>
                <Text variant="body2">
                    {tracked.maxLabel}
                </Text>
            </div>
        </div>
    )
}