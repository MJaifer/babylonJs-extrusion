import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import Panel from './components/panel/Panel';
import DrawingUtils from './utils/DrawingUtils';
import MoveUtils from './utils/MoveUtils';
import VertexEditUtils from './utils/VertexEditUtils';
import TooltipUtils from './utils/TooltipUtils';

/**
 * @summary Main entry point to the application
 * @param {*} scene 
 */
export function init(scene) {
    // setup the scene
    scene.createDefaultCameraOrLight(true, false, true);
    scene.clearColor = new BABYLON.Color3( .4, .4, .4);
    const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(1, 0, 1));
    light.intensity = 0.8;
    
    // insert ground mesh
    const ground = BABYLON.MeshBuilder.CreatePlane("ground", {size: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    
    /**
     * initialize the action object which contains previous and current 
     * clicked button to enable toggle functionality
     */
    const action = {
        prev: '', 
        current: '', 

        /**
         * current is always set through setCurrent method to track change
         * @param {*} cur 
         */
        setCurrent: function(cur) {
            this.current = cur;
            VertexEditUtils.resetMeshSelection();
        }
    };
    
    // create advanced texture
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
    
    // create toolsPanel which contains buttons
    const toolsPanel = Panel.initToolsPanel(action);
    advancedTexture.addControl(toolsPanel);

    // create displaySettingsPanel which contains checkboxes
    const displaySettingsPanel = Panel.initDisplaySettingsPanel();
    advancedTexture.addControl(displaySettingsPanel);

    // Insert tooltips
    TooltipUtils.init(advancedTexture, toolsPanel, displaySettingsPanel, scene);

    // Insert Drawing and Extrude functionalities
    DrawingUtils.init({action: action, toolsPanel: toolsPanel, scene: scene});
    
    // Insert Move functionality
    MoveUtils.init({action: action, toolsPanel: toolsPanel, ground: ground, scene: scene})

    // Insert VertexEdit functionality
    VertexEditUtils.init({action: action, toolsPanel: toolsPanel, ground: ground, scene: scene});
} 