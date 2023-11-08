
export const ACTIONS = Object.freeze({
    DRAW: 'draw',
    MOVE: 'move',
    VERTEX_EDIT: 'vertexEdit',
    EXTRUDE: 'extrude'
});

export const LABEL = Object.freeze({
    DRAW: 'Draw',
    MOVE: 'Move',
    EXTRUDE: 'Extrude',
    VERTEX_EDIT: 'Vertex Edit',
    DISPLAY_AXES: 'Display Axes',
    DISPLAY_INSPECTOR: 'Display Inspector'
});

export const MESH_TYPE = Object.freeze({
    GROUND: 'ground',
    POINT: 'point',
    LINE: 'line',
    EXTRUDED_SHAPE: 'extrudedShape'
});

export const CHECKBOX_NAME = Object.freeze({
    DISPLAY_AXES: 'displayAxes',
    DISPLAY_INSPECTOR: 'displayInspector'
});

export const TOOLTIP_HEADER = Object.freeze({
    DRAW: 'Draw Mode',
    MOVE: 'Move Mode',
    EXTRUDE: 'Extrude',
    VERTEX_EDIT: 'Vertex Edit Mode',
    DISPLAY_AXES: 'Display Axes',
    DISPLAY_INSPECTOR: 'Display Inspector',
    STARTUP_TOOLTIP: 'Ctrl + Drag to pan\n Scroll mouse wheel to adjust zoom\n Hover on Buttons/Checkboxes to view Tooltip'
});

export const TOOLTIP_TEXT = Object.freeze({
    DRAW: ['1. Left Click to add points', '2. Ctrl + Left click to select points', '3. Right click to connect points', '4. ESC to remove all selected points'],
    MOVE: ['Click and drag to move objects'],
    EXTRUDE: ['Extrude the created shape from ground to fixed height'],
    VERTEX_EDIT: ['1. Ctrl + Left click to select a shape', '2. Drag the yellow points to move vertices'],
    DISPLAY_AXES: ['To display 3 axes'],
    DISPLAY_INSPECTOR: ['To display Inspector']
});