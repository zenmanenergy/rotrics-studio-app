import { combineReducers } from 'redux';
import hotKeys from "./hotKeys";
import laserText from "./laserText";
import serialPort from "./serialPort";
import vm from "./vm";

export default combineReducers({
    hotKeys,
    laserText,
    serialPort,
    vm
});
