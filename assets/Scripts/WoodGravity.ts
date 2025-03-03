import { _decorator, Component, Node, ICollisionEvent, RigidBody, Collider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WoodGravity')
export class WoodGravity extends Component {

    @property({ type: Node })
    targetNode: Node | null = null;
    private rigidBody: RigidBody | null = null;
    private delay: number = 0.2;

    start() {
        this.rigidBody = this.getComponent(RigidBody);
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
        }
    }

    onCollisionEnter(event: ICollisionEvent) {
        if (event.otherCollider.node === this.targetNode) {
            this.scheduleOnce(() => {
                this.rigidBody.linearDamping = 0.1;
                this.rigidBody.useGravity = true;
            }, this.delay);
        }
    }

    onDestroy() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.off('onCollisionEnter', this.onCollisionEnter, this);
        }
    }
}

