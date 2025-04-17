import { Tooltip } from "@mui/material";
import { openMdtConfirmModal } from "main/mdt/actions";
import Chip from "../chip";

export default (props: any) => {
    return (
        <Tooltip title="Remove" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
            <div>
                <Chip
                    noLabel={true}
                    icon="trash"
                    iconSize="lg"
                    textColor="white"
                    bgColor="black"
                    onClick={() => {
                        return openMdtConfirmModal({
                            onClick: props.onClick,
                            sureText: props.sureText || 'Are you sure?'
                        });
                    }}
                />
            </div>
        </Tooltip>
    )
}