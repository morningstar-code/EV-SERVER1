import { FunctionComponent } from "react";
import "../paper/component-paper.scss";

const ComponentPaperImage: FunctionComponent<any> = (props) => {
    const children = props.children;
    return (
        <div className="image">
            {children}
        </div>
    )
}

export default ComponentPaperImage;