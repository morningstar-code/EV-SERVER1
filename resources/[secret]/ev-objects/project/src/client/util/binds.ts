export function InitBinds() {
    global.exports['ev-keybinds'].registerKeyMapping('', 'Objects', 'Cursor Select', '+gizmoSelect', '-gizmoSelect', 'MOUSE_BUTTON');
    global.exports['ev-keybinds'].registerKeyMapping('', 'Objects', 'Translation', '+gizmoTranslation', '-gizmoTranslation', 'E');
    global.exports['ev-keybinds'].registerKeyMapping('', 'Objects', 'Rotation', '+gizmoRotation', '-gizmoRotation', 'R');
    global.exports['ev-keybinds'].registerKeyMapping('', 'Objects', 'Local', '+gizmoLocal', '-gizmoLocal', 'Q');
}