import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Button from "components/button/button";
import AppContainer from "main/phone/components/app-container";
import Ad from "./ad";
import useStyles from "./index.styles";
import { openPhoneModal } from "main/phone/actions";
import CreateAdModal from "../crreate-ad-modal";
import { nuiAction } from "lib/nui-comms";

const Ads: FunctionComponent<any> = (props) => {
    const character = useSelector((state: any) => state.character);
    const classes = useStyles();
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const ads = list.length > 0 ? list.filter(function (ad) {
        return ad?.character?.number !== character.number;
    }) : [];

    const myAd = props.list.length > 0 && props.list.find(function (ad) {
        return ad?.character?.number === character.number;
    });

    const primaryActions: any = [];

    if (!myAd) {
        primaryActions.push({
            icon: "fas fa-plus",
            title: "Create Ad",
            onClick: () => {
                openPhoneModal(
                    <CreateAdModal {...props} />
                );
            }
        });
    }

    const handleRemoveAd = async () => {
        const results = await nuiAction('ev-ui:deleteYellowPagesEntry', {}, { returnData: {} });
        if (results.meta.ok) {
            props.getEntries();
        }
    }

    return (
        <AppContainer
            emptyMessage={ads.length === 0 && !myAd}
            primaryActions={primaryActions}
            search={{
                filter: [
                    function (_0x11c3a4) {
                        return ''
                            .concat(_0x11c3a4.character.first_name, ' ')
                            .concat(_0x11c3a4.character.last_name)
                    },
                    function (_0x3c2af1) {
                        return _0x3c2af1.character.number
                    },
                    'text',
                ],
                list: props.list,
                onChange: setList,
            }}
        >
            {!!myAd && (
                <div className={classes.myAd}>
                    <Typography variant="body1" style={{ color: '#fff' }}>
                        Your Ad
                    </Typography>
                    <Button.Secondary size="small" onClick={handleRemoveAd}>
                        Remove
                    </Button.Secondary>
                </div>
            )}
            {!!myAd && (
                <Ad ad={myAd} />
            )}
            {ads && ads.length > 0 && ads.map((a) => (
                <Ad key={a.character.number} ad={a} />
            ))}
        </AppContainer>
    )
}

export default Ads;