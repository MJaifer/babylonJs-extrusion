import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { init } from './App';

// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas);

const createScene = function() {
  const scene = new BABYLON.Scene(engine);
  init(scene);
  return scene;
}

const scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  scene.render();
})

// Watch for browser/canvas resize events
window.addEventListener('resize', function() {
  engine.resize();
})