import Content from 'main/mdt/components/content';
import useStyles from '../../../index.styles';
import Charge from './components/charge';
import Header from './components/header';
import chargeStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const chargeClasses = chargeStyles(props);

    return props.shouldUpdate === -1 ? null
    : (
        <div className={classes.contentWrapperColumn}>
            <Header changeSearchValue={props.changeSearchValue} />
            <div className={classes.contentWrapperAuto}>
                {Object.keys(props.categories).map((category: any) => (
                    <Content
                        key={category}
                        autoHeight={true}
                        title={category}
                        className={chargeClasses.wrapperCharge}
                        contentClassName={chargeClasses.contentCharge}
                    >
                        {props.categories[category].map((charge: any) => (
                            <Charge
                                key={charge.id}
                                charge={charge}
                                onAddCharge={props.onAddCharge}
                                onAddChargeAsAccomplice={props.onAddChargeAsAccomplice}
                                onAddChargeAsAccessory={props.onAddChargeAsAccessory}
                            />
                        ))}
                    </Content>
                ))}
            </div>
        </div>
    )
}