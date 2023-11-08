import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import ButtonFactory from '../button/ButtonFactory';
import { ACTIONS, CHECKBOX_NAME, LABEL } from '../../assets/Constants';
import { Inspector } from '@babylonjs/inspector';

var axes;

/**
 * @summary Inserts buttons in to the bottom left corner of the canvas
 * @param {*} action Object which holds previous and currently selected buttons
 * @returns StackPanel which contains the buttons
 */
function initToolsPanel(action) {
    
    // push all the buttons which needs to have toggled group behaviour into buttons array
    const buttons =[];

    // Draw button
    const drawButton = ButtonFactory.createButton({name: ACTIONS.DRAW, label: LABEL.DRAW});
    buttons.push(drawButton);

    // Move button
    const moveButton = ButtonFactory.createButton({name: ACTIONS.MOVE, label: LABEL.MOVE});
    buttons.push(moveButton);

    // Vertex Edit button
    const vertexEditButton = ButtonFactory.createButton({name: ACTIONS.VERTEX_EDIT, label: LABEL.VERTEX_EDIT});
    buttons.push(vertexEditButton);

    // Extrurde Button
    const extrudeButton = ButtonFactory.createButton({name: ACTIONS.EXTRUDE, label: LABEL.EXTRUDE,  isVisible: false});
    
    // Insert toggle group behaviour
    for (let button of buttons) {
        ButtonFactory.setEvents({button: button, buttons: buttons, action: action, isToggle: true});
    }

    // insert the buttons into StackPanel
    const panel = new GUI.StackPanel();
    panel.addControl(extrudeButton);
    panel.addControl(drawButton);
    panel.addControl(moveButton);
    panel.addControl(vertexEditButton);
    panel.adaptWidthToChildren = true;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    panel.left = '30px';
    panel.top = '-30px';
    return panel;
}

/**
 * @summary Inserts buttons in to the top left corner of the canvas
 * @param {*} scene 
 * @returns StackPanel which contains the checkboxes
 */
function initDisplaySettingsPanel(scene) {
    
    const displayAxesCheckBox = GUI.Checkbox.AddCheckBoxWithHeader(LABEL.DISPLAY_AXES, function(value) {
        if (value) {
            axes = new BABYLON.AxesViewer(scene, 1, null, null, null, null, 0.3);
        } else if (axes) {
            axes.dispose();
        }
    });
    displayAxesCheckBox.name = CHECKBOX_NAME.DISPLAY_AXES;
    displayAxesCheckBox.children[0].isChecked = false;
    displayAxesCheckBox.children[0].color = 'deepskyblue';
    
    const displayInspectorCheckBox = GUI.Checkbox.AddCheckBoxWithHeader(LABEL.DISPLAY_INSPECTOR, function(value) {
        if (value) {
            Inspector.Show(scene, {
                embedMode: true
            });
        } else {
            Inspector.Hide();
        }
    });
    displayInspectorCheckBox.name = CHECKBOX_NAME.DISPLAY_INSPECTOR;
    displayInspectorCheckBox.children[0].isChecked = false;
    displayInspectorCheckBox.children[0].color = 'deepskyblue';

    const panel = new GUI.StackPanel();
    panel.addControl(displayAxesCheckBox);
    panel.addControl(displayInspectorCheckBox);
    panel.adaptWidthToChildren = true;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    panel.left = '30px';
    panel.top = '30px';
    return panel;
}

const Panel = {
    initToolsPanel: initToolsPanel,
    initDisplaySettingsPanel: initDisplaySettingsPanel
}

export default Panel;