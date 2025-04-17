import Text from "components/text/text";
import "../paper/component-paper.scss";
import Icon from "components/icon/icon";

function ComponentDetailsAux({
    children = null,
    icon = null,
    text = null,
    auxClass = '',
    onClick = () => {}
}: any) {
    return (
        <div className={`details-aux ${auxClass}`}>
            {!!children && children}
            {!children && (
                <div className="text" onClick={onClick}>
                    {!!text && (
                        <Text variant="body2">{text}</Text>
                    )}
                    {!!icon && (
                        //<i className={`fas fa-${icon} fa-fw fa-lg`} />
                        <Icon
                            icon={icon}
                            fixedWidth={true}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export {
    ComponentDetailsAux
}