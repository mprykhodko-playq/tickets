import {GET_TICKETS} from "../actions/types";

const initialState = {
    tickets: []
    // stop: {}
};

export default function (state=initialState, action) {
    switch (action.type) {

        case GET_TICKETS:
            return {
                ...state,
                tickets: action.payload
            };

        default:
            return state;
    }
}