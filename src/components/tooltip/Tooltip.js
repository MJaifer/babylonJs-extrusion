import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { ACTIONS } from '../../assets/Constants';

let scene;
let advancedTexture;
let isStartup;

function init(options) {
    scene = options.scene;
    advancedTexture = options.advancedTexture;
    isStartup = true;
}

/**
 * @summary Inserts tooltip to the given button/checkbox
 * @param {*} button Button on which the tooltip is to be inserted
 * @param {*} headerText Heading of the tooltip
 * @param {*} contents Contents of the tooltip as array of text
 * @param {*} position Absolute position of the tooltip
 * @param {*} loadAtStartup Load tooltip at startup of the application
 */
function insertTooltip(button, headerText, contents, position, loadAtStartup) {
    
    // create the main container
    var container = new GUI.Container();
    container.adaptHeightToChildren = true;
    container.adaptWidthToChildren = true;
    container.verticalAlignment = 0;
    container.horizontalAlignment = 0;
    advancedTexture.addControl(container);
    container.isVisible = false;
    if (position) {
        container.top = position.top;
        container.left = position.left;
    }

    if (loadAtStartup) {
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    }

    // insert rectangle to insert background
    let background = new GUI.Rectangle();
    background.thickness = 1.5;
    background.background = "#181d31";
    background.color = "#CFCFCF";
    background.cornerRadius = 10;
    background.alpha = 0.4;
    container.addControl(background);

    // create the main stack to add all the contents
    let mainStack = new GUI.StackPanel();
    mainStack.verticalAlignment = 0;
    mainStack.adaptWidthToChildren = true;
    mainStack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    container.addControl(mainStack);

    // create top container to insert header
    let top = new GUI.Container();
    top.adaptHeightToChildren = true;
    top.paddingTop = "10px";
    top.paddingBottom = "5px";
    top.adaptWidthToChildren = true;
    top.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    mainStack.addControl(top);

    // insert header to top container
    let header = new GUI.TextBlock();
    header.text = headerText;
    header.color = "white";
    header.alpha = 1.1;
    header.resizeToFit = true;
    header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    header.verticalAlignment = 0;
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    header.textVerticalAlignment = 0;
    header.paddingLeft = "10px";
    header.paddingRight = "10px";
    top.addControl(header);

    // create body container
    let body = new GUI.Container();
    body.adaptHeightToChildren = true;
    body.adaptWidthToChildren = true;
    body.width = 1;
    body.paddingBottom = "5px";
    body.paddingLeft = "10px";
    body.paddingRight = "10px";
    mainStack.addControl(body);

    // create bodyStack to insert body contents
    let bodyStack = new GUI.StackPanel();
    bodyStack.isVertical = true;
    bodyStack.adaptHeightToChildren = true;
    bodyStack.adaptWidthToChildren = true;
    bodyStack.width = 1;
    body.addControl(bodyStack);

    for (let content of contents) {
        // insert each line to the bodyStack
        insertContents(content, "white", "14px", bodyStack);
    }

    // insert blank space at the bottom
    if (contents.left > 0) {
        insertContents("", "white", "10px", bodyStack);
    }

    if (button) {
        // make the tooltip visible on buttonHover
        button.onPointerEnterObservable.add(function () {
            container.isVisible = true;
        });
        
        button.onPointerOutObservable.add(function () {
            container.isVisible = false;
        });

        button.onPointerClickObservable.add(function () {
            container.isVisible = false;
        });
    }

    if (loadAtStartup) {
        container.isVisible = true;
        scene.onPointerObservable.add((pointerInfo) => {
            if (!isStartup) {
                return;
            }

            if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                isStartup = false;
                container.isVisible = false;
            }            
        });
    }
}

function insertContents(contentText, color, fontSize, parent) {
    const contentTextBlock = new GUI.TextBlock();
    contentTextBlock.color = color;
    contentTextBlock.fontSize = fontSize;
    contentTextBlock.text = contentText;
    contentTextBlock.horizontalAlignment = 0;
    contentTextBlock.verticalAlignment = 0;
    contentTextBlock.textHorizontalAlignment = 0;
    contentTextBlock.textVerticalAlignment = 0;
    contentTextBlock.resizeToFit = true;
    parent.addControl(contentTextBlock);
}

const Tooltip = {
    init: init,
    insertTooltip: insertTooltip
}

export default Tooltip;
