export const ADD_LINK = 'ADD_LINK'
export const ADD_ATTENDANT = 'ADD_ATTENDANT'
export const DELETE_ATTENDANTS = 'DELETE_ATTENDANTS'
export const SYNC_LOCAL_STORAGE = 'SYNC_LOCAL_STORAGE'
export const ADD_CLUB_NAME = ""

//Action Creators

//Local Storage
export function syncLocalStorage(state) {
    return {
        type: SYNC_LOCAL_STORAGE,
        payload: state
    }
}

//Link Reducers
export function addLink(link) {
    return {
        type: ADD_LINK,
        payload: link
    }
}

//Attendant Reducers
export function addAttendant(attendant) {
    return {
        type: ADD_ATTENDANT,
        payload: attendant
    }
}
export function deleteAttendants() {
    return {
        type: DELETE_ATTENDANTS
    }
}
export function addClubName(name) {
    return {
        type: ADD_CLUB_NAME,
        payload: name
    }
}
