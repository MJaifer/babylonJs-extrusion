import * as GUI from '@babylonjs/gui';

/**
 * @summary Creates and returns a button with the given properties
 * @param {*} params {width?, height?, color?, background?, cornerRadius?, isVisible?}
 * @returns 
 */
function createButton(params) {
    const button = GUI.Button.CreateSimpleButton(params.name, params.label);
    button.width = params.width? params.width: '100px';
    button.height = params.height? params.height: '35px';
    button.color = params.color? params.color: 'white';
    button.background = params.background? params.background: 'black';
    button.cornerRadius = params.cornerRadius? params.cornerRadius: 5;
    button.isVisible = params.isVisible == false? params.isVisible: true;
    return button;
}

/**
 * @summary Inserts group toggle behaviour on a group of buttons
 * @param {*} param 
 */
function setEvents(param) {
    param.button.onPointerUpObservable.add(function () {
        if (param.action.current === param.button.name) {
            param.button.background = 'black';
            param.action.prev = param.action.current;
            // param.action.current = '';
            param.action.setCurrent('');
        } else if (param.isToggle) {
            param.button.background = 'deepskyblue';
            // clear the previous action
            for (let button of param.buttons) {
                if (button.name === param.action.current) {
                    button.background = 'black';
                    param.action.prev = '';
                    break;
                }
            }
            // param.action.current = param.button.name;
            param.action.setCurrent(param.button.name);
        }
    });
}

const ButtonFactory = {
    createButton: createButton,
    setEvents: setEvents
};

export default ButtonFactory;