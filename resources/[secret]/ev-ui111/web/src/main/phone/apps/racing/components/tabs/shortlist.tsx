import Text from "components/text/text";
import AppContainer from "main/phone/components/app-container";
import List from "../list";

export default (props: any) => {
    return (
        <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            <Text variant="h6">
                PM Shortlist
            </Text>
            <List
                headers={['#', 'Rating']}
                rows={[
                    {
                        key: '1',
                        style: {},
                        data: [
                            '1',
                            '500'
                        ]
                    }
                ]}
                cellStyle={{ padding: '6px 12px' }}
            />
        </AppContainer>
    )
}