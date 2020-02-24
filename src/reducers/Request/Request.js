import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  CreateRequest: { status: "INIT" },
  status: { Count: 0, success: null }
};

export const Request = (state, action) => {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case types.CREATE_REQUEST:
      return update(state, { CreateRequest: { status: { $set: types.CREATE_REQUEST } } });

    case types.CREATE_REQUEST_SUCCESS:
      return update(state, { CreateRequest: { status: { $set: types.CREATE_REQUEST_SUCCESS } }, status: { success: { $set: action.success } } });

    case types.CREATE_REQUEST_FAIL:
      return update(state, { CreateRequest: { status: { $set: types.CREATE_REQUEST_FAIL } }, status: { success: { $set: action.success } } });

    default:
      return state;
  }
};
