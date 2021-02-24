import axios from "axios";
import {GET_ERRORS, GET_TICKETS} from "./types";

export const addTicket = (ticket, history) => async dispatch => {
    await axios.post("https://front-test.beta.aviasales.ru/tickets?searchId=1bobp", ticket);
    history.push("/");
};

export const getBacklog = () => async dispatch => {
    const res = await axios.get("https://front-test.beta.aviasales.ru/tickets?searchId=3ppy2");
    dispatch({
        type: GET_TICKETS,
        payload: res.data
    })
}