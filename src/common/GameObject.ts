import {Component} from './Component';
import {World} from './World';
import {vec2, v2} from './vec2';

export class GameObject {
    name: string;
    tag: string = '';
    parent: GameObject;
    children: GameObject[] = [];
    world: World;
    position = v2();

    componentList: Component[] = [];

    constructor(name = '') {
        this.name = name;
    }

    createChild(name = '') {
        let go = new GameObject(name);
        go.world = this.world;
        go.parent = this;
        this.children.push(go);
        return go;
    }

    removeChild(o) {
        if (o == null) {
            return;
        }

        for (let i in this.children) {
            if (this.children[i] === o) {
                this.children[i].cleanup()
                this.children[i] = null;
            }
        }
    }

    removeAllChildren() {
        for (let i in this.children) {
            if (this.children[i] != null) {
                this.children[i].cleanup()
                this.children[i] = null;
            }
        }
    }

    cleanup() {
        for (let child of this.children) {
            child.cleanup();
        }

        this.parent = null;
        this.children = [];

        for (let component of this.componentList) {
            if (this.world != null) {
                component.onDisable();
            }
        }
    }

    removeFromParent() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    isChild(o, children = this.children): boolean {
        for (let child of children) {
            if (child === o) {
                return true;
            }
        }
        return false;
    }

    addComponent<T extends Component>(component: {new(): T}): T {
        let c = new component();
        c.gameObject = this;
        this.componentList.push(c);
        if (this.world != null) {
            c.onEnable();
        }
        return c;
    }

    getComponent<T extends Component>(component: {new(): T}): T {
        for (let c of this.componentList) {
            if (c instanceof component) {
                return c;
            }
        }
        return null;
    }

    removeComponent<T extends Component>(component: {new(): T}): T {
        for (let i = 0; i < this.componentList.length; ++i) {
            if (this.componentList[i] instanceof component) {
                let c = this.componentList[i];
                this.componentList.splice(i);
                if (this.world != null) {
                    c.onDisable();
                }
                return c as T;
            }
        }

        return null;
    }

    cleanChildren() {
        for (let child of this.children) {
            // 如果有 null child，则进行清理
            if (child == null) {
                let children = [];
                for (let child of this.children) {
                    if (child != null) {
                        children.push(child);
                    }
                }
                this.children = children;
                break;
            }
        }
    }

    update(dt) {
        this.cleanChildren();

        for (let component of this.componentList) {
            component.update(dt);
        }

        for (let child of this.children) {
            if (child != null) {
                child.update(dt);
            }
        }
    }
}
