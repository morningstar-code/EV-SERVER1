import React from "react";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import store from "./store";
import { connect } from "react-redux";
import { compose } from "lib/redux";
import Employment from "./components";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    getEmployment = async () => {
        const results = await nuiAction('ev-ui:getEmploymentInformation', {}, { returnData: devData.getEmploymentInformation() });
        
        this.props.updateState({
            list: results.data
        });
    }

    manageBusiness = async (business: any) => {
        this.props.updateState({
            activeBusiness: business,
            page: 1
        });

        const results = await Promise.all([
            nuiAction('ev-ui:getBusinessEmployees', { id: business.id }, { returnData: devData.getBusinessEmployees() }),
            nuiAction('ev-ui:getBusinessRoles', { id: business.id }, { returnData: devData.getBusinessRoles() })
        ]);

        const employees = results[0].data
        const roles = results[1].data;

        const sortedEmployees = employees.sort((a: any, b: any) => {
            return a.role === 'Founder'
                ? -1
                : b.role === 'Founder'
                    ? 1
                    : a.role === 'Owner'
                        ? -1
                        : b.role === 'Owner'
                            ? 1
                            : a.role === 'CEO'
                                ? -1
                                : b.role === 'CEO'
                                    ? 1
                                    : a.permissions.length >
                                        b.permissions.length
                                        ? -1
                                        : a.permissions.length <
                                            b.permissions.length
                                            ? 1
                                            : a.permissions.length ===
                                                b.permissions.length
                                                ? a.role > b.role
                                                    ? 1
                                                    : a.role < b.role
                                                        ? -1
                                                        : 0
                                                : 0;
        });

        this.props.updateState({
            employees: sortedEmployees,
            roles: roles
        });
    }

    manageLoans = async (business: any) => {
        this.props.updateState({
            page: 2,
            showLoading: true
        });

        const results = await Promise.all([
            nuiAction('ev-ui:getLoans', { type: 'business', id: business.code, params: { limit: this.props.loadedLoans, loanType: this.props.selectedLoanType, search: this.props.search } }, { returnData: devData.getLoans() }),
            nuiAction('ev-ui:getLoanConfig', {}, { returnData: devData.getLoanConfig() })
        ]);

        const loans = results[0].data;
        const config = results[1].data;

        this.props.updateState({
            loans: loans,
            loanConfig: config,
            showLoading: false
        });
    }

    viewLogs = () => {
        this.props.updateState({
            page: 3,
            showingLogs: true
        });
    }

    componentDidMount() {
        this.getEmployment();
        this.props.updateState({
            search: null,
            selectedLoanType: 1,
            loadedLoans: 100
        });
    }

    render() {
        return (
            <Employment {...this.props} getEmployment={this.getEmployment} manageBusiness={this.manageBusiness} manageLoans={this.manageLoans} viewLogs={this.viewLogs} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);