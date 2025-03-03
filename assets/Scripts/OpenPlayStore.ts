import { _decorator, Component, Input, EventMouse, sys, Vec3, UIOpacity } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('OpenPlayStore')
export class OpenPlayStore extends Component {

    @property({ type: String, tooltip: "Play Market URL" })
    playMarketURL: string = "https://play.google.com/store/apps/details?id=com.LuB.DeliveryConstruct&hl=en"; 

    @property({ type: String, tooltip: "App Store URL" })
    appStoreURL: string = "https://apps.apple.com/us/app/ride-master-car-builder-game/id6449224139"; 

    start() {
        this.node.on(Input.EventType.MOUSE_UP, this.onMouseClicked, this);
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    onMouseClicked(event: EventMouse) {
        let targetURL = "";
        if (sys.os === sys.OS.ANDROID) {
            targetURL = this.playMarketURL;
        } else if (sys.os === sys.OS.IOS) {
            targetURL = this.appStoreURL;
        } else if (sys.os == sys.OS.WINDOWS) {
            targetURL = this.playMarketURL;
        }

        if (targetURL) {
            if (sys.isNative) {
                sys.openURL(targetURL);
            } else {
                window.open(targetURL, '_blank');
            }
        }
    }

    private onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.node.setScale(new Vec3(1000, 1000, 1));

            let uiOpacity = this.node.getComponent(UIOpacity);
            uiOpacity.opacity = 0;
        }
    }

    onDestroy() {
        this.node.off(Input.EventType.MOUSE_UP, this.onMouseClicked, this);
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}

