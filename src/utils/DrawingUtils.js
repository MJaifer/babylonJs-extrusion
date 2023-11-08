import * as BABYLON from '@babylonjs/core';
import PointUtils from './PointUtils';
import LineUtils from './LineUtils';
import ExtrudeUtils from './ExtrudeUtils';
import { ACTIONS, MESH_TYPE } from '../assets/Constants';

let selectedPoints = [];
let lineMesh;
let toolsPanel;
let action;
let scene;

/**
 * @summary Insert Drawing and Extrude functionalities to the application
 * @param {*} options 
 */
function init(options) {
    toolsPanel = options.toolsPanel;
    action = options.action;
    scene = options.scene;

    // handle the click event and keyboard 'ESC' key event
    handleEvents();
}

/**
 * @summary Handles Click event and Keyboard 'ESC' key event
 */
function handleEvents() {
    scene.onPointerObservable.add((pointerInfo) => {
        if (action.current === ACTIONS.DRAW && pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
            handlePointerDownEvents(pointerInfo);
        }
    });

    scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
            handleKeyboardKeyUpEvent(selectedPoints, kbInfo.event.code);
        }
    });
}

/**
 * @summary Handles click event in Draw Mode
 * @param {*} pointerInfo 
 * @description 
 * - Case 1: Left Click => Create point on the ground
 * - Case 2: Ctrl + Left Click => If click is over a point, selet the point
 * - Case 3: Right Click => If there are three or more points, draw a closed shape, show "Extrude" button
 */
function handlePointerDownEvents(pointerInfo) {
    // console.log(pointerInfo);
    let pickInfo = pointerInfo.pickInfo;

    if (pickInfo.hit && pointerInfo.event.button === 0 && pointerInfo.event.ctrlKey === false) { // case 1: mouse left only
        let targetPickInfo = getTargetPickInfo(scene);
        if (targetPickInfo.pickedMesh && targetPickInfo.pickedMesh.id == MESH_TYPE.GROUND) {
            PointUtils.createPoint(scene, pickInfo);
        }
    } else if (pickInfo.hit && pointerInfo.event.button === 0 && pointerInfo.event.ctrlKey === true) { // case 1: mouse left + cntrlKey
        let targetPickInfo = getTargetPickInfo(scene);
        if (targetPickInfo.pickedMesh 
            && targetPickInfo.pickedMesh.metadata 
            && targetPickInfo.pickedMesh.metadata.type == MESH_TYPE.POINT) {
            // change the color of selected points to red
            targetPickInfo.pickedMesh.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            // add selected points to selectedPoints array
            selectedPoints.push(targetPickInfo.pickedMesh);
        }
    } else if (pointerInfo.event.button === 2) {
        if (selectedPoints.length < 2) {
            return;
        }
        // if there is more than 2 selectedPoints, create an enclosing line in the order of selection
        lineMesh = LineUtils.generateLines(selectedPoints, scene);
        let isClosed = LineUtils.isClosedLine(lineMesh);
        if (isClosed === true) {
            // show the extrude button when the shape is closed
            let extrudeButton = toolsPanel.getChildByName(ACTIONS.EXTRUDE);
            extrudeButton.isVisible = true;
            extrudeButton.onPointerUpObservable.add(function() {
                // Extrude the shape if extrudeButton is clicked
                ExtrudeUtils.extrude(lineMesh, selectedPoints, scene);
                // hide extrude button
                extrudeButton.isVisible = false;
            });
        }
    }
}

/**
 * Handles Keyboard 'ESC' key event
 * @param {*} selectedPoints 
 * @param {*} currentKey 
 * @description - Removes all the points from selection
 */
function handleKeyboardKeyUpEvent(selectedPoints, currentKey) {
    if (currentKey === 'Escape') {
        while(selectedPoints && selectedPoints.length > 0) {
            let point = selectedPoints.pop();
            point.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        }
    }
}

function getTargetPickInfo() {
    let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), scene._activeCamera, false);	
    return scene.pickWithRay(ray);
}

const DrawingUtils = {
    init: init
};

export default DrawingUtils;