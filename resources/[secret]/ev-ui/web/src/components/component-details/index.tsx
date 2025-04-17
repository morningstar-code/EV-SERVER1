import { Typography } from "@mui/material";
import React, { isValidElement } from "react";
import "../paper/component-paper.scss";

function ComponentDetails({
    className = '',
    description,
    descriptionClass = '',
    title,
    titleClass = '',
}: any) {
    return (
        <div className={`details ${className}`}>
            <div className={`title ${titleClass}`}>
                {isValidElement(title) ? title : (
                    <Typography variant="body2" style={{ color: '#fff' }}>{title}</Typography>
                )}
            </div>
            <div className={`description ${descriptionClass}`}>
                {isValidElement(description) ? description : (
                    <Typography variant="body2" style={{ color: '#fff' }}>{description}</Typography>
                )}
            </div>
        </div>
    );
}

export {
    ComponentDetails
}