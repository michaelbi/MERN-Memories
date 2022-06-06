import { SET_ID } from "../constants/actionTypes";

export const setCurrentId = (id) => {
  return { type: SET_ID, payload: id };
};
