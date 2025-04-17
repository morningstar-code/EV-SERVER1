import React from "react";
import { mdtAction } from "main/mdt/actions";
import useStyles from "../../index.styles";
import { isJob } from "lib/character";
import Content from "../../content";
import Button from "components/button/button";
import Paper from "../../paper";
import { openMdtBusinessBankAccessModal, openMdtBusinessChangeOwnerModal, openMdtBusinessHistoryModal, openMdtChangeBusinessNameModal, openMdtCreateBusinessModal } from "./actions";

export default (props: any) => {
    const [businessId, setBusinessId] = React.useState(0);
    const [accountId, setAccountId] = React.useState(0);
    const [businessSearchValue, setBusinessSearchValue] = React.useState('');
    const [businesses, setBusinesses] = React.useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [filteredEmployees, setFilteredEmployees] = React.useState([]);
    const [employeeSearchValue, setEmployeeSearchValue] = React.useState('');

    const fetchEmployees = React.useCallback(async (bizId: number, accId: number) => {
        const results = await mdtAction('getEmployeesByBusinessId', { businessId: bizId }, [
            {
                id: 1,
                first_name: 'Kevin',
                last_name: 'Malagnaggi',
                role: 'Owner'
            }
        ]);

        if (results.meta.ok) {
            setFilteredEmployees(results.data);
            setEmployees(results.data);
            setBusinessId(bizId);
            setAccountId(accId);
        }
    }, []);

    const fetchBusinesses = React.useCallback(async () => {
        const results = await mdtAction('getBusinesses', {}, [
            {
                id: 'test_business',
                name: 'Test Business',
                account_id: 1
            }
        ]);

        if (results.meta.ok) {
            setFilteredBusinesses(results.data);
            setBusinesses(results.data);
        }
    }, []);

    const bankAccess = (employeeId: number) => {
        openMdtBusinessBankAccessModal({ employeeId: employeeId, accountId: accountId });
    }

    const changeOwner = (bizEmployees: any) => {
        const employee = bizEmployees.find(employee => employee.role === 'Owner');
        const ownerId = employee?.id ?? -1;
        const newOwner = ownerId !== null ? ownerId : -1;
        openMdtBusinessChangeOwnerModal({
            owner: newOwner,
            businessId: businessId,
            fetchEmployees: fetchEmployees,
            accountId: accountId
        });
    }

    const renameBusiness = () => {
        openMdtChangeBusinessNameModal({ fetchBusinesses: fetchBusinesses, businessId: businessId, accountId: accountId });
    }

    const businessHistory = () => {
        openMdtBusinessHistoryModal({ businessId: businessId });
    }

    const createBusiness = () => {
        openMdtCreateBusinessModal({ fetchBusinesses: fetchBusinesses });
    }

    React.useEffect(() => {
        fetchBusinesses();
    }, [fetchBusinesses]);

    const classes = useStyles(props);
    const isJudgeOrPolice = isJob(['judge', 'police']);
    const isJudge = isJob(['judge']);

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={(value: any) => {
                    const filtered = businesses.filter((business: any) => business.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
                    setFilteredBusinesses(filtered);
                    setBusinessSearchValue(value);
                }}
                searchValue={businessSearchValue}
                title="Business Directory"
            >
                {isJudge ? (
                    <div className={classes.judgeControlsWrapper}>
                        <Button.Primary onClick={createBusiness}>
                            Create Business
                        </Button.Primary>
                    </div>
                ) : null}
                {filteredBusinesses && filteredBusinesses.map((business: any) => (
                    <Paper
                        key={business.id}
                        title={business.name}
                        titleExtra={isJudgeOrPolice ? `Account ID: ${business.account_id}` : ''}
                        onClick={() => fetchEmployees(business.id, business.account_id)}
                    />
                ))}
            </Content>
            <Content
                search={true}
                onChangeSearch={(value: any) => {
                    const filtered = employees.filter((employee: any) => employee.first_name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 || employee.last_name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1);
                    setFilteredEmployees(filtered);
                    setEmployeeSearchValue(value);
                }}
                searchValue={employeeSearchValue}
                title={`Employee List (${filteredEmployees.length})`}
            >
                <div className={classes.judgeControlsWrapper}>
                    {businessId && isJudgeOrPolice && (
                        <>
                            <Button.Primary onClick={() => businessHistory()}>
                                History
                            </Button.Primary>
                            <span>{'\xA0'}</span>
                        </>
                    )}
                    {businessId && isJudge && (
                        <>
                            <Button.Primary onClick={() => renameBusiness()}>
                                Rename
                            </Button.Primary>
                            <span>{'\xA0'}</span>
                            <Button.Primary onClick={() => changeOwner(filteredEmployees)}>
                                Change Owner
                            </Button.Primary>
                        </>
                    )}
                </div>
                {filteredEmployees && filteredEmployees.map((employee: any) => (
                    <Paper
                        key={employee.id}
                        title={`${employee.first_name} ${employee.last_name}`}
                        titleExtra={`Role: ${employee.role}`}
                        description={`State ID: ${employee.id}`}
                    >
                        {isJudge && (
                            <div className={classes.employeeButtons}>
                                <Button.Primary onClick={() => bankAccess(employee.id)}>
                                    Bank Access
                                </Button.Primary>
                            </div>
                        )}
                    </Paper>
                ))}
            </Content>
        </div>
    )
}