import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import market_style from "market_style";
// CSS STYLING
const ScrollContainer = styled.div`
*{
  // border:1px solid black;
}
`;
const ListContainer = styled.div`
  padding:0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item {
    flex: 0 0 180px;
    justify-content: space-around;
    margin: ${props=>props.isSmall==true?"0px 20px 30px 0px":"0px 0px 29px 20px"};
  }
  .designer {
    // flex: 0 0 247px;
    justify-content: space-around;
    margin: ${props=>props.isSmall==true?"0px 20px 30px 0px":"0px 0px 30px 28px"};
    padding: 0px;
  }
  .maker {
    flex: 0 0 247px;
    justify-content: space-around;
    margin: ${props=>props.isSmall==true?"0px 20px 30px 0px":"0px 0px 30px 28px"};
    padding: 0px;
  }
  .gallery{
    flex: 0 0 180px;
    justify-content: space-around;
    margin: 0px 0px 45px 20px;
    padding: 0px;
  }
`;
const NoData = styled.div`
  min-width:100%;
  min-height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  width: max-content;
  padding: 57px 20px 57px 0px;
  text-align: center;
  font-size:${market_style.font.size.normal1};
  color:red;
  font-family: Noto Sans KR;
  font-weight: 500;
  // border: 1px dashed gray;
`;

class ScrollList extends Component {
  state = { hasMore: true, loading: false };
  getLoadData = page => {
    this.props.getListRequest &&
      this.props.getListRequest(page)
        .then(() => {
          this.setState({
            hasMore: this.props.dataList === null || this.props.dataList.length < 10 ? false : true,
            loading: true
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            hasMore: false
          });
        });
  };

  render() {
    const { ListComponent, type } = this.props;
    // console.log(this.props.handler);
    return (
      this.props.dataListAdded &&
        this.props.dataListAdded.length > 0 ?
        <ScrollContainer>
          <InfiniteScroll id={this.props.scrollId || "infi-scroll"} threshold={100} pageStart={0}
            loadMore={this.getLoadData} hasMore={this.state.hasMore}
            loader={
              <Loader className="loading" active={false}
                inline="centered" size="huge" key={0} />
            }>
            <ListContainer isSmall={this.props.isSmall==null?false:true}>
              {this.props.dataListAdded.map((content, index) => (
                <div key={index} className={this.props.type == "item"?index%4==0?"item":index%4==3?"item":"item":
                this.props.type == "designer"&&index%5==0?"designer":index%5==4?"designer":"designer"}>
                  <ListComponent data={content} type={type} confirm={this.props.confirm} handler={this.props.handler} />
                </div>
              ))}
            </ListContainer>
          </InfiniteScroll>
        </ScrollContainer>
        : <NoData><div>검색 결과 없음</div></NoData>
    );
  }
}

export default ScrollList;
