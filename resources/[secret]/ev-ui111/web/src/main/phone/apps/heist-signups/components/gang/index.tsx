import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentDetails } from "components/component-details";
import Input from "components/input/input";
import Button from "components/button/button";
import Member from "./member";

const Gang: FunctionComponent<any> = (props) => {
    const gang = props.gang;
    const [heistWeight, setHeistWeight] = React.useState(gang.heistWeight);
    const [showMembers, setShowMembers] = React.useState(false);

    return (
        <>
            <ComponentPaper
                key={gang.id}
                actions={[]}
            >
                <ComponentDetails
                    title={gang.gangName}
                    description={(
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Input.Text
                                onChange={(e) => setHeistWeight(e)}
                                label="Current"
                                value={heistWeight}
                            />
                            <Button.Primary onClick={() => { }}>
                                Save
                            </Button.Primary>
                            <Button.Secondary onClick={() => setShowMembers(!showMembers)}>
                                Kids
                            </Button.Secondary>
                        </div>
                    )}
                />
            </ComponentPaper>
            {showMembers && gang.members.map((member) => (
                    <Member key={member.cid} member={member} {...props} />
            ))}
        </>
    )
}

export default Gang;