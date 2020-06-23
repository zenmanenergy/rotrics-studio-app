import React, {PureComponent} from 'react';
import {InputNumber} from 'antd';

class Index extends PureComponent {
    state = {
        displayedValue: 0
    };

    componentDidMount() {
        this.setState({displayedValue: this.props.value});
    }

    actions = {
        onKeyUp: (e) => {
            // 按下[回车]
            if (e.keyCode === 13) {
                e.target.blur();
            }
        },
        onBlur: (e) => {
            const min = parseFloat(e.target.min);
            const max = parseFloat(e.target.max);
            let value = parseFloat(this.state.displayedValue);
            if (isNaN(value)) {
                value = this.props.value;
            }
            if (value > max) {
                value = max;
            } else if (value < min) {
                value = min;
            }
            this.setState({displayedValue: value});
            this.props.onAfterChange(value);
        },
        onChange: (value) => {
            this.setState({displayedValue: value});
        }
    };

    render() {
        const state = this.state;
        // required props: onAfterChange, value
        // https://ant.design/components/input-number-cn/
        const {max = 999999, min = -99999, precision = 0, ...rest} = this.props;
        const actions = this.actions;
        return (
            <InputNumber
                {...rest}
                min={min}
                max={max}
                value={state.displayedValue}
                precision={precision}
                size="small"
                onBlur={actions.onBlur}
                onKeyUp={actions.onKeyUp}
                onChange={actions.onChange}
            />
        );
    }
}

export default Index;
