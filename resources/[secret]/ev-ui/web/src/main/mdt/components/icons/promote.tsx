import { Tooltip } from "@mui/material";
import Chip from "../chip";

export default (props: any) => {
    return (
        <Tooltip title="Promote to Incident" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
            <div>
                <Chip
                    noLabel={true}
                    icon="level-up-alt"
                    iconSize="lg"
                    textColor="white"
                    bgColor="black"
                    onClick={props.onClick}
                />
            </div>
        </Tooltip>
    )
}