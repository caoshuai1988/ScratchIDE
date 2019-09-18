/**CS 关于作品信息 */
const SET_ONLYPLAYER = 'SET_ONLYPLAYER';

const initialState = false

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ONLYPLAYER:
        return action.onlyPlayer;
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
