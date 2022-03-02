import { GLOBAL_ACTION } from "../action-types";
const globalData = [
  {
    checked: false,
    name: "mdadsad",
    company: "same",
    status: "active",
    lastUpdated: "2020-01-01",
    Notes: "some description",
    delete: false,
  },
  {
    checked: false,
    name: "madsasdda",
    company: "samse",
    status: "inactive",
    lastUpdated: "2020-01-01",
    Notes: "some description",
    delete: false,
  },
  {
    checked: false,
    name: "mda",
    company: "saame",
    status: "active",
    lastUpdated: "2020-01-01",
    Notes: "some description",
    delete: false,
  },
];

export const GlobalDataReducer = (state = globalData, action) => {
  switch (action.type) {
    case GLOBAL_ACTION.ADD_DATA:
      return [...action.payload];
    default:
      return [...state];
  }
};
