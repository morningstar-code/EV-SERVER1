import React from "react";
import Driver from "./driver";
import { isEmployed } from "main/phone/actions";
import Text from "components/text/text";
import { useSelector } from "react-redux";
import { getCharacter } from "lib/character";
import { getAbdulTaxiAppState, getDrivers, signOffDuty, signOnDuty, updateAbdulTaxiAppState, updateStatus } from "../actions";

export default () => {
    const drivers = useSelector((state: any) => state['phone.apps.adbultaxi'].drivers);
    const isEmployee = useSelector((state: any) => state['phone.apps.adbultaxi'].isEmployee);

    const isDriverAvailableOrBusy = (driversArray: any, wantedStatus: string) => {
        const cid = getCharacter().id;

        for (const driver of driversArray) {
            if (driver.cid === cid && driver.status === wantedStatus) {
                return true;
            }
        }

        return false;
    }

    React.useEffect(() => {
        updateAbdulTaxiAppState({
            isEmployee: isEmployed(getAbdulTaxiAppState().business)
        });
        getDrivers();
    }, []);

    return (
        <div className="abdultaxi-driverslist">
            <img
                src="https://i.imgur.com/N8WKYwD.png"
                className="logo"
                alt="logo"
            />
            <div className="banner">
                <Text variant="body1">
                    Available Drivers
                </Text>
            </div>
            <ul className="drivers">
                {drivers && drivers.length > 0 && Object.keys(drivers).map((driver: string) => {
                    return (
                        <Driver
                            key={driver}
                            driver={drivers[driver]}
                        />
                    )
                })}
            </ul>
            {isEmployee && (
                <div className="employee-btns">
                    {isDriverAvailableOrBusy(drivers, 'Available') || isDriverAvailableOrBusy(drivers, 'Busy') ? (
                        <button
                            className="rect-btn red"
                            onClick={signOffDuty}
                        >
                            Go Off Duty
                        </button>
                    ) : (
                        <button
                            className="rect-btn green"
                            onClick={signOnDuty}
                        >
                            Go On Duty
                        </button>
                    )}
                    {isDriverAvailableOrBusy(drivers, 'Available') && (
                        <button
                            className="rect-btn red"
                            onClick={() => updateStatus('Busy')}
                        >
                            Set Busy
                        </button>
                    )}
                    {isDriverAvailableOrBusy(drivers, 'Busy') && (
                        <button
                            className="rect-btn green"
                            onClick={() => updateStatus('Available')}
                        >
                            Set Available
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};