// ###
// class EventDispatcher
// 事件处理类
// ###
export class EventDispatcher {
    _oneEventInvokerMap = {};
    _eventInvokerMap = {};

    // # 注册事件
    // # event: 事件名称
    // # target: 绑定回调函数中的 this 为 target
    // # handler: 回调函数, 当handler为空时，默认 handler = target[event]
    on(event: string, target, handler = target[event]) {
        if (this._eventInvokerMap[event] == null) {
            this._eventInvokerMap[event] = [];
        }

        if (target != null) {
            this._eventInvokerMap[event].push({ target: target, handler: handler });
        }
    }

    // # 注销事件
    off(event: string, target, handler = target[event]) {
        if (this._eventInvokerMap[event] != null) {
            let newEventMap = [];
            for (let invoker of this._eventInvokerMap[event]) {
                if (target !== invoker.target || handler !== invoker.handler) {
                    newEventMap.push(invoker);
                }
            }
            this._eventInvokerMap[event] = newEventMap;
        }
    }

    // # 注册运行一次的事件
    one(event: string, handler) {
        if (this._oneEventInvokerMap[event] == null) {
            this._oneEventInvokerMap[event] = [];
        }

        this._oneEventInvokerMap[event].push(handler);
    }

    // # 触发事件
    trigger(event: string, ...params) {
        // # trigger on event
        if (this._eventInvokerMap[event] != null) {
            for (let invoker of this._eventInvokerMap[event]) {
                invoker.handler.call(invoker.target, ...params);
            }
        }

        // # trigger one event
        if (this._oneEventInvokerMap[event] != null) {
            for (let invoker of this._oneEventInvokerMap[event]) {
                invoker(...params);
            }

            this._oneEventInvokerMap[event] = []
        }
    }
}
