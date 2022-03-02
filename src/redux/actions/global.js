import { GLOBAL_ACTION } from "../action-types";

const setGlobalData = (payload) => ({
  type: GLOBAL_ACTION.ADD_DATA,
  payload,
});

export const GlobalActions = {
  setGlobalData,
};
