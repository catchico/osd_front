import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
// import noimg from "source/noimg.png";
import HaveInItemContainer from "containers/Products/HaveInItemContainer/HaveInItemContainer";
import HaveInGalleryContainer from "containers/Gallery/HaveInGalleryContainer/HaveInGalleryContainer";

import DesignerReviewContainer from "containers/Designer/DesignerReviewContainer";
import DesignerRequestBoardContainer from "containers/Designer/DesignerRequestBoardContainer";
import TextFormat from "modules/TextFormat";
// import NumberFormat from "modules/NumberFormat";
// import profile from "source/thumbnail.png";
// import Item from "components/Items/Item/Item"
import ReviewDetailModal from "components/Commons/ReviewDetailModal";

const LocationList = [
  { value: 0, text: "서울특별시" },
  { value: 1, text: "부산광역시" },
  { value: 2, text: "대구광역시" },
  { value: 3, text: "인천광역시" },
  { value: 4, text: "광주광역시" },
  { value: 5, text: "대전광역시" },
  { value: 6, text: "울산광역시" },
  { value: 7, text: "경기도" },
  { value: 8, text: "강원도" },
  { value: 9, text: "충청북도" },
  { value: 10, text: "충청남도" },
  { value: 11, text: "전라북도" },
  { value: 12, text: "경상북도" },
  { value: 13, text: "경상남도" },
  { value: 14, text: "제주도" },
  { value: 15, text: "제한없음" },
];

// CSS STYLING

const Expert = styled.div`
  margin-right: ${prop => prop.mRight}px;
  border: 1px solid transparent;
  width: 468px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
`;
const Profile = styled.div`

  width: 227px;
  height: 228px;
  margin-top: 18px;
  margin-left: 122px;
  background: transparent;
  background-image: url(${props => props.face});
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;
const LikeWrapper = styled.div`
  width:100%;
  text-align:center;
  margin-top:20px;
  font-size:30px;
  cursor:pointer;
  .unlike{
    color:#ff0000;
    font-weight:200;
  }
  .like{
    color:#ff0000;
  }
`;
const TextWrapper = styled.div`
  margin-top: 27px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  font-family: Noto Sans KR;
  text-align: center;
  letter-spacing: 0;
  .nick {
    font-weight: 500;
    font-size: 22px;
    color: #000000;
    line-height: 33px;
  }
  .category {
    margin-top: 12px;
    font-weight: 300;
    font-size: 15px;
    line-height: 22px;
    color: #FF0000;
  }
