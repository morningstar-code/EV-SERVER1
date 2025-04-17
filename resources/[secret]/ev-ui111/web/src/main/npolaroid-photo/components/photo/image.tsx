import { CardMedia } from "@mui/material";
import React from "react";

export default (props: any) => {
    const [intersected, setIntersected] = React.useState(true);
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (!intersected && ref.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio > 0) {
                    setIntersected(true);
                }

                observer.observe(ref.current);

                return () => observer.disconnect();
            });
        }
    }, [intersected, ref]);

    return intersected ? (
        <CardMedia
            className={props.className}
            image={props.image}
        />
    ) : (
        <div style={{ backgroundColor: '#EEE' }} ref={ref}></div>
    )
}