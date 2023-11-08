import * as BABYLON from '@babylonjs/core';

let counter = 1;

function createPoint(scene, pickInfo) {
    let point = BABYLON.MeshBuilder.CreateSphere("point_" + counter, { diameter: 0.01 }, scene);
    point.position = pickInfo.pickedPoint;
    console.log('pickedPoint: ', pickInfo.pickedPoint);
    point.material = new BABYLON.StandardMaterial("markerMaterial", scene);
    point.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    point.metadata = {
        id: counter++,
        type: 'point'
    };
}

const PointUtils = {
    createPoint: createPoint
}

export default PointUtils;