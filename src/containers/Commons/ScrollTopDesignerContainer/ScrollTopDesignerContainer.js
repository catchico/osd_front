import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopExpertListRequest } from "actions/Commons/TopList";
import ScrollList from "components/Commons/ScrollListHorizontal";
import Expert_small from "components/Experts/Expert_small";
import Loading from "components/Commons/Loading";

class ScrollTopExpertContainer extends Component {
  async componentWillMount() {
    await this.props.GetTopExpertListRequest();
  }

  render() {
    // console.log(this.props.dataList);
    return (
      this.props.status === "INIT"
        ? <Loading />
        : <ScrollList ListComponent={Expert_small} dataList={this.props.dataList.concat(this.props.dataList)} />
    );
  }
}

const mapStateToProps = (state) => ({
  dataList: state.TopList.status.ExpertList,
  status: state.TopList.ExpertList.status,
});

const mapDispatchToProps = (dispatch) => ({
  GetTopExpertListRequest: () => dispatch(GetTopExpertListRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopExpertContainer);
