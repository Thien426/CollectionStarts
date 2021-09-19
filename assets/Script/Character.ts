
import { _decorator, Component, Node, Enum, Animation } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Character
 * DateTime = Sun Sep 19 2021 09:18:30 GMT+0700 (Indochina Time)
 * Author = thien426
 * FileBasename = Character.ts
 * FileBasenameNoExtension = Character
 * URL = db://assets/Script/Character.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
enum CharacterStatus
{
    Idle = 0,
    MoveLeft = 1,
    MoveRight = 2
}

@ccclass('Character')
export class Character extends Component 
{
    @property(Animation)
    moveAnimation: Animation;

    _status: CharacterStatus;

    _idle: string;
    _left: string;
    _right: string;

    start ()
    {
        var clips = this.moveAnimation.clips;
        this._idle = clips[CharacterStatus.Idle].name;
        this._left = clips[CharacterStatus.MoveLeft].name;
        this._right = clips[CharacterStatus.MoveRight].name;
    }

    public setIdle()
    {
        this.setCharacterStatus(CharacterStatus.Idle);
    }

    public setMoveLeft()
    {
        this.setCharacterStatus(CharacterStatus.MoveLeft);
    }

    public setMoveRight()
    {
        this.setCharacterStatus(CharacterStatus.MoveRight);
    }

    setCharacterStatus(status: CharacterStatus)
    {
        if(this._status == status) return;
        this._status = status;

        switch (status) 
        {
            case CharacterStatus.Idle:
                this.moveAnimation.play(this._idle);
                break;
            
            case CharacterStatus.MoveLeft:
                this.moveAnimation.play(this._left);
                break;

            case CharacterStatus.MoveRight:
                this.moveAnimation.play(this._right);
                break;

            default:
                this.moveAnimation.play(this._idle);
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
