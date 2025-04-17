import { nuiAction } from "lib/nui-comms"
import Content from "main/san-andreas-state/components/content"
import Paper from "main/san-andreas-state/components/paper"

export default (props: any) => {
    return (
        <Content
            heading="Taxes"
        >
            {props.taxes && props.taxes.length > 0 && props.taxes.map((tax: Tax) => (
                <Paper
                    key={tax.id}
                    actions={[
                        {
                            isForm: true,
                            fields: [
                                {
                                    label: 'Tax Level Next Cycle',
                                    name: 'new_level',
                                    default: tax.new_level || '',
                                }
                            ],
                            onSubmit: async (data: any) => {
                                const results = await nuiAction('ev-ui:saveTaxOptions', {
                                    options: [
                                        {
                                            id: tax.id,
                                            new_level: Number(data.new_level)
                                        }
                                    ]
                                });

                                if (results.meta.ok) {
                                    props.getTaxes();
                                    return results.meta;
                                }
                            },
                            label: 'Change Tax'
                        }
                    ]}
                    heading={`${tax.name} (${tax.level}%)`}
                    headingExtra={tax.new_level ? `Value Next Cycle: ${tax.new_level}%` : ''}
                />
            ))}
        </Content>
    )
}