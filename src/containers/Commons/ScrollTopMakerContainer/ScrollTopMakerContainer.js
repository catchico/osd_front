import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopDesignListRequest } from "actions/Commons/TopList";
import ScrollListNew from "components/Commons/ScrollListNew";
import Maker from "components/Makers/Maker";
import Loading from "components/Commons/Loading";

class ScrollTopMakerContainer extends Component {
  componentWillMount() {
    this.props.GetTopDesignListRequest(0);
  }

  render() {
    return (
      this.props.status === "INIT" ? <Loading /> :
        <ScrollListNew
          // getListRequest={this.getList}
          ListComponent={Maker}
          type="maker"
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
          mobile={4} tablet={4} computer={4} largeScreen={4} widescreen={4} customClass="largeCustom" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.TopList.status.DesignList,
    dataListAdded: state.TopList.status.DesignListAdded,
    status: state.TopList.TopList.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTopDesignListRequest: (page) => {
      return dispatch(GetTopDesignListRequest(page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopMakerContainer);
