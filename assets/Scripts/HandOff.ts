import { _decorator, Component } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('HandOff')
export class HandOff extends Component {
    start() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }
    
    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_PLAY) {
                this.node.active = false; 
            }
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}

