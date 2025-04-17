import Button from "components/button/button"
import Text from "components/text/text"

export default (props: any) => {
    return (
        <div>
            <Text variant="h6" style={{ textAlign: 'center' }}>
                {props.sureText || 'Are you sure?'}
            </Text>
            <div style={{ minHeight: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button.Primary onClick={() => props.onClick()}>
                    Confirm
                </Button.Primary>
            </div>
        </div>
    )
}