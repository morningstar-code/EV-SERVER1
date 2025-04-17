import { Menu, MenuItem, Tabs } from '@mui/material';
import Text from 'components/text/text';
import React from 'react';
import useStyles from './index.styles';

const extraProps = [
    'onChange',
    'dropdownTab',
    'dropdownItems',
    'dropdownValue',
    'onDropdownChange',
];

interface DropdownTabsProps {
    value: number;
    dropdownValue: string;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    onDropdownChange: (event: React.SyntheticEvent, newValue: string) => void;
    dropdownItems: { value: string, text: string }[];
    dropdownTab: React.ReactElement;
    indicatorColor: string;
    textColor: string;
    variant: string;
    style: any;
}

export default (props: React.PropsWithChildren<DropdownTabsProps>) => {
    const classes = useStyles(props);
    const onChange = props.onChange;
    const dropdownTab = props.dropdownTab;
    const dropdownItems = props.dropdownItems;
    const dropdownValue = props.dropdownValue;
    const onDropdownChange = props.onDropdownChange;
    const componentProps = { ...props as any, ...extraProps };

    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    const dropdownMemo = React.useMemo(() => {
        return dropdownTab ? React.cloneElement(dropdownTab, {
            ref: dropdownRef
        }) : null;
    }, [dropdownTab]);

    return (
        <>
            <Tabs {...componentProps} onChange={(e: React.SyntheticEvent, value: number) => {
                if (dropdownTab && e.currentTarget === dropdownRef.current) {
                    if (e.currentTarget instanceof Element) {
                        setOpen(true);
                    } else if (onDropdownChange !== null) {
                        onDropdownChange(e, '');
                    }
                } else {
                    onChange(e, value);
                }
            }}>
                {componentProps.children}
                {dropdownMemo}
            </Tabs>
            <Menu
                anchorEl={dropdownRef.current}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {dropdownItems && dropdownItems.map((item) => (
                    <MenuItem
                        key={item.value}
                        onClick={(e: React.SyntheticEvent) => {
                            return (function (e, value) {
                                setOpen(false);
                                onDropdownChange && onDropdownChange(e, value);
                                onChange && onChange(e, React.Children.count(componentProps.children));
                            })(e, item.value);
                        }}
                    >
                        <Text className={dropdownValue === item.value ? classes.dropdownItemActive : null}>
                            {item.text}
                        </Text>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}