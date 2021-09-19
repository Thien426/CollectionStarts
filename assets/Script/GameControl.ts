
import { _decorator, Component, Node, SystemEvent, systemEvent, EventKeyboard, KeyCode } from 'cc';
import { Character } from './Character';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameControl
 * DateTime = Sun Sep 19 2021 09:35:42 GMT+0700 (Indochina Time)
 * Author = thien426
 * FileBasename = GameControl.ts
 * FileBasenameNoExtension = GameControl
 * URL = db://assets/Script/GameControl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('GameControl')
export class GameControl extends Component 
{
    // [1]
    // dummy = '';

    @property(Character)
    character: Character;

    _currentKeyCode: KeyCode = 0;
    _listKeyCode: KeyCode[] = [];

    start () 
    {
        console.log("start: ");
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy()
    {
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyUp(event: EventKeyboard)
    {
        var keyCode = event.keyCode;
        var index = this._listPreviousKeyCode.indexOf(keyCode);
        if(index < 0) return;

        this._listPreviousKeyCode.splice(index, 1);
        
        if(this._listPreviousKeyCode.length == 0)
        {
            this._currentKeyCode = KeyCode.NONE;
            this.character.setIdle();
            return;
        }

        if(index != this._listPreviousKeyCode.length) return;
        
        this.controlCharacter(this._listPreviousKeyCode.pop());
    }

    onKeyDown(event: EventKeyboard)
    {
        this.controlCharacter(event.keyCode);
    }

    controlCharacter(keyCode: KeyCode)
    {
        if(this._currentKeyCode == keyCode) return;
        
        switch (keyCode) 
        {
            case KeyCode.ARROW_LEFT:
                this.character.setMoveLeft();
                this._currentKeyCode = keyCode;
                this._listKeyCode.push(keyCode);
                break;

            case KeyCode.ARROW_RIGHT:
                this.character.setMoveRight();
                this._currentKeyCode = keyCode;
                this._listKeyCode.push(keyCode);
                break;

            case KeyCode.ARROW_UP:
                this.character.setIdle();
                break;
        
            default:
                break;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
