import { ComponentPaper } from "components/paper";
import { callDriver } from "../actions";

export default (props: any) => {
    const driver = props.driver;

    const actions = [
        {
            icon: 'phone',
            title: 'Call Driver',
            onClick: () => {
                return callDriver(driver.phoneNumber, driver.status);
            }
        }
    ];

    return (
        <ComponentPaper
            actions={actions}
        >
            <div className="driver">
                <h1>
                    {driver.name}
                </h1>
                <span className={`status ${driver.status}`}>
                    {driver.status}
                </span>
            </div>
        </ComponentPaper>
    )
}