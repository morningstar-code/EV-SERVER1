import React from "react";

export default (props: any) => {
    const stat = props.stat;
    const [width, setWidth] = React.useState('0');

    React.useEffect(() => {
        setWidth(`${10 * Math.min(Number(stat.value), 10)}%`);
    }, [stat.value]);

    return (
        <div className="breakdown">
            <div className="name">
                {stat.name}
            </div>
            <div className="value">
                <div className="bg">
                    <div className="fill" style={{ width: width }}></div>
                </div>
                <div className="actual">
                    {stat.value >= 10 ? '10' : Number(stat.value).toFixed(1)}
                </div>
            </div>
        </div>
    )
}