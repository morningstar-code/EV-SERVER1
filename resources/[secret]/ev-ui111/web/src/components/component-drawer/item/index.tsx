import React, { FunctionComponent } from "react";
import { Tooltip } from "@mui/material";
import Actions from "../actions";

const Item: FunctionComponent<any> = (props) => {
    const item = props.item;
    const key = props.index;
    const [showActions, setShowActions] = React.useState(false);

    return (
        <>
            {item.tooltip ? (
                <Tooltip title={item.tooltip} placement="left" key={key} sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                    <div className="item" key={key} onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
                        <Actions item={item} showActions={showActions} />
                    </div>
                </Tooltip>
            ) : (
                <div className="item" key={key} onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
                    <Actions item={item} showActions={showActions} />
                </div>
            )}
        </>
    )
}

export default Item;