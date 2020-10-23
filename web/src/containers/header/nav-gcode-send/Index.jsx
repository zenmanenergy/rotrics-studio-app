import React from 'react';
import styles from './styles.css';
import {Space, Progress} from 'antd';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {actions as gcodeSendActions} from "../../../reducers/gcodeSend";
import {TAB_WRITE_AND_DRAW, TAP_LASER, TAP_P3D} from "../../../constants";
import getGcode4runBoundary from "../../../utils/getGcode4runBoundary";

class Index extends React.Component {
    getPropsByTap = (tap) => {
        let rendererParent = null;
        let gcode = null;
        switch (tap) {
            case TAP_LASER:
                rendererParent = this.props.rendererParent4laser;
                gcode = this.props.gcode4laser;
                break;
            case TAB_WRITE_AND_DRAW:
                rendererParent = this.props.rendererParent4writeAndDraw;
                gcode = this.props.gcode4writeAndDraw;
                break;
        }
        return {gcode, rendererParent};
    };

    actions = {
        startOrPauseTask: () => {
            const {tap, curStatus, startTask, pauseTask, resumeTask} = this.props;
            const {gcode} = this.getPropsByTap(tap);
            switch (curStatus) {
                case "idle":
                    startTask(gcode, tap);
                    break;
                case "started":
                    pauseTask();
                    break;
                case "paused":
                    resumeTask();
                    break;
            }
        },
        stopTask: () => {
            this.props.stopTask();
        },
        runBoundary: () => {
            const {rendererParent} = this.getPropsByTap(this.props.tap);
            this.props.send(getGcode4runBoundary(rendererParent.children));
        }
    };

    render() {
        const actions = this.actions;
        const {tap, path, curStatus, total, sent, task} = this.props;
        const {gcode} = this.getPropsByTap(tap);
        const startOrPauseDisabled = (!path || !gcode || !["idle", "started", "paused"].includes(curStatus));
        const stopDisabled = (!path || !["started", "paused"].includes(curStatus));
        const runBoundaryDisabled = (!path || !gcode || !["idle"].includes(curStatus) || tap === TAP_P3D);
        let percent = 100;
        if (task && total > 0) {
            percent = Math.floor(sent / total * 100);
        }
        return (
            <Space size={0}>
                <button className={curStatus === "started" ? styles.btn_pause : styles.btn_play}
                        onClick={actions.startOrPauseTask} disabled={startOrPauseDisabled}/>
                <button className={styles.btn_stop} onClick={actions.stopTask} disabled={stopDisabled}/>
                <button className={styles.btn_run_boundary} onClick={actions.runBoundary}
                        disabled={runBoundaryDisabled}/>
                <Progress style={{marginRight: "5px"}} type="circle" percent={percent} width={25}/>
            </Space>
        )
    }
}

const mapStateToProps = (state) => {
    const {tap} = state.taps;
    const {path} = state.serialPort;
    const {curStatus, total, sent, task} = state.gcodeSend;
    const {rendererParent: rendererParent4writeAndDraw, gcode: gcode4writeAndDraw} = state.writeAndDraw;
    const {rendererParent: rendererParent4laser, gcode: gcode4laser} = state.laser;
    // const { gcodeUrl: gcode4p3d} = state.p3dModel;
    return {
        tap,
        path,
        curStatus,
        total,
        sent,
        task,
        gcode4writeAndDraw,
        gcode4laser,
        rendererParent4writeAndDraw,
        rendererParent4laser
        // gcode4p3d,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        send: (gcode) => dispatch(gcodeSendActions.send(gcode)),
        startTask: (gcode, tap) => dispatch(gcodeSendActions.startTask(gcode, tap)),
        stopTask: () => dispatch(gcodeSendActions.stopTask()),
        pauseTask: () => dispatch(gcodeSendActions.pauseTask()),
        resumeTask: () => dispatch(gcodeSendActions.resumeTask()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Index));

