import { _decorator, Component, Collider, ITriggerEvent } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { Score } from './Score';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {

    @property({ type: Number, tooltip: 'Coin value' })
    public coinValue: number = 5;

    @property({ type: Collider, tooltip: 'Car Collider' })
    public carCollider: Collider | null = null;

    start() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        if (event.otherCollider === this.carCollider) {
            const scoreManager = GameManager.Instance.node.getComponent(Score);
            if (scoreManager) {
                scoreManager.addScore(this.coinValue);
            }
            this.node.destroy(); 
        }
    }

    onDestroy() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
        }
    }
}

