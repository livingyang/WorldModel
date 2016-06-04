import GameObject = require('./GameObject');

class Component {
    gameObject: GameObject;

    // # 用于保存Component的子类
    static List = {};
    //
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

    static addClass(className, classDef) {
        this.List[className] = classDef;
    }

    static removeClass(className) {
        delete this.List[className];
    }

    static getClass(className) {
        return this.List[className];
    }
}

export = Component;
