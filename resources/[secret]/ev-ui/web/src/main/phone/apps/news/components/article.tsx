import { ComponentPaper } from 'components/paper';
import { ComponentDetails } from 'components/component-details';
import { ComponentDetailsAux } from 'components/component-details-aux';
import Text from 'components/text/text';
import { fromNow } from 'lib/date';

export default (props: any) => {
    const article = props.article;
    const onClick = props.onClick;

    return (
        <ComponentPaper onClick={onClick}>
            <div style={{ width: '100%' }}>
                <div style={{ overflow: 'hidden' }}>
                    <img
                        src={article.header_image}
                        alt={article.header_image}
                        style={{ maxWidth: '100%' }}
                    />
                </div>
                <div>
                    <Text variant="body1">
                        {article.title}
                    </Text>
                    <Text variant="body2" style={{ textAlign: 'right' }}>
                        {article.author} - {fromNow(article.modified_at)}
                    </Text>
                </div>
            </div>
        </ComponentPaper>
    )
}