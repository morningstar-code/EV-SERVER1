import React from "react";
import Input from "components/input/input"
import Content from "main/san-andreas-state/components/content"
import Button from "components/button/button";
import { ComponentPaper } from "components/paper";
import { ComponentDetails } from "components/component-details";
import ComponentPaperImage from "components/component-paper-image";

let timeout: any = 0;
export default (props: any) => {
    const [searchValue, setSearchValue] = React.useState<string>('');

    return (
        <Content
            heading="Farmers Items / Banners"
        >
            <div style={{ marginBottom: 8 }}>
                <Input.Search
                    onChange={(value: string) => {
                        setSearchValue(value);
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            props.changeSearchValue(value);
                        }, 1000);
                    }}
                    value={searchValue}
                />
            </div>
            {props.farmersItems && props.farmersItems.length > 0 && props.farmersItems.map((item: FarmerItem) => (
                <div key={item.id}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                        <Button.Secondary onClick={() => props.performAction('reject', item.id)}>
                            Reject
                        </Button.Secondary>
                        <Button.Primary onClick={() => props.performAction('approve', item.id)} style={{ marginLeft: 16 }}>
                            Approve
                        </Button.Primary>
                    </div>
                    <ComponentPaper style={{ width: '100%' }}>
                        <ComponentPaperImage>
                            <img
                                src={item.image}
                                alt="logo"
                                style={{ maxWidth: 100, maxHeight: 100 }}
                            />
                        </ComponentPaperImage>
                        <ComponentDetails
                            title={`Important ID: ${item.id} - ${item.name}`}
                            description={`${item.type} - ${item.item_type} - ${item.description}`}
                        />
                    </ComponentPaper>
                </div>
            ))}
        </Content>
    )
}