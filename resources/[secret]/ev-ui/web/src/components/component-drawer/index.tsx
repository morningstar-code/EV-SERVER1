import Item from "./item";
import "../paper/component-paper.scss";

function ComponentDrawer({
    children = null,
    items,
}: any) {
    return (
        <>
            {items && items.length > 0 && items.map((item: any, index: any) => (
                <Item item={item} key={index} index={index} />
            ))}
            {children}
        </>
    );
}

export {
    ComponentDrawer
}