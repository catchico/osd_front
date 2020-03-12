import * as types from "actions/ActionTypes";
import host from "config";

// 멤버 검색
export function SearchMemberRequest(id, data, token) {
  return (dispatch) => {
    dispatch(SearchMember());
    const url =  `${host}/search/members/${id}`;
    console.log("get:", url, data);
    return fetch(url,
      {
        headers: { "Content-Type": "application/json", "x-access-token": token },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        return dispatch(SearchMemberSuccess(res.members));
      }).catch((error) => {
        return dispatch(SearchMemberFailure());
      });
  };
};

export function SearchMember() {
  return {
    type: types.GET_SEARCH_MEMVER
  };
};

export function SearchMemberSuccess(members) {
  return {
    type: types.GET_SEARCH_MEMBER_SUCCESS,
    members
  };
};

export function SearchMemberFailure() {
  return {
    type: types.GET_SEARCH_MEMBER_FAILURE
  };
};
