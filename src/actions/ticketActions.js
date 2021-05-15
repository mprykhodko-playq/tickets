import axios from "axios";
import {GET_ERRORS, GET_TICKETS} from "./types";

export const addTicket = (ticket, history) => async dispatch => {
    await axios.post("https://front-test.beta.aviasales.ru/tickets?searchId=1bobp", ticket);
    history.push("/");
};

const getKeys = async() => {
    try {
        return await axios.get("https://front-test.beta.aviasales.ru/search");
    } catch (e) {
        console.log(e);
    }
};

export const getBacklog = () => async dispatch => {
    try {
        const key = await getKeys();
        if (key.data.searchId) {
            const res = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${key.data.searchId}`);
            dispatch({
                type: GET_TICKETS,
                payload: res.data.tickets
            })
        } else console.error('searchId doesn\'t find');
    } catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
};