import { nuiAction } from "lib/nui-comms"
import Content from "main/san-andreas-state/components/content"
import Paper from "main/san-andreas-state/components/paper"

export default (props: any) => {
    return (
        <Content
            action={{
                label: 'Create License',
                fields: [
                    {
                        label: 'Name',
                        name: 'name',
                        default: '',
                    },
                    {
                        label: 'Code',
                        name: 'code',
                        default: '',
                    },
                ],
                onSubmit: async (data: any) => {
                    const results = await nuiAction('ev-ui:createLicense', data);
                    if (results.meta.ok) {
                        props.getLicenses();
                    }
                    return results.meta;
                }
            }}
            heading="Licenses"
        >
            {props.licenses && props.licenses.length > 0 && props.licenses.map((license: License) => (
                <Paper
                    key={license.id}
                    heading={license.name}
                    //headingExtra={license.description}
                />
            ))}
        </Content>
    )
}