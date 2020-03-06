import React, { Component } from "react";
import { connect } from "react-redux";
import GridEditor from "components/GridEditor";
import { GetItemStepsRequest } from "actions/Item";

// CreateDesignBoardRequest, DeleteDesignBoardRequest,
// GetDesignDetailRequest, GetCardDetailRequest, GetDesignCardRequest, GetDesignBoardRequest,
// UpdateCardTitleRequest, UpdateDesignBoardRequest, UpdateDesignTime

class ItemStepContainer extends Component {
  componentDidMount() {
    this.props.GetItemStepsRequest(this.props.id, this.props.token);
  }
  render() {
    return (
      <GridEditor {...this.props} item={{ uid: this.props.id }} />
    );
  }
}

const mapStateToProps = (state) => ({
  ItemStep: state.ItemStep.status.ItemStep,
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  GetItemStepsRequest: (id, token) => dispatch(GetItemStepsRequest(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemStepContainer);