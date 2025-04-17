import { ComponentDetails } from "components/component-details"
import { ComponentDrawer } from "components/component-drawer"
import { ComponentIcon } from "components/component-icon"
import { ComponentPaper } from "components/paper"
import { fromNow } from "lib/date"
import { formatCurrency } from "lib/format"
import Content from "main/san-andreas-state/components/content"

export default (props: any) => {
    return (
        <Content
            heading="Loans"
        >
            {props.loans && props.loans.length > 0 && props.loans.map((loan: Loan) => (
                <ComponentPaper
                    key={loan.id}
                    style={{ width: '100%' }}
                    drawer={<ComponentDrawer items={[
                        {
                            tooltip: 'Total',
                            icon: 'dollar-sign',
                            text: formatCurrency(loan.amount),
                        },
                        {
                            tooltip: 'Outstanding to State',
                            icon: 'dollar-sign',
                            text: `${formatCurrency(loan.state_owed)} / ${loan.interest_state}%`
                        },
                        {
                            tooltip: 'Outstanding to Business',
                            icon: 'dollar-sign',
                            text: `${formatCurrency(loan.civ_owed)} / ${loan.interest_civ}%`
                        },
                        {
                            tooltip: 'Last Payment',
                            icon: 'calendar',
                            text: `${fromNow(loan.last_payment)} - ${loan.payments_count} / ${loan.payments_total}`
                        },
                        {
                            tooltip: 'Created',
                            icon: 'calendar',
                            text: `${fromNow(loan.created_at)}`
                        }
                    ]} />}
                >
                    <ComponentIcon icon="donate" />
                    <ComponentDetails
                        title={`Citizen: ${loan.first_name} ${loan.last_name}`}
                        description={`Business: ${loan.business_name}`}
                    />
                </ComponentPaper>
            ))}
        </Content>
    )
}