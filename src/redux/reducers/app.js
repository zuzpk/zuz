const initialState = {

    //Don't Edit
    VERSION: 2.1,
    debug: true,
    loaded: false,
    session: false,
    sessionTime: null,
    userExpired: false,
    user: null,
    loading: false,
    //Account
    verified: false,
    verifyMsg: null,
    
}

export default function (state = initialState, action){
    switch(action.type){
        case "APP_STATE":
            return { ...state, ...action.state }
        break;
        default:
            return state;
    }
}