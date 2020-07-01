import axios from 'axios';

export const SET_PROVINCE_LIST = 'SET_PROVINCE_LIST';
export const SET_DISTRICT_LIST = 'SET_DISTRICT_LIST';
export const SET_CONSTITUENCY_LIST = 'SET_CONSTITUENCY_LIST';
export const SET_VILLAGE_LIST = 'SET_VILLAGE_LIST';
export const SET_USER_LIST = 'SET_USER_LIST';


const baseURL = 'https://dev.farizdotid.com/api/daerahindonesia'
const randomUserURL = 'https://randomuser.me/api/'

export const fetchProvinceList = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/provinsi`)
            .then(({ data }) => {
                // console.log(data.provinsi)
                dispatch(setProvinceList(data.provinsi))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setProvinceList = (provinceList) => {
    return {
        type: SET_PROVINCE_LIST,
        payload: provinceList
    }
}

export const fetchConstituencyList = (province_id) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/kota?id_provinsi=${province_id}`)
            .then(({ data }) => {
                // console.log(data, 'kota')
                dispatch(setConstituencyList(data.kota_kabupaten))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setConstituencyList = (constituencyList) => {
    return {
        type: SET_CONSTITUENCY_LIST,
        payload: constituencyList
    }
}

export const fetchDistrictList = (constituent_id) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/kecamatan?id_kota=${constituent_id}`)
            .then(({ data }) => {
                // console.log(data, 'kecamatan')
                dispatch(setDistrictList(data.kecamatan))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setDistrictList = (districtList) => {
    return {
        type: SET_DISTRICT_LIST,
        payload: districtList
    }
}

export const fetchVillageList = (district_id) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/kelurahan?id_kecamatan=${district_id}`)
            .then(({ data }) => {
                // console.log(data, 'kelurahan')
                dispatch(setVillageList(data.kelurahan))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setVillageList = (villageList) => {
    return {
        type: SET_VILLAGE_LIST,
        payload: villageList
    }
}


export const fetchRandomUser = (page) => {
    return (dispatch) => {
        axios
            .get(`${randomUserURL}?page=${page}&results=15&seed=abc`)
            .then(({ data }) => {
                // console.log(data.results, 'random user')
                dispatch(setRandomUser(data.results))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setRandomUser = (randomUserList) => {
    return {
        type: SET_USER_LIST,
        payload: randomUserList
    }
}

