import * as BABYLON from '@babylonjs/core';
import { ACTIONS, MESH_TYPE } from '../assets/Constants';
import { getGroundPosition } from './CommonUtils';

let toolsPanel;
let action;
let scene;
let ground;
let canvas;
let selectedMesh;
let extrudePoints = [];

let currentPointMesh;
let startingPosition;

function init(options) {
    toolsPanel = options.toolsPanel;
    action = options.action;
    scene = options.scene;
    ground = options.ground;
    canvas = document.getElementById("renderCanvas");
    
    handleEvents();
}

function handleEvents() {
    scene.onPointerObservable.add((pointerInfo) => {
        
        // exit if current action is not vertexEdit
        if (action.current !== ACTIONS.VERTEX_EDIT) {
            return;
        }

        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                pointerDown(pointerInfo);
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                pointerUp();
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                pointerMove();
                break;
        }

    });

    // reset the selected mesh if vertexEditMode is not active
    let vertexEditButton = toolsPanel.getChildByName(ACTIONS.VERTEX_EDIT);
    vertexEditButton.onPointerUpObservable.add(resetMeshSelection);
}

function pointerDown(pointerInfo) {
    let pickInfo = pointerInfo.pickInfo;

    // select the mesh on Ctrl + LeftClick
    if (pointerInfo.event.button === 0 
        && pointerInfo.event.ctrlKey === true 
        && pickInfo.hit && pointerInfo.pickInfo.pickedMesh 
        && pointerInfo.pickInfo.pickedMesh.id === MESH_TYPE.EXTRUDED_SHAPE) {
            
            // reset the color of previous mesh
            resetMeshSelection();

            // set the currrent mesh as selected mesh
            selectedMesh = pointerInfo.pickInfo.pickedMesh;

            // set the selected mesh to wirframe mode
            selectedMesh.material.wireframe = true;

            // show the points on all the bottom vertices
            for (let point of selectedMesh.getChildMeshes()) {
                point.visibility = 1;
                extrudePoints.push(point);
            }
    } else if (pointerInfo.event.button === 0 
        && pointerInfo.event.ctrlKey === false 
        && pickInfo.hit && pointerInfo.pickInfo.pickedMesh) {
            // get the currentPoint mesh on which Left click was performed
            currentPointMesh = getTargetPointMesh();
            
            // if Left click was not over a point, escape
            if (!currentPointMesh) {
                return;
            }

            // get the current ground position of the pointer
            startingPosition = getGroundPosition(scene, ground);
            if (startingPosition) {
                // if clicked on vertex point to start dragging, disconnect camera from canvas
                setTimeout(function () {
                    scene._activeCamera.detachControl(canvas);
                }, 0);
            }
        }
}

function pointerUp() {
    if (startingPosition) {
        // connect camera to canvas
        scene._activeCamera.attachControl(canvas, true);

        // reset starting point
        startingPosition = null;
    }
}

function pointerMove() {
    // escape if it is not drag action
    if (!startingPosition) {
        return;
    }

    // get the position where pointer intersects with ground plane
    var current = getGroundPosition(scene, ground);
    if (!current) {
        return;
    }

    // get the coordinate difference b/w current point and starting point
    var diff = current.subtract(startingPosition);
    // add the difference to the current position of currentPointMesh
    currentPointMesh.position.addInPlace(diff);

    // slide the starting point
    startingPosition = current;

    // create new shape array to update the mesh
    let shape2 = [];
    for (let i = 0; i < extrudePoints.length; i++) {
        if (extrudePoints[i].metadata.id ===  currentPointMesh.metadata.id) {
            shape2.push(currentPointMesh.getBoundingInfo().boundingSphere.centerWorld);
        } else {
            shape2.push(extrudePoints[i].getBoundingInfo().boundingSphere.centerWorld);
        }
    }

    // push first point again to last of the shapeArray to complete the shape
    shape2.push(shape2[0]);

    let path2 = [
        new BABYLON.Vector3(0, 0, -0.3), 
        new BABYLON.Vector3(0, 0, 0)
    ];

    // update the mesh with new vertices
    selectedMesh = BABYLON.MeshBuilder.ExtrudeShape(null, { shape: shape2, path: path2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, instance: selectedMesh });
}

/**
 * 
 * @returns mesh of the point if it is hit by ray
 */
function getTargetPointMesh() {
    // create a picking ray
    let ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), scene._activeCamera, false);	
    
    // multipick with ray
    let hits = scene.multiPickWithRay(ray);

    // exit if there is no hits
    if (!hits) {
        return;
    }

    // return if the hits contains "point" type mesh
    for (let hit of hits) {
        if (hit.pickedMesh.metadata && hit.pickedMesh.metadata.type === MESH_TYPE.POINT) {
            return hit.pickedMesh;
        }
    }
}

/**
 * @summary resets the mesh to normal if it was selected for vertexEdit
 */
function resetMeshSelection() {
    if (selectedMesh) {
        // turn of the wireframe mode
        selectedMesh.material.wireframe = false;
        // hide all the points at the bottom of mesh
        for (let point of selectedMesh.getChildMeshes()) {
            point.visibility = 0;
        }
    }
    // reset extrudePoints
    extrudePoints = [];
}

const VertexEditUtils = {
    init: init,
    resetMeshSelection: resetMeshSelection
};

export default VertexEditUtils;