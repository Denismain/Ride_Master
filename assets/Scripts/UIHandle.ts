import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('UIHandler')
export class UIHandler extends Component {

    @property({ type: Node, tooltip: 'Switch UI1' })
    public uiToToggle1: Node | null = null;

    @property({ type: Node, tooltip: 'Swicth UI2' })
    public uiToToggle2: Node | null = null;

    start() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.toggleUI();
        }
    }

    private toggleUI() {
        if (this.uiToToggle1) {
            this.uiToToggle1.active = !this.uiToToggle1.active; 
        }
        if (this.uiToToggle2) {
            this.uiToToggle2.active = !this.uiToToggle2.active;
        }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}