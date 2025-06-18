import { __private, _decorator, Component, EventTouch, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainCameraController')
export class MainCameraController extends Component {
    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchStart(ev: EventTouch) {
        console.log("touch start" + ev.getLocation())
    }

    onTouchEnd(ev: EventTouch) {
        console.log("touch start" + ev.getLocation())
    }

    // 添加可配置的边界属性
    @property
    minX: number = -100;  // 左侧边界
    
    @property
    maxX: number = 100;   // 右侧边界

    onTouchMove(ev: EventTouch) {
        const pos = this.node.position;
        const scale = 0.05;
        
        // 计算新X坐标并应用边界限制
        const clampedX = pos.x + ev.getDeltaX() * scale;
        const clampedY = pos.y + ev.getDeltaY() * scale;
        
        this.node.setPosition(clampedX, pos.y, pos.z);
    }

    update(deltaTime: number) {

    }
}


