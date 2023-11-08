import * as BABYLON from '@babylonjs/core';
import { MESH_TYPE } from '../assets/Constants';

function extrude(lineMesh, selectedPoints, scene) {
    // get all the vertices of lineMesh
    const vertices = lineMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    if (!vertices) {
        return;
    }
    
    const shape = [];
    // insert Vector3 of the vertices into shape array
    for (let i = 0; i + 2 < vertices.length; i += 3) {
        shape.push(new BABYLON.Vector3(vertices[i], vertices[i + 1], 0));
    }

    // create path vector (hardcoded value)
    const path = [
        new BABYLON.Vector3(0, 0, -0.3), 
        new BABYLON.Vector3(0, 0, 0)
    ];

    // extrude shape
    const extrudedShape = BABYLON.MeshBuilder.ExtrudeShape(MESH_TYPE.EXTRUDED_SHAPE, {
        shape: shape, 
        path: path, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE, 
        updatable: true,
        cap: BABYLON.Mesh.CAP_ALL
    }, scene);

    extrudedShape.material = new BABYLON.StandardMaterial("extrudedShapeMaterial", scene);
    extrudedShape.material.emissiveColor = new BABYLON.Color3(0,0,0.5);
    extrudedShape.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    extrudedShape.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);

    // dispose the lines
    lineMesh.dispose();

    // add all the points as children of extruded mesh and hide it
    // later to be used while editing the vertices
    while (selectedPoints && selectedPoints.length > 0) {
        let point = selectedPoints.pop();
        // point.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        point.material.diffuseColor = new BABYLON.Color3(1.4, 3, 0.2);
        point.material.emissiveColor = new BABYLON.Color3(1.4, 3, 0.2);
        point.visibility = 0;
        extrudedShape.addChild(point);
    }
}

const ExtrudeUtils = {
    extrude: extrude
}

export default ExtrudeUtils;