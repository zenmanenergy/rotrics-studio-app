import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import NumberInput from '../../../../components/NumberInput/Index.jsx';
import Line from '../../../../components/Line/Index.jsx'
import {actions as writeAndDrawActions} from "../../../../reducers/writeAndDraw";
import {connect} from 'react-redux';
import {ConfigText, ConfigTitle} from "../../../../components/Config";
import {withTranslation} from 'react-i18next';
import Tooltip from '../../../Tooltip/Index.jsx';

class WorkingParameters extends PureComponent {
    actions = {
        setPrintOrder: (value) => {
            this.props.updateWorkingParameters("print_order", value)
        },
        setJogSpeed: (value) => {
            this.props.updateWorkingParameters("jog_speed", value)
        },
        setWorkSpeed: (value) => {
            this.props.updateWorkingParameters("work_speed", value)
        },
        setJogPenOffset: (value) => {
            this.props.updateWorkingParameters("jog_pen_offset", value)
        }
    };

    render() {
        const {model, working_parameters, config} = this.props;
        const {t} = this.props;

        if (!model || !working_parameters || !config) {
            return null;
        }
        const actions = this.actions;
        const {work_speed, jog_speed, jog_pen_offset} = working_parameters.children;
        return (
            <div>
                <Line/>
                <div style={{
                    padding: "8px",
                }}>
                    <ConfigTitle text={t(working_parameters.label)}/>
                    <Tooltip title={t('Determines how fast the front end moves when it’s working.')}>
                        <Row
                        >
                            <Col span={19}>
                                <ConfigText text={`${t(work_speed.label)}(${work_speed.unit})`}/>
                            </Col>
                            <Col span={5}>
                                <NumberInput
                                    min={work_speed.minimum_value}
                                    max={work_speed.maximum_value}
                                    value={work_speed.default_value}
                                    onAfterChange={actions.setWorkSpeed}/>
                            </Col>
                        </Row>
                    </Tooltip>
                    <Tooltip title={t('Determines how fast the front end moves when it’s working.')}>
                        <Row>
                            <Col span={19}>
                                <ConfigText text={`${t(jog_speed.label)}(${jog_speed.unit})`}/>
                            </Col>
                            <Col span={5}>
                                <NumberInput
                                    min={jog_speed.minimum_value}
                                    max={jog_speed.maximum_value}
                                    value={jog_speed.default_value}
                                    onAfterChange={actions.setJogSpeed}/>
                            </Col>
                        </Row>
                    </Tooltip>
                    <Tooltip title={t('Determines the offset of the pen when it is not drawn.')}>
                        <Row>
                            <Col span={19}>
                                <ConfigText text={`${t(jog_pen_offset.label)}(${jog_pen_offset.unit})`}/>
                            </Col>
                            <Col span={5}>
                                <NumberInput
                                    min={jog_pen_offset.minimum_value}
                                    max={jog_pen_offset.maximum_value}
                                    value={jog_pen_offset.default_value}
                                    onAfterChange={actions.setJogPenOffset}/>
                            </Col>
                        </Row>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {model, working_parameters, config} = state.writeAndDraw;
    return {
        model,
        working_parameters,
        config
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateWorkingParameters: (key, value) => dispatch(writeAndDrawActions.updateWorkingParameters(key, value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WorkingParameters));

