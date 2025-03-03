import { _decorator, Component, Node, Vec3, Quat, Quat as ccQuat, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RotationController')
export class RotationController extends Component {

    @property({ type: Node, tooltip: "Car RigidBody" })
    carBody: Node | null = null;

    @property({ tooltip: "Rotation Axis" })
    rotationAxis: Vec3 = new Vec3(0, 0, 1);

    private rotationSpeed: number;
    private linearVelocity: Vec3 = new Vec3();

    update(deltaTime: number) {
        const rigidBody = this.carBody.getComponent(RigidBody);
        rigidBody.getLinearVelocity(this.linearVelocity);
        const speed: number = this.linearVelocity.length();

        this.rotationSpeed = speed * 13;

        const rotationAngle: number = this.rotationSpeed * deltaTime;
        const deltaRotation = new Quat();
        Quat.fromAxisAngle(deltaRotation, this.rotationAxis, rotationAngle * Math.PI / 180);
        this.node.rotate(deltaRotation);
    }
}