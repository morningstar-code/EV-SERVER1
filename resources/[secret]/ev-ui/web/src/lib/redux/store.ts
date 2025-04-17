const stores = {};

const requireComponent = require.context(
    '../../main',
    true, // look subfolders
    /store\.ts$/, //regex for files
)

export function getStoreObject() {
    requireComponent.keys().forEach(filePath => {
        const component = requireComponent(filePath);
        stores[filePath] = component;
    });
    
    return stores;
}