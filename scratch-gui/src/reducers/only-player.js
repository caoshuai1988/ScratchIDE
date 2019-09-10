/**CS 关于作品信息 */
const SET_ONLYPLAYER = 'ONLY_PLAYER';

const initialState = {
    onlyPlayer: false
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ONLYPLAYER:
        return Object.assign({}, state.onlyPlayer, action.onlyPlayer)
    default:
        return state;
    }
};


const setOnlyPlayer = onlyPlayer=> ({
    type: SET_ONLYPLAYER,
    onlyPlayer
})

export {
    reducer as default,
    initialState as playerInitialState,
    setOnlyPlayer
};
