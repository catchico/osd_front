import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetMyDetailRequest, UpdateUserDetailRequest } from "redux/modules/personal"
import { GetCategoryAllRequest } from "redux/modules/category"
import { CheckNickNameRequest } from "redux/modules/auth"

import ModifyMyDetail from "components/Users/ModifyMyDetail"

class ModifyMyDetailContainer extends Component {
  componentDidMount() {
    this.props.GetCategoryAllRequest();
    this.props.GetMyDetailRequest(this.props.token);
  }
  render() {
    //console.log("MYDETAIL::::::", this.props);
    return (<ModifyMyDetail {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail,
    token: state.Authentication.status.token,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    CheckNickName: state.Authentication.checkStatus.checkNickName

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDetailRequest: (token) => {
      return dispatch(GetMyDetailRequest(token))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    },
    UpdateUserDetailRequest: (data, token) => {
      return dispatch(UpdateUserDetailRequest(data, token))
    },
    CheckNickNameRequest: (NickName) => {
      return dispatch(CheckNickNameRequest(NickName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMyDetailContainer)
