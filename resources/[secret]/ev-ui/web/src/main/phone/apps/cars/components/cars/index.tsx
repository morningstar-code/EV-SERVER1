import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import Car from "./car";

const Cars: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            search={{
                filter: ['name', 'plate'],
                list: props.list,
                onChange: setList,
            }}
        >
            {list && list.length > 0 && list.map((car, index) => (
                <Car key={index} car={car} action={props.doAction} />
            ))}
        </AppContainer>
    )
}

export default Cars;