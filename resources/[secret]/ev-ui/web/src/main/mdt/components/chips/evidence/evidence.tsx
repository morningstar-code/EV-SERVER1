import React from "react";
import { Tooltip } from "@mui/material";
import Chip from "../../chip";
import { getEvidenceTypes } from "main/mdt/store";

export default (props: any) => {
    const evidence = props.evidence;
    const evidenceType = getEvidenceTypes().find((type: any) => type?.id === evidence?.type) || getEvidenceTypes()[0];
    const color = evidenceType ? evidenceType.color : "white";
    const colorText = evidenceType ? evidenceType.colorText : "black";

    if (evidenceType.id === 'photo') {
        const [photoExpanded, setPhotoExpanded] = React.useState(false);
        const identifier = evidence?.identifier;

        return (
            <Tooltip
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgba(0, 0, 0, 0.87)', maxWidth: 'none', fontSize: '0.75rem', posiition: 'relative' }}
                disableFocusListener={true}
                disableHoverListener={true}
                disableTouchListener={true}
                title={(
                    <>
                        <div onClick={() => setPhotoExpanded(false)}>
                            <img
                                src={identifier}
                                alt={identifier}
                                style={{ maxHeight: 800, maxWidth: 1200 }}
                            />
                        </div>
                    </>
                )}
                placement="top-start"
                open={photoExpanded}
                onClose={() => setPhotoExpanded(false)}
            >
                <div
                    onClick={(e: any) => {
                        const el = document.createElement('textarea');
                        el.innerText = e;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        el.remove();
                    }}
                    onMouseEnter={() => setPhotoExpanded(true)}
                    onMouseLeave={() => setPhotoExpanded(false)}
                    style={{ marginRight: 8, marginBottom: 8 }}
                >
                    <Chip
                        label={`Photo (${evidence?.description})`}
                        textColor={colorText}
                        bgColor={color}
                        onDelete={props.onDelete}
                    />
                </div>
            </Tooltip>
        )
    }

    return (
        <Chip
            label={`${evidence?.identifier} - (${evidence?.description})`}
            textColor={colorText}
            bgColor={color}
            style={{ marginRight: 8, marginBottom: 8 }}
            onDelete={props.onDelete}
        />
    )
}