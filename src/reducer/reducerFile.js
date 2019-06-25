export default function (state = null, action) {
    switch (action.type) {
        case "FETCHING_DATA_FROM_JSON":
            return { ...state, dataFromJSON: action.response }
        case "DISPLAYING_DATA":
            return { ...state, activeFolderData: action.response }
        default: return state;
    }
}
