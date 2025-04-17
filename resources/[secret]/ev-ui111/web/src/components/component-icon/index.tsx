import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../paper/component-paper.scss";

function ComponentIcon({
    icon,
    size = "3x",
    color = "#fff",
}: any) {
    return (
        <div className="image">
            <FontAwesomeIcon icon={icon} size={size} color={color} fixedWidth />
        </div>
    );
}

export {
    ComponentIcon
}