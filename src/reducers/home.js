import {UPDATE_DATA,UPDATE_PAGELOADING,CHANGE_DATA} from '../actions/home'

const initState = {
    data:[],
    pageLoading: true
}

export const home = (state = initState, action)=> {

    switch (action.type) {
        case UPDATE_DATA:
            return {
                ...state,
                data: action.data
            };
        case UPDATE_PAGELOADING:
            return {
                ...state,
                pageLoading: action.bol
            };
        case CHANGE_DATA:
            if(Object.keys(action.data).length > 0){
                state.data[action.data.index].flight_number = action.data.num
            }
            return state;
        default:
            return {
                ...state
            }
    }
};