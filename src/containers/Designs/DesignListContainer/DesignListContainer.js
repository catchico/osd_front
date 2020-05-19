import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest, GetDesignListCountRequest } from "redux/modules/design";
import { GetCategoryAllRequest } from "redux/modules/category";
import Category from "components/Commons/Category";
import OrderOption from "components/Commons/OrderOption";
import ScrollList from "components/Commons/ScrollList";
import Loading from "components/Commons/Loading";
import styled from 'styled-components';
import opendesign_style from "opendesign_style";

const Wrapper = styled.div`
  position:relative;
  .orderBox{
    margin-top:10px;
    width:100%;
    height:max-content;
  }
`
const TextWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    top: 25px;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
    cursor: pointer;
    margin-top:100px;
    @media only screen and (max-width : 900px) {
    margin-top:150px;
    }
    .title{
    width:300px;
    text-align:center;
    }
`;
const JoinDesignContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    padding:10px;
    .joinDesign{
        width:max-content;
        height:29px;
        text-align: left;
        font-size: 20px;
        cursor: pointer;
        font-family: Noto Sans KR;
        font-weight:500;
        color: red;
        line-height: 29px;
        border-bottom: 1.5px solid red;
    }

`;
const ScrollListContainer = styled.div`
    padding-top: 100px;
    padding-bottom: 68px;
`;
const BlankDiv = styled.div`
    padding-top: 50px;
`;
class DesignListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false, screenWidth: window.innerWidth,
      this_order: { text: "등록순", keyword: "update" },
      this_category: { text: null, value: null },
      main_category: { text: null, value: null }, sub_category: { text: null, value: null },
    };
    this.handleReload = this.handleReload.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    this.handleChangeOrderOps = this.handleChangeOrderOps.bind(this);
    this.getList = this.getList.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.props.GetCategoryAllRequest()
      .then(() => { this.props.GetDesignListCountRequest(null, null) });
    this.props.GetDesignListRequest(0, null, null, null, null);
    window.addEventListener("resize", this.handleResize, false);

  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  };
  handleResize() {
    this.setState({ screenWidth: window.innerWidth })
  }
  handleReload() {
    this.setState({ reload: !this.state.reload });
  }
  async handleChangeCategory(category) {
    await this.setState({ main_category: category, this_category: category, sub_category: { text: null, value: null } })
    this.props.GetDesignListCountRequest(category.value, null);
    this.handleReload();
    this.getList(0);
  }
  async handleChangeSubCategory(parent, category) {
    await this.setState({ main_category: parent, this_category: category, sub_category: category });
    this.props.GetDesignListCountRequest(this.state.main_category.value, category.value);
    this.handleReload();
    this.getList(0);
  }
  async handleChangeOrderOps(order) {
    await this.setState({ this_order: order })
    this.handleReload();
    this.getList(0);
  }
  async getList(page) {
    const { main_category, sub_category, keyword, this_order } = this.state;
    return this.props.GetDesignListRequest(page, this_order.keyword, main_category.value, sub_category.value, keyword);
  }
  changeCategory(category) {
    if (this.state.this_category === category) {
      return;
    }
    this.handleChangeCategory(category);
  }

  render() {
    const { this_category, main_category, sub_category, reload, this_order } = this.state
    const { category1, category2, Count, status } = this.props;
    return (<React.Fragment>
      <Wrapper>

      <Category subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
        category1={category1} category2={category2[category1.indexOf(main_category)]} main_selected={main_category} sub_selected={sub_category} />
      
      <TextWrapper centerPos={this.state.screenWidth} onClick={() => this.changeCategory(main_category)}>
        <div className="title"> {(this_category && this_category.text === "전체" ? "디자인" : this_category.text) || "디자인"}&nbsp;({Count})</div>
      </TextWrapper>
      <JoinDesignContainer>
        <div className="joinDesign"/>
      </JoinDesignContainer>

      <div className="orderBox">
        <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
      </div>
      
      <ScrollListContainer>
        {status === "INIT"
          ? <Loading />
          : <ScrollList {...opendesign_style.design_margin} reload={reload} handleReload={this.handleReload}
            type="design" dataList={this.props.DesignList} dataListAdded={this.props.DesignListAdded} getListRequest={this.getList} />}
      </ScrollListContainer>
    <BlankDiv />
    </Wrapper>
    </React.Fragment>)
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    DesignListAdded: state.DesignList.status.DesignListAdded,
    userInfo: state.Authentication.status.userInfo,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    Count: state.DesignList.status.Count,
    status: state.DesignList.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2))
    },
    GetDesignListCountRequest: (category1, category2) => {
      return dispatch(GetDesignListCountRequest(category1, category2))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);
