/**CS 关于操作类型 */
const SET_WORKTYPE = 'SET_WORKTYPE';

const initialState = {
    workType: ''
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
    case SET_WORKTYPE:
        return Object.assign({}, state, {
            workType: action.workType
        })
    default:
        return state;
    }
};

const setWorkType = workType => ({
    type: SET_WORKTYPE,
    workType
})

export {
    reducer as default,
    initialState as workTypeInitialState,
    setWorkType,
};
