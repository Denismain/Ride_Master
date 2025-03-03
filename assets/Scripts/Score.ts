import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {

    @property({ type: Label })
    public scoreLabel: Label | null = null;

    private currentScore: number = 0;

    start() {
        this.updateScoreLabel(); 
    }

    addScore(amount: number) {
        this.currentScore += amount;
        this.updateScoreLabel();
    }

    updateScoreLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = this.currentScore.toString();
        }
    }
}

