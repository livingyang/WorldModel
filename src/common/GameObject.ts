import {Component} from './Component';
import {World} from './World';
import {vec2, v2} from './vec2';

export class GameObject {
    name: string;
    tag: string = '';
    parent: GameObject;
    children: GameObject[] = [];
    componentMap = {};
    world: World;
    position = v2();

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

        for (let className in this.componentMap) {
            if (this.world != null) {
                let component = this.componentMap[className];
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

    addComponent(className) {
        if (this.getComponent(className) != null) {
            throw "GameObject#addComponent duplicate class#{className}"
        }
        let componentClass = Component.List[className];
        if (componentClass != null) {
            let c = this.componentMap[className] = new componentClass();
            c.gameObject = this;
            if (this.world != null) {
                c.onEnable()
            }
            return c;
        }
        else
            return null;
    }

    getComponent(className) {
        return this.componentMap[className] || null;
    }

    removeComponent(className) {
        if (this.world != null) {
            this.componentMap[className].onExit();
        }
        delete this.componentMap[className];
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

        for (let className in this.componentMap) {
            let component = this.componentMap[className];
            component.update(dt);
        }
        
        for (let child of this.children) {
            if (child != null) {
                child.update(dt);
            }
        }
    }
}
