import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentDetails } from "components/component-details";
import Input from "components/input/input";
import Button from "components/button/button";

const Member: FunctionComponent<any> = (props) => {
    const member = props.member;
    const [heistWeight, setHeistWeight] = React.useState(member.heistWeight);

    return (
        <ComponentPaper
            key={member.cid}
            actions={[]}
        >
            <ComponentDetails
                title={`>> ${member.name}`}
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
                    </div>
                )}
            />
        </ComponentPaper>
    )
}

export default Member;