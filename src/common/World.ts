import {RNG} from "./RNG";
import {GameObject} from './GameObject';
import {Components} from './Component';
import {EventDispatcher} from './EventDispatcher';

// ###
// 管理所有的 GameObject
// 提供公共方法
// ###
export class World {
    eventDispatcher: EventDispatcher;
    root: GameObject;
    rng: RNG;

    constructor(seed = 0) {
        this.root = new GameObject();
        this.root.world = this;
        this.eventDispatcher = new EventDispatcher();
        this.rng = new RNG(seed);
    }

    createGameObject(name = '') {
        return this.root.createChild(name);
    }

    update(dt = 0) {
        this.root.update(dt);
    }

    nextInt() {
        return this.rng.nextInt();
    }

    nextIndex(length) {
        return this.rng.nextRange(0, length);
    }

    nextRange(start: number, end: number) {
        return this.rng.nextRange(start, end);
    }

    choice(array) {
        return this.rng.choice(array);
    }

    on(event: string, target, handler?) {
        this.eventDispatcher.on(event, target, handler);
    }

    off(event: string, target, handler?) {
        this.eventDispatcher.off(event, target, handler);
    }

    one(event: string, handler) {
        this.eventDispatcher.one(event, handler);
    }

    trigger(event: string, ...params) {
        this.eventDispatcher.trigger(event, ...params);
    }

    /*
     * 这个方法可以快速注册多个事件处理函数
     * 一般用在单元测试用例里面
     */
    onEventMap(eventMap) {
        for (let event in eventMap) {
            this.on(event, eventMap);
        }
    }
}
