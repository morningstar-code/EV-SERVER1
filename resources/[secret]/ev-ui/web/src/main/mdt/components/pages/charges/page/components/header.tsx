import Text from "components/text/text";
import Content from "main/mdt/components/content";
import useStyles from "../index.styles";

export default (props: any) => {
    const classes = useStyles();

    const onChange = (value: any) => props.changeSearchValue(value);

    return (
        <Content
            search={true}
            autoHeight={true}
            onChangeSearch={onChange}
            searchValue={props.searchValue}
            title="Charges"
            className={classes.wrapper}
        >
            <Text variant="body1" className={classes.descriptionBox}>
                An accomplice differs from an accessory in that an accomplice is present at the actual crime, and could be prosecuted even if the main criminal (the principal) is not charged or convicted. An accessory is generally not present at the actual crime, and may be subject to lesser penalties than an accomplice or principal.
            </Text>
        </Content>
    )
}