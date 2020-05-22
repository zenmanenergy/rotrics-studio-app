import {TAP_LASER, TAP_P3D, TAP_CODE, TAP_SETTINGS} from "../constants/index.js";

const SET_TAP = "SET_TAP";

const INITIAL_STATE = {
    tap: TAP_LASER
};

export const actions = {
    setTap: (value) => {
        return {
            type: SET_TAP,
            value
        };
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_TAP:
            const {value} = action;
            return Object.assign({}, state, {tap: value});
        default:
            return state;
    }
}
