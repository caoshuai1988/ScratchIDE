/**CS 关于用户信息 */
const SAVE_USERINFO = 'SVAE_USERINFO';

const initialState = {
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SAVE_USERINFO:
        return Object.assign({}, state, action.userInfo
        )
    default:
        return state;
    }
};
const saveUserInfo = userInfo => ({
    type: SAVE_USERINFO,
    userInfo
});

export {
    reducer as default,
    initialState as userInfoInitialState,
    saveUserInfo
};
