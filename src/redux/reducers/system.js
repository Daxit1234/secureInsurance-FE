// ** Initial State
const initialState = {
    systemData: [],
    loading:false
}

const systemReducer = (state = initialState, action) => {
    switch (action?.type) {
        case "SET_SYSTEM_DATA":
            return { ...state, systemData: action?.payload }
        case "SET_LOADER":
            return { ...state, loading: action?.payload }
        default:
            return state
    }
}

export default systemReducer
