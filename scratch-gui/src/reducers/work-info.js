/**CS 关于作品信息 */
const SAVE_WORKINFO = 'SVAE_WORKINFO';

const initialState = {
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SAVE_WORKINFO:
        return Object.assign({}, state, action.workInfo)
    default:
        return state;
    }
};

const saveWorkInfo = workInfo => ({
    type: SAVE_WORKINFO,
    workInfo
});

export {
    reducer as default,
    initialState as workInfoInitialState,
    saveWorkInfo,
};
