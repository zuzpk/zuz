const initialState = {
    forms: {}
}

export default function (state = initialState, action){
    switch(action.type){
        case "FORM_STATE":
            return { ...state, ...action.state }
        break;
        default:
            return state;
    }
}