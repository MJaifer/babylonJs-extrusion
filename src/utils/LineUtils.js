import * as BABYLON from '@babylonjs/core';
import { MESH_TYPE } from '../assets/Constants';

function generateLines(selectedPoints, scene) {
    let points = [];
    for (let point of selectedPoints) {
        let pointVector = point.getBoundingInfo().boundingSphere.centerWorld;
        points.push(new BABYLON.Vector3(pointVector.x, pointVector.y, 0));
    }
    points.push(points[0]);
    const lineMesh = BABYLON.MeshBuilder.CreateLines(MESH_TYPE.LINE, {points: points}, scene);
    lineMesh.material = new BABYLON.StandardMaterial('lineMaterial', scene);
    lineMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    return lineMesh;
}

function isClosedLine(lineMesh) {
    // return false if the noOf vertices are less than 3
    if (lineMesh.getTotalVertices() < 4) {
        return false;
    }

    let vertices = lineMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    
    // check if the first and last points are the same
    // compare firstItem in vertices array with thirdLast item, second with secondLast and third with last
    for (let i = 0; i < 3; i++) {
        if (vertices[i] !== vertices[vertices.length - (3 - i)]) {
            return false;
        }
    }
    return true;
}

const LineUtils = {
    generateLines: generateLines,
    isClosedLine: isClosedLine
};

export default LineUtils;