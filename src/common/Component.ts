import {GameObject} from './GameObject';

export class Component {
    gameObject: GameObject;

    // # 从属的 GameObject 添加到 World 上时调用
    onEnable() { }

    // # 从属的 GameObject 从 World 移除时调用
    onDisable() { }

    isEnable() {
        return this.gameObject != null && this.gameObject.parent != null;
    }

    update(dt) { }

    on(event: string, target, handler?) {
        this.gameObject.world.on(event, target, handler);
    }

    off(event: string, target, handler?) {
        this.gameObject.world.off(event, target, handler);
    }

    one(event: string, handler) {
        this.gameObject.world.one(event, handler);
    }

    trigger(event: string, ...params) {
        this.gameObject.world.trigger(event, ...params);
    }
}

// Components，用于保存Component的子类，方便外部测试使用
// 在内部，直接使用子类定义
// 例（外部）：gameObject.addComponent Components.TestComponent
// 例（内部）：gameObject.addComponent(TestComponent)
interface ComponentClass {
    new(): Component;
}

export var Components: {[id: string]: ComponentClass} = {};
