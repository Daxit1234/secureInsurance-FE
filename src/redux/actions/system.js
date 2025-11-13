import axios from 'axios'

export const getSystemSetupData = async (dispatch) => {
    dispatch({ type: "SET_LOADER", payload: true })
    await axios.get(
        `${import.meta.env.VITE_API_URL
        }/system/list?section=${""}&page=1&limit=100000`
    ).then((res) => {
        if (res?.data.data.length > 0) {
            dispatch({ type: "SET_SYSTEM_DATA", payload: res.data.data })
        }
    }).catch((err) => {
        console.log(err, 'err')
    }).finally(() => {
        dispatch({ type: "SET_LOADER", payload: false })
    })
}