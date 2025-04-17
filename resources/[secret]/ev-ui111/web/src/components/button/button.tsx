import React from "react";
import { Button } from "@mui/material";

function stopKeyPress(e: any, onClick: any, pBool: boolean) {
    if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (pBool) {
            onClick(e);
        }
    }
}

class Primary extends React.Component<any, any> {
    render() {
        const props = this.props;
        return (
            <div>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    {...props}
                    onKeyDown={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyUp={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyPress={(e) => stopKeyPress(e, props.onClick, true)}
                >
                    {props.children}
                </Button>
            </div>
        )
    }
}

class Secondary extends React.Component<any, any> {
    render() {
        const props = this.props;
        return (
            <div>
                <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    {...props}
                    onKeyDown={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyUp={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyPress={(e) => stopKeyPress(e, props.onClick, true)}
                >
                    {props.children}
                </Button>
            </div>
        )
    }
}

class Tertiary extends React.Component<any, any> {
    render() {
        const props = this.props;
        return (
            <div>
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        backgroundColor: '#fff',
                        '&:hover': {
                            backgroundColor: '#ccc',
                        }
                    }}
                    {...props}
                    onKeyDown={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyUp={(e) => stopKeyPress(e, props.onClick, false)}
                    onKeyPress={(e) => stopKeyPress(e, props.onClick, true)}
                >
                    {props.children}
                </Button>
            </div>
        )
    }
}

export default { Primary, Secondary, Tertiary };