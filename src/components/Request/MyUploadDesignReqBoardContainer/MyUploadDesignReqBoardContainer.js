import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetMyDesignerRequestListRequest } from "actions/Request";
import DesignerRequestBoard from "components/Request/DesignerRequestBoard";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'
import market_style from "market_style";

const Board = styled.div`
  margin:-20px 0px -20px 0px;
  .title__{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    margin-bottom:20px;
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
const ListElement = styled.div`
  width:100%;
  height:36px;
  border: 1px solid #eaeaea;
  margin-top:10px;
  padding:6px 54px 6px 54px;
  display:flex;
  margin-bottom:10px;
  .title{
    min-width:75%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.small1};
  }
  .writer{
    min-width:21%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.small1};
  }
  .date{
    min-width:5%;
    display:flex; 
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.small1};
    }
`;
class MyUploadDesignReqBoardContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentDidMount() {
    this.props.GetMyDesignerRequestListRequest(this.props.id, 0);
  }
  getList = page =>
    this.props.GetMyDesignerRequestListRequest(this.props.id, page);
  goPage = async (pagenum) => {
      await this.setState({ page:pagenum });
      this.props.GetMyDesignerRequestListRequest(this.props.id, pagenum);
  };
  render() {
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 10, 10);
    return (
      <Board>
      <div className="title__">디자인 의뢰</div>
      <ListElement>
            {/* no.    <div style={{ marginRight: "15px" }}>번호</div> */}
            {/* title   */}<div className="title">제목</div>
            {/* writer  */}<div className="writer">글쓴이</div>
            {/* date    */}<div className="date">작성일</div>
            {/* {/* view    <div style={{ marginRight: "15px" }}>조회수</div> */}
            {/* {/* like    <div style={{ marginRight: "15px" }}>좋아요</div> */}
        </ListElement>
      <DesignerRequestBoard getList={this.getList} {...this.props} />
        {
          lastPage==0?null:
          <div className="pagenation">
          <Pagination
            activePage={page + 1}
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={lastPage + 1}
            // pointing
            secondary
            onPageChange={(event, { activePage }) => {
              this.goPage(activePage - 1);
            }}
          />
          </div>
      }
      </Board>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  dataList: state.RequestList.status.List,
  Count: state.RequestList.status.Total
});
const mapDispatchToProps = (dispatch) => ({
  GetMyDesignerRequestListRequest: (id, page) => dispatch(GetMyDesignerRequestListRequest(id, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyUploadDesignReqBoardContainer);