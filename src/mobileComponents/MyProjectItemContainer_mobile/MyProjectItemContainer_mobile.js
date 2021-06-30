import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyProjectItemRequest } from "actions/Item";
import Item_myProject_mobile from "components/Items/Item_myProject_mobile";
import PagingList_mobile from "mobileComponents/PagingList_mobile";
import ScrollList from "components/Commons/ScrollList";
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
class MyProjectItemContainer_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0, per: 8,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, 0);
  }
  goPage = async (page) => {
    await this.setState({ page: page });
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, page);
  };
  getList = (page) =>
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, page);


  render() {
    const { page, per } = this.state;
    const lastPage = parseInt((this.props.allPage / per) + (this.props.allPage % per ? 1 : 0), 10); return (
      <Wrapper>
        <div className="header">참여 프로젝트</div>
        <PagingList_mobile getListRequest={this.getList}
          type="sales_Expert"
          ListComponent={Item_myProject_mobile}
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded}
          mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom" />
        {
          lastPage == 0 ? null :
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

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.MyProjectItem.status.MyProjectItem,
  dataListAdded: state.MyProjectItem.status.MyProjectItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyProjectItemRequest: (id, token, page) => dispatch(GetMyProjectItemRequest(id, token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProjectItemContainer_mobile);