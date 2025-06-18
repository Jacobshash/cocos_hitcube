import { _decorator, Component, Node } from 'cc';
import { AttackController } from './AttackController';

@_decorator.ccclass('Bullet')
export class Bullet extends Component {
    // 可选：添加子弹自动销毁逻辑
    private lifeTime: number = 3; // 子弹存活时间（秒）

    start() {
        // 可选：启动定时销毁
        this.scheduleOnce(() => {
            this.node.destroy();
        }, this.lifeTime);
    }

    onDestroy() {
        // 从子弹队列中移除自身
        const attackController = this.node.parent?.getComponent(AttackController);
        if (attackController) {
            const index = attackController.bulletList.indexOf(this.node);
            if (index !== -1) {
                attackController.bulletList.splice(index, 1);
            }
        }
    }

    update(deltaTime: number) {}
}