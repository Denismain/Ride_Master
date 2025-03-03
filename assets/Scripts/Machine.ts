import { _decorator, Component, Sprite, RigidBody, Vec3, clamp, randomRange } from 'cc';
import { GameManager } from './GameManager/GameManager';
import { GameState } from './GameState/GameState';
const { ccclass, property } = _decorator;

@ccclass('Machine')
export class Machine extends Component {

    @property({ type: RigidBody, tooltip: "Rigidbody" })
    public targetRigidbody: RigidBody = null;

    @property({ type: Sprite, tooltip: "Draggable Sprite" })
    public dragSprite: Sprite = null;

    @property({ tooltip: "Max Speed" })
    public maxSpeed: number | null = 22;

    private maxY: number = 110;
    private minY: number = -110;

    start() {
        GameManager.Instance.node.on('game-state-changed', this.onGameStateChanged, this);
    }

    update(deltaTime: number) {
        let leverY = this.dragSprite.node.position.y; 

        leverY = clamp(leverY, this.minY, this.maxY);

        const normalizedPosition = (leverY - this.minY) / (this.maxY - this.minY);

        const desiredSpeedX = normalizedPosition * this.maxSpeed;

        let velocity = new Vec3(); 
        this.targetRigidbody.getLinearVelocity(velocity); 
        velocity.x = desiredSpeedX; // Только ось X
        this.targetRigidbody.setLinearVelocity(velocity);
    }

    onGameStateChanged(newState: GameState) {
        if (newState === GameState.GAME_OVER) {
            this.activateRigidbodies();
        }
    }

    scatterChildren() {
        const rigidBodies = this.targetRigidbody.getComponentsInChildren(RigidBody);

        rigidBodies.forEach(rigidBody => {
            const randomImpulse = new Vec3(randomRange(-10, 10), randomRange(-10, 10), randomRange(-10, 10));

            rigidBody.applyImpulse(randomImpulse);
        });
    }


    activateRigidbodies() {

        const rigidbodies = this.targetRigidbody.getComponentsInChildren(RigidBody);

        rigidbodies.forEach(rigidbody => {
            rigidbody.enabled = true;
        });

        this.scatterChildren(); 
    }

    onDestroy() {
        GameManager.Instance.node.off('game-state-changed', this.onGameStateChanged, this);
    }
}