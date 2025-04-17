import { fromNow } from "lib/date";
import Content from "main/san-andreas-state/components/content"
import Paper from "main/san-andreas-state/components/paper"
import Option from "./option";

export default (props: any) => {
    return (
        <Content
            action={props?.active ? {
                label: 'Create Ballot',
                fields: [
                    {
                        label: 'Name',
                        name: 'name',
                        default: '',
                    },
                    {
                        label: 'Description',
                        name: 'description',
                        default: '',
                    },
                    {
                        label: 'Multiple Choice',
                        name: 'multi',
                        type: 'checkbox',
                        default: false,
                    },
                    {
                        label: 'Start Date',
                        name: 'start_date',
                        type: 'date',
                        default: new Date(),
                    },
                    {
                        label: 'End Date',
                        name: 'end_date',
                        type: 'date',
                        default: new Date(),
                    },
                ],
                onSubmit: async (data: any) => {
                    const results = await props.saveBallot({}, data);
                    return results.meta;
                }
            } : null}
            heading={props.active ? "Active / Upcoming" : "Expired"}
        >
        {props?.ballots && props?.ballots?.length > 0 && props?.ballots?.map((ballot: Ballot) => (
            <Paper
                key={ballot.id}
                actions={props.active ? [
                    {
                        isForm: true,
                        fields: [
                            {
                                label: 'Name',
                                name: 'name',
                                default: ''
                            },
                            {
                                label: 'Description',
                                name: 'description',
                                default: ''
                            },
                            {
                                label: 'Icon',
                                name: 'icon',
                                default: 'Choose from: https://fontawesome.com/icons?d=gallery&m=free'
                            },
                            {
                                label: 'Affiliated Party',
                                name: 'party',
                                default: ''
                            }
                        ],
                        onSubmit: async (data: any) => {
                            const results = await props.addBallotOption(ballot, data);
                            return results.meta;
                        },
                        label: 'Add Option'
                    },
                    {
                        isForm: true,
                        fields: [
                            {
                                label: 'Name',
                                name: 'name',
                                default: ballot.name,
                            },
                            {
                                label: 'Description',
                                name: 'description',
                                default: ballot.description,
                            },
                            {
                                label: 'Multiple Choice',
                                name: 'multi',
                                type: 'checkbox',
                                default: ballot.multi,
                            },
                            {
                                label: 'Start Date',
                                name: 'start_date',
                                type: 'date',
                                default: new Date(1000 * ballot.start_date),
                            },
                            {
                                label: 'End Date',
                                name: 'end_date',
                                type: 'date',
                                default: new Date(1000 * ballot.end_date),
                            },
                        ],
                        onSubmit: async (data: any) => {
                            const results = await props.saveBallot(ballot, data);
                            return results.meta;
                        },
                        label: 'Edit Ballot'
                    },
                    {
                        isConfirm: true,
                        label: 'Delete Ballot',
                        onConfirm: async () => {
                            const results = await props.deleteBallot(ballot);
                            return results.meta;
                        }
                    }
                ] : null}
                heading={`${ballot.name} (${ballot.multi ? 'Multiple Choice' : 'Single Choice'})`}
                headingExtra={`${fromNow(ballot.start_date)} / ${fromNow(ballot.end_date)}`}
            >
                {ballot?.options && ballot?.options?.length > 0 && ballot?.options?.map((option: BallotOption) => (
                    <Option
                        key={option.id}
                        {...props}
                        option={option}
                        active={props.active}
                    />
                ))}
            </Paper>
        ))}
        </Content>
    )
}