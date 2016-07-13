// ###
// class EventDispatcher
// 事件处理类
// ###

interface Invoker {
    target;
    handler: Function;
}

export class EventDispatcher {
    _eventInvokerMap: {[id: string]: Invoker[]} = {};
    _oneEventInvokerMap: {[id: string]: Function[]} = {};

    getInvokerList(event: string) {
        return this._eventInvokerMap[event] || [];
    }

    getOneInvokerList(event: string) {
        return this._oneEventInvokerMap[event] || [];
    }

    // # 注册事件
    // # event: 事件名称
    // # target: 绑定回调函数中的 this 为 target
    // # handler: 回调函数, 当handler为空时，默认 handler = target[event]
    on(event: string, target, handler: Function = target[event]) {
        if (this._eventInvokerMap[event] == null) {
            this._eventInvokerMap[event] = [];
        }

        if (target != null) {
            this._eventInvokerMap[event].push({ target: target, handler: handler });
        }
    }

    // # 注销事件
    off(event: string, target, handler: Function = target[event]) {
        if (this._eventInvokerMap[event] != null) {
            this._eventInvokerMap[event] = this._eventInvokerMap[event].filter((v, i, a) => {
                return (target !== v.target || handler !== v.handler);
            });
        }
    }

    // # 注册运行一次的事件
    one(event: string, handler: Function) {
        if (handler == null) {
            return;
        }

        if (this._oneEventInvokerMap[event] == null) {
            this._oneEventInvokerMap[event] = [];
        }

        this._oneEventInvokerMap[event].push(handler);
    }

    // # 触发事件
    trigger(event: string, ...params) {
        // # trigger on event
        for (let invoker of this.getInvokerList(event)) {
            invoker.handler.call(invoker.target, ...params);
        }

        // # trigger one event
        for (let invoker of this.getOneInvokerList(event)) {
            invoker(...params);
        }
        this._oneEventInvokerMap[event] = [];
    }
}
