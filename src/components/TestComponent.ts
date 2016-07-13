import {Component, Components} from '../common/Component';

export class TestComponent extends Component {

    // # 从属的 GameObject 添加到 World 上时调用
    onEnable() {
        this.trigger('OnTestComponentEnable', this);
    }

    // # 从属的 GameObject 从 World 移除时调用
    onDisable() {
        this.trigger('OnTestComponentDisable', this);
    }
}

Components['TestComponent'] = TestComponent;
