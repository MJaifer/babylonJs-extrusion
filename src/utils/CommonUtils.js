
export function getGroundPosition(scene, ground) {
    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { 
        return mesh == ground;
    });
    if (pickinfo.hit) {
        return pickinfo.pickedPoint;
    }
    return null;
}