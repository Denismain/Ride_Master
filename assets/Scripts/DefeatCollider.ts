import { _decorator, Component, Collider, ITriggerEvent, Node } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('DefeatCollider')
export class DefeatCollider extends Component {

    @property({ type: Node, tooltip: 'Trigger body' })
    public gameOverTriggerObject: Node | null = null;

    onLoad() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        if (event.otherCollider.node === this.gameOverTriggerObject) {
            if (GameManager.Instance.gameState !== GameState.GAME_OVER) {  
                GameManager.Instance.gameState = GameState.GAME_OVER;
            }
        }
    }

    onDestroy() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
        }
    }
}

