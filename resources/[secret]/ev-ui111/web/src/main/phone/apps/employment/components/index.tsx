import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import MultiPager from "main/phone/components/multi-pager";
import Business from "./business";
import ManageBusiness from "./manage-business";
import Loans from "./loans";
import Logs from "./logs";

const Employment: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <MultiPager
            activeIndex={props.page}
            landscapeOptions={props.orientation !== 'landscape' ? {} : {
                indexLeft: 0,
                indexRight: 1,
                hideRight: props.activeBusiness === -1,
                split: true
            }}
            pages={[
                {
                    index: 0,
                    content: (
                        <AppContainer
                            emptyMessage={list.length === 0}
                            search={{
                                filter: ['name'],
                                list: props.list,
                                onChange: setList
                            }}
                        >
                            {list && list.length > 0 && list.map((business: any, index: number) => (
                                <Business key={index} business={business} onClick={(e) => props.manageBusiness(e)} />
                            ))}
                        </AppContainer>
                    )
                },
                {
                    index: 1,
                    content: <ManageBusiness {...props} />
                },
                {
                    index: 2,
                    content: <Loans {...props} type='character' />
                },
                {
                    index: 3,
                    content: <Logs {...props} />
                }
            ]}
        />
    )
}

export default Employment;