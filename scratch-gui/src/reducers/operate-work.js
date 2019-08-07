const RESTORE_UPDATE = 'scratch-gui/operate-work/OPERATE_UPDATE';

const initialState = {
    operateItem: '',
    // operateUrl:
};

const reducer = (state= initialState, action) => {
    // if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case RESTORE_UPDATE:
        return Object.assign({}, state, action.state);
    default:
        return state;
    }
};

const setOperate = (state) => {
    return {
        type: RESTORE_UPDATE,
        state: {
            restoreFun: state.restoreFun,
            deletedItem: state.deletedItem
        }
    };
};

export {
    reducer as default,
    initialState as operateWorkInitialState,
    setOperate
};
