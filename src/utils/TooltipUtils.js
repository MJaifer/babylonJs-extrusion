import Tooltip from "../components/tooltip/Tooltip";
import { ACTIONS, CHECKBOX_NAME, TOOLTIP_HEADER, TOOLTIP_TEXT } from "../assets/Constants";

/**
 * @summary Inserts tooltips to all the buttons, checkboxes
 * @param {*} advancedTexture 
 * @param {*} toolsPanel StackPanel which holds all the buttons
 * @param {*} displaySettingsPanel StackPanel which holds all the checkboxes
 * @param {*} scene 
 */
function init(advancedTexture, toolsPanel, displaySettingsPanel, scene) {
    
    Tooltip.init({advancedTexture:advancedTexture, scene: scene});

    // insert tooltips buttons
    Tooltip.insertTooltip(toolsPanel.getChildByName(ACTIONS.DRAW), TOOLTIP_HEADER.DRAW, TOOLTIP_TEXT.DRAW, {top: '80%', left: '10%'});
    Tooltip.insertTooltip(toolsPanel.getChildByName(ACTIONS.MOVE), TOOLTIP_HEADER.MOVE, TOOLTIP_TEXT.MOVE, {top: '83%', left: '10%'});
    Tooltip.insertTooltip(toolsPanel.getChildByName(ACTIONS.VERTEX_EDIT), TOOLTIP_HEADER.VERTEX_EDIT, TOOLTIP_TEXT.VERTEX_EDIT, {top: '86%', left: '10%'});
    Tooltip.insertTooltip(toolsPanel.getChildByName(ACTIONS.EXTRUDE), TOOLTIP_HEADER.EXTRUDE, TOOLTIP_TEXT.EXTRUDE, {top: '77%', left: '10%'});
    
    // insert tooltips checkboxes
    Tooltip.insertTooltip(displaySettingsPanel.getChildByName(CHECKBOX_NAME.DISPLAY_AXES), TOOLTIP_HEADER.DISPLAY_AXES, [], {top: '6%', left: '12%'});
    Tooltip.insertTooltip(displaySettingsPanel.getChildByName(CHECKBOX_NAME.DISPLAY_INSPECTOR), TOOLTIP_HEADER.DISPLAY_INSPECTOR, [], {top: '8%', left: '12%'});

    // insert tooltip at the startup
    Tooltip.insertTooltip(null, TOOLTIP_HEADER.STARTUP_TOOLTIP, ['Click to hide'], null, true);

}

const TooltipUtils = {
    init: init
}

export default TooltipUtils;