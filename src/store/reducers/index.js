import { 
    SET_PROVINCE_LIST,
    SET_CONSTITUENCY_LIST,
    SET_DISTRICT_LIST,
    SET_VILLAGE_LIST,
    SET_USER_LIST,
} from "../actions";

const initialState = {
    provinceList: [],
    constituencyList: [],
    districtList: [],
    villageList: [],
    randomUsers: []
}

export const reducers = (state = initialState, action) => {
    const { type, payload } = action
    switch ( type ) {
        case SET_PROVINCE_LIST:
            return {
                ...state,
                provinceList: payload
            }
        case SET_CONSTITUENCY_LIST:
            return {
                ...state,
                constituencyList: payload
            }
        case SET_DISTRICT_LIST:
            return {
                ...state,
                districtList: payload
            }
        case SET_VILLAGE_LIST:
            return {
                ...state,
                villageList: payload
            }
        case SET_USER_LIST:
            return {
                ...state,
                randomUsers: payload
            }
        default:
            return state;
    }
}