import { __private, _decorator, Camera, Component, director, EventTouch, input, Input, instantiate, Node, Prefab, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@_decorator.ccclass('AttackController')
export class AttackController extends Component {

    @property
    bulletSpeed: number = 30;

    @property(Prefab)
    bulletPrefab: Prefab = null;

    @property(Node)
    bulletParent: Node = null;

        bulletList: Node[] = [];

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        // 获取主相机节点
        const mainCameraNode = director.getScene().getChildByName('Main Camera');
        if (!mainCameraNode) return;

        // 获取相机组件
        const camera = mainCameraNode.getComponent(Camera);
        if (!camera) return;

        // 获取点击坐标并转换为世界坐标
        const touchPos = event.getLocation();
        const worldPos = camera.screenToWorld(new Vec3(touchPos.x, touchPos.y, 0));

        // 创建子弹
        const bullet = instantiate(this.bulletPrefab);
        bullet.setParent(this.bulletParent);
        bullet.setWorldPosition(mainCameraNode.worldPosition);

        // 设置子弹速度
        const rigidBody = bullet.getComponent(RigidBody);
        if (!rigidBody) return;

        const direction = new Vec3();
        Vec3.subtract(direction, worldPos, mainCameraNode.worldPosition);
        direction.normalize();
        rigidBody.setLinearVelocity(direction.multiplyScalar(this.bulletSpeed));

                // 添加到子弹队列
        this.bulletList.push(bullet);

        // 若子弹数量超过15，销毁最早创建的子弹
        if (this.bulletList.length > 15) {
            const oldestBullet = this.bulletList.shift();
            if (oldestBullet) {
                oldestBullet.destroy();
            }
        }
    }

    update(deltaTime: number) {}
}