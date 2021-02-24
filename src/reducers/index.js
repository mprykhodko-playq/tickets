import {combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import ticketReducer from "./ticketReducer";

export default combineReducers({
    //
    errors: errorsReducer,
    ticket: ticketReducer
})