`;
const Counter = styled.div`
  margin-top: 76px;
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
  }
  .v-line {
    margin-left: 10.5px;
    margin-right: 10.5px;
    width: 0px;
    height: 16px;
    border: 0.5px solid #707070;
  }
  .likes {
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`;
const Introduction = styled.div`
  margin-right: ${prop => prop.mRight}px;
  position:relative;
  width: 982px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 62px 59px 61px 60px;
  font-family: Noto Sans KR;
  .wrapItem{
    width:100%;
    height:100%;
    overflow:hidden;
    overflow:scroll-y;
    .title {
      font-size: 19px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
    }
    .text {
      width: 100%;
      margin-top: 15px;
      margin-bottom:29px;
      font-size: 15px;
      font-weight: 300;
      line-weight: 27px;
      text-align: left;
      overflow: hidden;
    }
    .flex{
      display:flex;
    }
    .gradient_box{
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      border-radius: 20px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
  

  // &:hover{
  //   .gradient_box{
  //     display:none;
  //   }
    // .wrapItem {
    //   overflow: auto;
    // }
  }


`;
//const RequestBoard = styled.div`
//  margin-right: ${prop => prop.mRight}px;
//  width: ${prop => prop.large ? 1094 : 566}px;
//  height: ${prop => prop.large ? 1168 : 491}px;
//  background: #FFFFFF;
//  box-shadow: 5px 5px 10px #00000029;
//  border-radius: 20px;
//  opacity: 1;
//  padding: 62px 65px 35px 60px;
//  font-family: Noto Sans KR;
//  .line {
//    display: flex;
//    flex-direction: row;
//    .title {
//      font-weight: 500;
//      font-size: 19px;
//      text-align: left;
//      line-height: 27px;
//      letter-spacing: 0;
//      color: #000000;
//      opacity: 1;
//    }
//    .button {
//      margin-left: auto;
//      font-weight: 500;
//      font-size: 19px;
//      text-align: left;
//      line-height: 27px;
//      letter-spacing: 0;
//      color: #FF0000;
//      opacity: 1;
//      cursor: default;
//    }
//  }
//  .board {
//    margin-top: 42px;
//    width: 441px;
//    .lement {
//      font-size: 15px;
//      text-align: left;
//      line-height: 20px;
//      color: #707070;
//      letter-spacing: 0;
//      opacity: 1;
//      margin-top: 12px;
//    }
//  }
//`;
const ItemInfo = styled.div`
  margin-right: ${prop => prop.mRight}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: ${props => props.height == null ? "491px" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  font-family: Noto Sans KR;
  padding: 30px;

  .title {
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    width: 371px;
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size: 15px;
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    // overflow: auto;
    overflow:scroll-y;
  }
  .wrapItem{
    max-width:100%;
    max-height:350px;
    margin-top:30px;
    width:100%;
    height:max-content;
    overflow:hidden;
    overflow-y:scroll;
    // overflow-y:overlay;
    display:flex;
  }
  .wrapGallery{
    max-width:100%;
    max-height:300px;
    margin-top:30px;
    width:100%;
    height:max-content;
    overflow:hidden;
    overflow-y:scroll;
    // overflow-y:overlay;
    display:flex;
  }
  // &:hover{
  //   .wrapItem{
  //     overflow:auto;
  //     overflow-y:overlay;
  //   }
  // }
`;
const AdditionalInfo = styled.div`
  margin-right: ${prop => prop.mRight}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: ${props => props.height == null ? "491px" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  // padding: 90px 43px 161px 54px;
  padding: 62px 59px 61px 60px;
  font-family: Noto Sans KR;
  
  .title {
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    width: 371px;
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size: 15px;
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    overflow-y:scroll;
    // overflow: auto;
  }
  .wrapItem{
    max-width:100%;
    max-height:100%;
    margin-top:30px;
    width:100%;
    // height:max-content;
    display:flex;
    overflow:hidden;
    overflow-y:scroll;
  }
  // &:hover{
  //   .wrapItem{
  //     verflow:auto;
  //   }
  // }
`;
const DesignerBoard = styled.div`
  width: 1523px;
  height: max-content;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  font-family: Noto Sans KR;
  padding: 90px 60px 30px 60px;
  margin-bottom:100px;
  .alignRight{
    text-align:right;
  }
  .redText{
    color:red;
    cursor:pointer;
    margin:20px;
  }
  .title {
    color: #000000;
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  };

  .list {
    // margin-top: 72px;
    font-weight: 300;
    font-size: 19px;
    text-align: left;
    line-height: 27px;
    color: #000000;

    display:flex;
    flex-direction:column;
    align-items:center;
    .line {
      width:1300px;
      display: flex;
      flex-direction: row;
      margin-bottom: 37px;
      .title_text{
        width:750px;
        height:29px;
        overflow:hidden;
        margin-right:130px;
      }
      .sub_text{
        margin-left:70px;
      }
    }
    .circle {
      width: 80px;
      height: 29px;
      margin-right: 13px;
      border-radius: 16px;
      font-size:6px;
      display:flex;
      justify-content:center;
      align-items:center;
      padding:5px;
      &.red1 { background: #FF0000; };
      &.red2 { background: #FFC0C0; };
      &.red3 { background: #FF6868; };
      &.red4 { background: #FFD6D6; };
    };
  };
  .page {
    width: max-content;
    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    font-weight: 500;
    text-aglin: left;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    color: #707070;
    .number{
      margin-right: 10px;
    }
    .this{
      color: red;
    }
    
    .another {}
    .more {}
  };
`;
const Wrapper = styled.div`
// *{
//   border:1px solid black;
// }
  display:flex;
  align-items:center;
  flex-direction:column;
  margin-top: 138px;
  // *{border:1px solid red;};
  .contents_box{
    width:max-content;
    height:max-content;
  }
`;
const ExpTable = styled.div`
    *{
      font-family:Noto Sans KR;
      font-size:16px;
    }
    width: ${props => props.width == null ? "100%" : props.width + "px"};
    height: ${props => props.height == null ? "max-content" : props.height + "px"};
    margin-left: ${props => props.mLeft == null ? "0px" : props.mLeft + "px"}px;
    margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
    .row{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:10px;
    }
    .header{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:5px;
    }
    .th{
      width:33%;
      height:100%;
      font-weight:400;
    }
    .td{
      width:33%;
      height:100%;
      font-weight:200;
    }
`;

// const Thumbnail = styled.div`
// cursor:pointer;
// width:150px;
// height:150px;
// display:flex;
// justify-content:center;
// align-items:center;
// background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
// background-size: cover;
// background-position: center center;
// `;
const TitleForm = styled.input`
  padding: 10px;
  resize: none;
  width: 100%;
  height: 30px;
  border: 1px solid #E6E6E6;
  outline: none;
  border-radius: 10px;
`
const CommentForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`
const WriteReview = styled.div`
  margin-bottom:10px;
  .form{
      width:100%;
      padding:10px;
  }
  .contents{
      display:flex;
      justify-content:space-between;
      padding-left:10px;
      padding-right:10px;
      .score{

      }
      .buttonBox{
          .button{
              width:100px;
              padding:10px;
              border-radius:20px;
              background-color:#707070;
              display:flex;
              justify-content:center;
              align-items:center;
              cursor:pointer;
              .text{
                  color:white;
              }
          }

      }
  }
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    background-color: #EFEFEF;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
const CreateReview = styled.div`
    width:100%;
    height:30px;
    margin-bottom:10px;
    display:flex;
    .button{
        width:max-content;
        height:100%;
        display:flex;
        padding:15px;
        justify-content:center;
        align-items:center;
        border-radius:5px;
        background-color:#707070;
        cursor:pointer;
    }
    .font{
        font-size:15px;
        color:white;
    }
`;

// const review = {
// average_score: 4,
// review: [{
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }, {
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }, {
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }],
// };


class DesignerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: false, title: "", comment: "",
      tab: true,
      isLike: false,
      nick_name: "", user_id: null,
      thumbnail: null, thumbnail_name: null,
      category_level1: 0, category_level2: 0, location: null,
      explain: "", tag: [],
      career: [{ number: 0, task: "", explain: "", during: "" }],
      reviewdetail: false, detail: null
    };
    this.onClickRequest = this.onClickRequest.bind(this);
    this.onClickisLike = this.onClickisLike.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.DesignerViewDetail.image !== nextProps.DesignerViewDetail.image ||
      this.props.DesignerViewDetail.nick_name !== nextProps.DesignerViewDetail.nick_name ||
      this.props.DesignerViewDetail.user_id !== nextProps.DesignerViewDetail.user_id ||
      this.props.DesignerViewDetail.description !== nextProps.DesignerViewDetail.description ||
      this.props.DesignerViewDetail.location !== nextProps.DesignerViewDetail.location ||
      this.props.DesignerViewDetail.category_level1 !== nextProps.DesignerViewDetail.category_level1 ||
      this.props.DesignerViewDetail.category_level2 !== nextProps.DesignerViewDetail.category_level2 ||
      this.props.DesignerViewDetail.tag !== nextProps.DesignerViewDetail.tag ||
      this.props.DesignerViewDetail.experience !== nextProps.DesignerViewDetail.experience ||
      this.props.DesignerViewDetail.score !== nextProps.DesignerViewDetail.score ||
      this.props.like !== nextProps.like) {

      const careerRow = nextProps.DesignerViewDetail.experience.split("/");
      careerRow.pop();
      const careerList = careerRow.map((item, index) => {
        const piece = item.split(",");
        // console.log("piece:::",piece[0],piece[1],piece[2],piece[3]);
        return (
          { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
        );
      });
      const tag = nextProps.DesignerViewDetail.tag.split(",");
      tag.pop();

      this.setState({
        isLike: nextProps.like,
        thumbnail: nextProps.DesignerViewDetail.image,
        nick_name: nextProps.DesignerViewDetail.nick_name,
        user_id: nextProps.DesignerViewDetail.user_id,
        explain: nextProps.DesignerViewDetail.description,
        location: nextProps.DesignerViewDetail.location,
        category_level1: nextProps.DesignerViewDetail.category_level1,
        category_level2: nextProps.DesignerViewDetail.category_level2,
        tag: tag,
        career: careerList,
        score: nextProps.DesignerViewDetail.score,
      })
    };

    return true;
  }
  onClickRequest(event) {
    window.location.href = "/requestToDesigner/" + this.props.id;
  }
  onClickisLike(event) {
    const isLike = !this.state.isLike;

    isLike === false ? this.props.UnlikeDesignerRequest(this.state.user_id, this.props.token)
      : this.props.LikeDesignerRequest(this.state.user_id, this.props.token);

    this.setState({ isLike: isLike });
  }
  createNoneRequest = () => {
    const data = {
      type: "designer",
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      content: this.state.comment,
      title: this.state.title,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          alert("글이 등록되었습니다.");
          this.props.GetDesignerRequestListRequest(this.props.id, 0);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => alert("에러발생" + err));
  }
  render() {

    // const expert = empty;
    const { likeCount, itemCount } = this.props.DesignerViewDetail;

    const Location = this.state.location == null ? "" : LocationList[this.state.location] && LocationList[this.state.location].text;
    // const user_id = this.state.user_id;
    // const { tab } = this.state;
    // const user_id = this.state.user_id;
    // const { tab } = this.state;
    const { write } = this.state;
    // 카테고리
    // const categoryName = this.props.category1 && this.props.category2 &&
    //   this.state.category_level2 === 0 ? this.props.category1[this.state.category_level1] && this.props.category1[this.state.category_level1].text
    //   : this.props.category2[this.state.category_level1] &&
    //   this.props.category2[this.state.category_level1][this.state.category_level2] && this.props.category2[this.state.category_level1][this.state.category_level2].text;
    let categoryName = this.props.category1 && this.props.category2 &&
      this.state.category_level2 < 1 ?
      this.props.category1[parseInt(this.state.category_level1, 10)]
      && this.props.category1[parseInt(this.state.category_level1, 10)].text
      : null;

    this.props.category2 && this.props.category2.map((item, index) => {
      if (item.parent === this.state.category_level1 && item.value === this.state.category_level2) {
        categoryName = item.text;
      }
      return item;
    })

    console.log(categoryName);
    console.log(this.props);
    return (<Wrapper>
      <div className="contents_box" />
      <div style={{ display: "flex" }}>
        {/* Designer */}
        <Expert mRight={60}>
          {/* Profile */}
          <Profile face={this.state.thumbnail} />
          {/* Text */}
          <TextWrapper>
            <div className="nick"><TextFormat txt={this.state.nick_name} chars={32} /></div>
            <div className="category"><TextFormat txt={categoryName || "전체"} chars={32} /></div>
          </TextWrapper>
          <LikeWrapper>
            {this.state.isLike === false ?
              <div onClick={this.onClickisLike} className="unlike">♡</div>
              :
              <div onClick={this.onClickisLike} className="like">♥</div>
            }
            {/* ♥ */}
          </LikeWrapper>
          {/* Counter */}
          <Counter>
            <div className="items">
              {itemCount || 0}개의 아이템</div>
            <div className="v-line" />
            <div className="likes">{/**/}
              <Icon className="heart" size="small" color="red" />{likeCount || 0}</div>
          </Counter>
        </Expert>

        {/* Introduction */}
        <Introduction>
          <div className="wrapItem">
            <div className="title"><TextFormat txt={this.state.nick_name} chars={32} /></div>
            <div className="text">{this.state.explain || "천지는 맺어, 끓는 밥을 곧 것이다. 영원히 고동을 불러 심장은 피가 봄바람을 인생에 있으랴? 불어 커다란 할지라도 부패를 인간의 생명을 이상, 불어 바로 것이다. 대고, 방황하였으며, 가치를 봄날의 인간이 가진 설산에서 운다. 있는 착목한는 그들의 노래하며 원질이 대한 아름다우냐? 같은 찬미를 붙잡아 청춘 힘차게 두기 갑 속잎나고, 소담스러운 것이다. 몸이 원질이 가슴이 피가 반짝이는 소리다.이것은 이상의 예가 피다. 그들을 할지니, 품었기 가치를 보배를 남는 지혜는 약동하다. 목숨이 일월과 동력은 가는 청춘의 사라지지 더운지라 가는 있음으로써 것이다. 가치를 웅대한 대한 새 피가 품에 소담스러운 그들에게 오직 듣는다. 찾아다녀도, 들어 그들은 피어나기 것이다. 착목한는 되려니와, 그와 타오르고 커다란 가는 위하여서. 물방아 얼마나 것이다.보라, 바로 얼마나 남는 위하여서, 봄바람이다. 얼마나 그림자는 얼음에 보이는 새가 보내는 것이다. 가슴에 인간의 두기 끝까지 무엇이 것은 그리하였는가? 보이는 천지는 주며, 듣는다. 이상, 몸이 곧 두기 커다란 이것을 그들에게 위하여서, 가슴에 보라. 무한한 돋고, 많이 가슴에 있는 사막이다. 힘차게 무엇을 능히 되는 가치를 이 거선의 남는 부패뿐이다. 소금이라 얼음 긴지라 품었기 과실이 굳세게 끓는 봄바람이다. 인간의 갑 별과 사라지지 품에 같지 사막이다. 소금이라 듣기만 설레는 심장은 있으며, 것은 위하여서, 그리하였는가? 그들을 그러므로 물방아 우리의 있을 얼음과 청춘의 장식하는 보라. 이것은 끝까지 기관과 가진 인류의 그들은 힘있다. 붙잡아 뛰노는 실로 피고 피에 그것을 황금시대다. 그들의 위하여, 그것을 힘있다. 봄바람을 구하기 가슴이 풍부하게 주며, 무엇을 인도하겠다는 없으면, 봄바람이다. 청춘 방황하여도, 산야에 영원히 그들은 간에 하는 위하여서, 아니다. 사는가 얼마나 그들은 부패를 못할 하여도 무엇을 것이다. 찾아다녀도, 피는 위하여 약동하다."}</div>
            <div className="title">위치</div>
            <div className="text">{Location}</div>
            <div className="title">카테고리</div>
            <div className="text">{categoryName || "전체"}</div>
            <div className="title">태그</div>
            <div className="text flex">
              {
                this.state.tag.map((item, index) => {
                  return (
                    <TagPiece key={index}>
                      {item}
                    </TagPiece>
                  );
                })
              }
            </div>
            {/* <div className="gradient_box"><div>▾</div></div> */}
          </div>
        </Introduction>
        {/* 상세소개 */}
        {/* <AdditionalInfo>
          <div className="title">거주 지역</div>
          <div className="text">{Location}</div>
        </AdditionalInfo> */}
      </div>

      {/* 리뷰 */}
      {/*  */}
      <AdditionalInfo width={1523} height={280} mTop={60}>
        <div className="wrapItem">
          <div className="title margin_bottom">리뷰({this.props.ReviewCount})</div>
          <DesignerReviewContainer
            id={parseInt(this.props.id, 10)}
            handler={detail => this.setState({ reviewdetail: true, detail: detail })} />
        </div>
      </AdditionalInfo>
      {/*리뷰자세히*/}
      {this.state.reviewdetail ? <ReviewDetailModal open={this.state.reviewdetail} close={() => this.setState({ reviewdetail: false })} detail={this.state.detail} /> : null}

      {/* 경험 */}
      <AdditionalInfo width={1523} height={280} mTop={60}>
        <div className="title margin_bottom">디자인 경험</div>
        <ExpTable>
          <div className="header">
            <div className="th">업무</div>
            <div className="th">기간</div>
            <div className="th">내용</div>
          </div>
          {this.state.career.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="td">{item.task}</div>
                <div className="td">{item.during}</div>
                <div className="td">{item.explain}</div>
              </div>
            );
          })}
        </ExpTable>

      </AdditionalInfo>

      {/**보유아이템 */}
      <ItemInfo width={1523} height={491} mTop={60}>
        <div className="title">디자인 아이템</div>
        <div className="wrapItem">
          {<HaveInItemContainer id={this.props.id} />}
        </div>

      </ItemInfo>

      {/**갤러리 아이템 */}
      <ItemInfo width={1523} height={491} mTop={60}>
        <div className="title">갤러리</div>
        <div className="wrapGallery">
          {<HaveInGalleryContainer id={this.props.id} isModify={false} />}
        </div>

      </ItemInfo>

      <div style={{ marginTop: "61px", display: "flex", flexDirection: "row" }}>
        <DesignerBoard>
          <div className="title">디자이너 게시판</div>
          <div className="title"><div className="redText alignRight" onClick={this.onClickRequest}>디자인 의뢰</div></div>
          <div className="list">
            {/* board:[{uid:"",user_id:"",nick_name:"",type:"",title:"",create_time:"",update_time:""}], */}
            <DesignerRequestBoardContainer id={parseInt(this.props.id, 10)} />
            {/* {expert.board.map((item, index) => {
              //"designer_req" "designer_res" "maker_req" "maker_res" 
              const type = item.type == "designer" ? item.sort_group_id === 0 ?
                <div className="circle red1" >디자이너의뢰</div> :
                <div className="circle red2" >디자이너응답</div> : null
              console.log(item);
              return (
                <div key={index} className="line">
                  {type}
                  <div className="title_text">{item.title}</div>
                  <div className="sub_text">{item.nick_name}</div>
                  <div className="sub_text">{item.create_time}</div>
                </div>
              )
            })} */}
          </div>
          {/* <div className="page">
            <div className="this number">1</div>
            <div className="another number">2</div>
            <div className="another number">3</div>
            <div className="another number">4</div>
            <div className="more">...</div>
          </div> */}
          {write ?
            <WriteReview>
              <div className="form">
                제목:
                <TitleForm
                  value={this.state.title || ""}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                  name="title"
                />
                내용:
                <CommentForm
                  value={this.state.comment || ""}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                  name="comment"
                />
              </div>
              <div className="contents">
                <div className="buttonBox">
                  <div className="button" onClick={this.createNoneRequest} >
                    <div className="text" >작성</div>
                  </div>
                </div>
              </div>
            </WriteReview>
            :
            <CreateReview onClick={() => this.setState({ write: true })}>
              <div className="button">
                <div className="font">게시글 작성</div>
              </div>
            </CreateReview>
          }
        </DesignerBoard>
      </div>

    </Wrapper>);
  }
};

export default DesignerDetail;
