import { _decorator, Component, Input, EventTouch, Vec2, Vec3 } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('Touch')
export class Touch extends Component {

    minY: number = -110;
    maxY: number = 110;

    private _startTouchPos: Vec2 = new Vec2();
    private _startNodeY: number = 0;

    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event: EventTouch) {
        this._startTouchPos = event.getUILocation();
        this._startNodeY = this.node.position.y;
        if (GameManager.Instance.gameState !== GameState.GAME_PLAY) {  
            GameManager.Instance.gameState = GameState.GAME_PLAY;
        }
    }

    onTouchMove(event: EventTouch) {
        const touchPos = event.getUILocation();
        const deltaY = touchPos.y - this._startTouchPos.y;

        let newY = this._startNodeY + deltaY;

        newY = Math.min(this.maxY, Math.max(this.minY, newY));

        this.node.setPosition(new Vec3(this.node.position.x, newY, this.node.position.z));
    }

    onTouchEnd(event: EventTouch) {
        this.resetTouch();
    }

    onTouchCancel(event: EventTouch) {
        this.resetTouch();
    }

    private resetTouch() {
        this._startTouchPos = new Vec2();
        this._startNodeY = this.minY; 
        this.node.setPosition(new Vec3(this.node.position.x, this.minY, this.node.position.z));
    }


    onDestroy() {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

    }
}



