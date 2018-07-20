import {
    COMMIT_SET_COMPONENTS,
    COMMIT_UPDATE_PROFILE,
} from './actionsTypes'

const defaultState = {
    components: {},
    apiKey: null,
}

const user = (state = defaultState, action) => {
    switch (action.type) {
        case COMMIT_SET_COMPONENTS:
            return {
                ...state,
                ...{components: action.components}
            }
        case COMMIT_UPDATE_PROFILE:
            return {
                ...state,
                ...{apiKey: action.apiKey}
            }
        default:
            return state
    }
}

export default user