const components = {};

const requireComponent = require.context(
    '../../main', // components folder
    true, // look subfolders
    /_config\.tsx$/, //regex for files
)

export function getConfigObject() {
    requireComponent.keys().forEach(filePath => {
        const component = requireComponent(filePath);
        components[filePath] = component;
    });

    return components;
}