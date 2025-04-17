interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Vector4 extends Vector3 {
    h: number;
}

interface Character {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    number: number;
    bank_account_id: number;
    server_id: number;
    email: string;
}

interface ReturnData<T = unknown> {
    data: T;
    meta: { ok: boolean; message: string };
}

interface ReduxProps {
    character: Character;
    updateState: (data: any) => void;
    resetState: () => void;
}

interface SimpleFormRender<T = unknown> {
    value: T;
    values: any;
    onChange: (value: T) => void;
}

interface UIApp {
    name: string;
    render: React.FC | React.FunctionComponent;
    type: string;
}

type SimpleFormElement = {
    name: string;
    render: (props: SimpleFormRender<any>) => JSX.Element;
    validate?: string[] | { fn: (elementValue: any, elementValues?: any) => boolean, message: string };
};

interface SimpleForm {
    defaultValues?: { [key: string]: any };
    elements: SimpleFormElement[];
    onCancel?: () => void;
    onSubmit?: (values: any) => void;
    submitButtonValue?: string;
}