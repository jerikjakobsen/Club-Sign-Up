import {ADD_LINK, ADD_ATTENDANT, DELETE_ATTENDANTS, SYNC_LOCAL_STORAGE, ADD_CLUB_NAME} from '../Actions/actions'
import { combineReducers } from 'redux'

export function linkReducer (state='', action) {
    switch(action.type) {
        case SYNC_LOCAL_STORAGE:
            return action.payload.link
        case ADD_LINK:
            return action.payload
        default:
            return state
    }
}

export function attendantReducer (state=[], action) {
    switch (action.type) {
        case SYNC_LOCAL_STORAGE:
            return action.payload.attendants
        case ADD_ATTENDANT:
            const newList = state;
            newList.push(action.payload)
            return newList
        case DELETE_ATTENDANTS:
            return []
        default:
            return state
    }
}

export function clubNameReducer (state="", action) {
    switch (action.type) {
        case ADD_CLUB_NAME:
            return action.payload
        case SYNC_LOCAL_STORAGE:
            if (action.payload.clubName === undefined) {
                return ""
            } else return action.payload.clubName
        default:
            return state
    }
}

const allReducers = combineReducers({
    attendants: attendantReducer,
    link: linkReducer,
    clubName: clubNameReducer
})


export default allReducers