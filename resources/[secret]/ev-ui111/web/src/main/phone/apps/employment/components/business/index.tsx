import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";

const Business: FunctionComponent<any> = (props) => {
    const business = props.business;
    const onClick = props.onClick;
    let icon = 'business-time';

    business.type === 'Loans' && (icon = 'donate');
    business.type === 'Showroom' && (icon = 'car');

    return (
        <ComponentPaper onClick={() => onClick(business)}>
            <ComponentIcon icon={icon} />
            <ComponentDetails
                title={business.name}
                description={business.role}
            />
        </ComponentPaper>
    )
}

export default Business;