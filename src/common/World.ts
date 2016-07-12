import {GameObject} from './GameObject';
import {Component} from './Component';
import {EventDispatcher} from './EventDispatcher';

// ###
// 管理所有的 GameObject
// 提供公共方法
// ###
export class World {
    eventDispatcher: EventDispatcher;
    root: GameObject;

    constructor() {
        this.root = new GameObject();
        this.root.world = this;
        this.eventDispatcher = new EventDispatcher();
    }

    createGameObject(name = '') {
        return this.root.createChild(name);
    };

    createGameObjectWithComponent(componentName: string) {
        let go = this.createGameObject(componentName);
        return go.addComponent(Component.getClass(componentName));
    };

    update(dt = 0) {
        this.root.update(dt);
    };

    on(event: string, target, handler?) {
        this.eventDispatcher.on(event, target, handler);
    };

    off(event: string, target, handler?) {
        this.eventDispatcher.off(event, target, handler);
    };

    one(event: string, handler) {
        this.eventDispatcher.one(event, handler);
    };

    trigger(event: string, ...params) {
        this.eventDispatcher.trigger(event, ...params);
    };

    /*
     * 这个方法可以快速注册多个事件处理函数
     * 一般用在单元测试用例里面
     */
    onEventMap(eventMap) {
        for (let event in eventMap) {
            this.on(event, eventMap);
        }
    };
}
