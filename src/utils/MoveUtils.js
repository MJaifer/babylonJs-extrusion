import * as BABYLON from '@babylonjs/core';
import { ACTIONS, MESH_TYPE } from '../assets/Constants';

let toolsPanel;
let action;
let canvas;
let ground;
let scene;

var currentMesh;
var startingPoint;

/**
 * @summary Inserts Move functionality to the application
 * @param {*} options 
 */
function init(options) {
    toolsPanel = options.toolsPanel;
    action = options.action;
    canvas = document.getElementById("renderCanvas");
    if (options.ground) {
        ground = options.ground;
    }
    if (options.scene) {
        scene = options.scene;
    }
    handleEvents();
}

function handleEvents() {
    scene.onPointerObservable.add((pointerInfo) => {
        // exit if current action is not 'move'
        if (action.current !== ACTIONS.MOVE) {
            return;
        }

        // handle pointerDown, Up and Move
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                if(pointerInfo.pickInfo.hit 
                    && pointerInfo.pickInfo.pickedMesh 
                    && pointerInfo.pickInfo.pickedMesh.id === MESH_TYPE.EXTRUDED_SHAPE) {
                    pointerDown(pointerInfo.pickInfo.pickedMesh, scene);
                }
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                pointerUp(scene);
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                pointerMove(scene);
                break;
        }
    });
}

function pointerDown(mesh, scene) {
    // initialize currentMesh and startingPoint
    currentMesh = mesh;
    startingPoint = getGroundPosition();

    // if clicked on extruded mesh to start dragging, disconnect camera from canvas
    if (startingPoint) {
        setTimeout(function () {
            scene._activeCamera.detachControl(canvas);
        }, 0);
    }
}

function pointerUp(scene) {
    if (startingPoint) {
        // connect camera to canvas
        scene._activeCamera.attachControl(canvas, true);

        // reset starting point
        startingPoint = null;
    }
}

function pointerMove(scene) {
    // if startingPoint is not initialized, which means there was no dragging
    if (!startingPoint) {
        return;
    }

    // get the position where pointer intersects with ground plane
    var current = getGroundPosition();
    if (!current) {
        return;
    }

    // get the coordinate difference b/w current point and starting point
    var diff = current.subtract(startingPoint);

    // add the difference to the current position of currentMesh
    currentMesh.position.addInPlace(diff);

    // slide the starting point
    startingPoint = current;
}

function getGroundPosition() {
    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { 
        return mesh == ground;
    });
    if (pickinfo.hit) {
        return pickinfo.pickedPoint;
    }
    return null;
}

const MoveUtils = {
    init: init,
    handleEvents: handleEvents
};

export default MoveUtils;