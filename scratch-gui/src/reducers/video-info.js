/**CS 关于视频的信息 */
const SET_STEPID = 'SET_STEPID';
const SET_PRODUCTION_ID = "SETPRODUCTION_ID";

const initialState = {
    stepId: '',
    productionId: ''
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
    case SET_STEPID:
        return Object.assign({}, state, {
            stepId: action.stepId
        })
    case SET_PRODUCTION_ID:
        return Object.assign({}, state, {
            productionId: action.productionId
        })
    default:
        return state;
    }
};

const setStepId = stepId => ({
    type: SET_STEPID,
    stepId
})

const setProductionId = productionId=> ({
    type: SET_PRODUCTION_ID,
    productionId
})

export {
    reducer as default,
    initialState as videoInfoInitialState,
    setStepId,
    setProductionId
};
