const ResourceName = GetCurrentResourceName();
const MenuRequests = new Map();
let MenuCount = 0;

RegisterUICallback("ev-ui:menu:confirmation", ({
    key: pKey = {} as { id: number, accept: boolean }
}, cb: Function) => {
    const name = ResourceName + ':' + (pKey === null || pKey === void 0 ? void 0 : pKey.id);
    if (!MenuRequests.has(name)) return;

    MenuRequests.get(name)(pKey.accept);
    MenuRequests.delete(name);

    cb({ data: {}, meta: { ok: true, message: "" } });
});

export function ShowConfirmation(pTitle: string, pDescription: string) {
    const menuId = ++MenuCount;

    const menuData = [
        {
            title: pTitle,
            description: pDescription
        },
        {
            title: "Accept",
            action: "ev-ui:menu:confirmation",
            key: { id: menuId, accept: true }
        },
        {
            title: "Decline",
            action: "ev-ui:menu:confirmation",
            key: { id: menuId, accept: false }
        }
    ];
    const response = new Promise(resolve => {
        MenuRequests.set(ResourceName + ':' + menuId, resolve), setTimeout(() => resolve(false), 30000);
    });

    global.exports["ev-ui"].showContextMenu(menuData);

    return response;
}

let InputCount = 0;
const InputRequests = new Map();

RegisterUICallback("ev-ui:applicationClosed", (data: any, cb: Function) => {
    if (data.name !== "textbox" || (data === null || data === void 0 ? void 0 : data.callbackUrl) !== "ev-ui:menu:input") return;

    const request = InputRequests.get(data.inputKey);
    if (!request) return;

    request.resolve(null);

    InputRequests.delete(data.inputKey);
});

RegisterUICallback("ev-ui:menu:input", (data: any, cb: Function) => {
    cb({ data: {}, meta: { ok: true, message: "" } });

    const request = InputRequests.get(data.inputKey);
    if (!request) return;

    const success = request.validation ? request.validation(data === null || data === void 0 ? void 0 : data.values) : true;
    if (!success) return;

    request.resolve(data === null || data === void 0 ? void 0 : data.values);

    InputRequests.delete(data.inputKey);

    global.exports["ev-ui"].closeApplication("textbox");
});

export function OpenInputMenu<T>(pEntries: any, pValidation: any): T {
    const inputId = ++InputCount;

    const response = new Promise(resolve => {
        InputRequests.set(inputId, {
            resolve: resolve,
            validation: pValidation
        });
    });

    global.exports["ev-ui"].openApplication("textbox", {
        callbackUrl: "ev-ui:menu:input",
        inputKey: inputId,
        items: pEntries,
        show: true
    });

    return response as unknown as T;
}