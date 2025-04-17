import { isJob } from 'lib/character';
import Content from 'main/mdt/components/content';
import Paper from 'main/mdt/components/paper';
import React from 'react';
import useStyles from '../../../index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const [bolo, setBolo] = React.useState('');
    const [bulletin, setBulletin] = React.useState('');
    const [warrant, setWarrant] = React.useState('');

    const filteredBolos = props.bolos ? props.bolos.filter(b => {
        return !bolo || b.title.toLowerCase().indexOf(bolo.toLowerCase()) !== -1;
    }) : [];

    const filteredBulletins = props.bulletins ? props.bulletins.filter(b => {
        return !bulletin || b.title.toLowerCase().indexOf(bulletin.toLowerCase()) !== -1;
    }) : [];

    const filteredWarrants = props.warrants ? props.warrants.filter(w => {
        return !warrant || w.civ_name.toLowerCase().indexOf(warrant.toLowerCase()) !== -1 || w.incident_title.toLowerCase().indexOf(warrant.toLowerCase()) !== -1;
    }) : [];

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={setWarrant}
                searchValue={warrant}
                title="Warrants"
            >
                {filteredWarrants && filteredWarrants.map((w: any) => {
                    return (
                        <Paper
                            key={w.incident_id}
                            description={w.incident_title}
                            id={w.incident_id}
                            image={w.profile_image_url}
                            timestamp={w.warrant_expiry_timestamp}
                            timestampExtra="expires"
                            title={w.civ_name}
                            onClick={() => props.selectWarrant(w)}
                        />
                    )
                })}
            </Content>
            <div className={classes.spacer}></div>
            <Content
                search={true}
                onChangeSearch={setBolo}
                searchValue={bolo}
                title="BOLO"
            >
                {filteredBolos && filteredBolos.map((b: any) => {
                    return (
                        <Paper
                            useMdEditor={true}
                            key={b.id}
                            id={b.id}
                            description={b.description}
                            title={b.title}
                            timestamp={b.timestamp}
                            onClick={() => props.selectReport(b)}
                        />
                    )
                })}
            </Content>
            <div className={classes.spacer}></div>
            {isJob(['police']) && (
                <Content
                    search={true}
                    onChangeSearch={setBulletin}
                    searchValue={bulletin}
                    title="Bulletin Board"
                >
                    {filteredBulletins && filteredBulletins.map((b: any) => {
                        return (
                            <Paper
                                useMdEditor={true}
                                key={b.id}
                                id={b.id}
                                description={b.description}
                                title={b.title}
                                timestamp={b.timestamp}
                                onClick={() => props.selectReport(b)}
                            />
                        )
                    })}
                </Content>
            )}
        </div>
    )
}