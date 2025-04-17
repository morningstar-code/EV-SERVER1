import { Tooltip } from "@mui/material";
import Chip from "../chip";

export default (props: any) => {
    return (
        <Tooltip title={props.title || 'Create New'} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
            {/* <div style={{ marginTop: 5 }}>
                <i onClick={props.onClick} className={`fas fa-${props.icon || 'file-alt'} fa-fw fa-lg`} style={{ color: 'white' }}></i>
            </div> */}
            <div>
                <Chip
                    noLabel={true}
                    icon={props.icon || 'file-alt'}
                    iconSize="lg"
                    textColor="white"
                    bgColor="black"
                    onClick={props.onClick}
                />
            </div>
        </Tooltip>
    )
}