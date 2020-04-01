import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteGroupRequest,GetGroupDetailRequest, UpdateGroupRequest } from "redux/modules/group";
import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

class ModifyGroupInfoContainer extends Component {
  state = {
    isAuthor: false
  }
  componentDidMount() {
    console.log("권한:",this.props)
    this.props.GetGroupDetailRequest(this.props.id)
      .then(() => {
        if (this.props.userInfo.uid !== this.props.GroupDetail.user_id) {
          alert("그룹에 대한 수정권한이 없습니다. 이전페이지로 돌아갑니다.")
          this.props.history.go(-1)
        } else { this.setState({ isAuthor: true }) }
      })
  }

  render() {
    console.log("ModifyGroupInfo",this.props)
    return (
      <div>
        
         <ModifyGroupInfo {...this.props}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    GroupDetail: state.Group.status.GroupDetail,
    userInfo: state.Authentication.status.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetGroupDetailRequest: (id) => {
      return dispatch(GetGroupDetailRequest(id))
    },
    UpdateGroupRequest: (id, data, token) => {
      return dispatch(UpdateGroupRequest(id, data, token))
    },
    DeleteGroupRequest: (id, token) => {
      return dispatch(DeleteGroupRequest(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
