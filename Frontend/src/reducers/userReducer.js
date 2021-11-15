import {GET_USER, LOGOUT} from '../actions/types'

export default function userReducer(state={}, action){
    switch(action.type){
        case GET_USER: 
        return {...state, token: action.token.token, user: action.username}
        case LOGOUT: 
        console.log('INUSERREDUCER')
        return {...state, token: null, user: null}
        default: 
            return state; 
    }
    

}