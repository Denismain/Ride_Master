import { _decorator, Component, Node, Vec3 } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';   
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property({ type: Node })
    target: Node | null = null;

    offset: Vec3 = new Vec3(-26, 20, 43);

    smoothSpeed: number = 0.125;    //Плавность слежения

    start() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    lateUpdate() {
        const desiredPosition = new Vec3();
        Vec3.add(desiredPosition, this.target.worldPosition, this.offset);

        const smoothedPosition = new Vec3();
        Vec3.lerp(smoothedPosition, this.node.worldPosition, desiredPosition, this.smoothSpeed);

        this.node.worldPosition = smoothedPosition;
    }

    onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.enabled = false;
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}
