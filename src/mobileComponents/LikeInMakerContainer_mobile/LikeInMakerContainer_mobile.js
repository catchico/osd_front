import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetLikeInMakerRequest } from "actions/Maker";
import PagingList_mobile from "mobileComponents/PagingList_mobile";
import Expert_mobile_big from "components/Experts/Expert_mobile_big";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import market_style from "market_style";

const Wrapper = styled.div`
  max-width:375px;
  width:100%;
  padding:0px 0px 10px 10px;
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:#c1c1c1;
    text-align:center;
    margin-bottom:10px;
    margin-top:1px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
const Board = styled.div`
  margin:-20px -50px -20px -50px;
  display:flex;
  flex-direction:column;
  .title_{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .lineBox{
    width:100%;
    padding:6px 38px 10px 38px;
    .line{
      width:100%;
      border:1px solid #efefef;
    }
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
class LikeInMakerContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 8,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetLikeInMakerRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetLikeInMakerRequest(this.props.id, page);
  }
  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.props.GetLikeInMakerRequest(this.props.id, pagenum);
  };
  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10);
    return (
      <Wrapper>
        <div className="header">관심 메이커</div>

        <PagingList_mobile getListRequest={this.getList}
          type="sales_Expert"
          ListComponent={Expert_mobile_big}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
          mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom" />
        {
          lastPage <= 1 ? null :
            <div className="pagenation">
              <Pagination
                activePage={page + 1}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={lastPage}
                // pointing
                secondary
                onPageChange={(event, { activePage }) => {
                  this.goPage(activePage - 1);
                }}
              />
            </div>
        }
      </Wrapper>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MakerDetail.status.LikeInMaker,
    dataListAdded: state.MakerDetail.status.LikeInMakerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetLikeInMakerRequest: (id, page) => {
      return dispatch(GetLikeInMakerRequest(id, page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeInMakerContainer_mobile);