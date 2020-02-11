import React, { Component } from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { InputTag } from "components/Commons/InputItem/InputTag";
import { ThumbnailList } from "components/Commons/InputItem/ThumbnailList";
import { UploadType } from "components/Commons/InputItem/UploadType";
import { AddController } from "components/Commons/InputItem/AddController";
import { Controller } from "components/Commons/InputItem/Controller";

const FirstCategory = [
  { text: "패션", value: 0 },
  { text: "제품", value: 1 },
  { text: "커뮤니케이션", value: 2 },
  { text: "공간", value: 3 },
  { text: "엔터테인먼트", value: 4 },
  { text: "소프트웨어", value: 5 },
  { text: "새분야", value: 6 }];
const EmptyCategory = [{ text: "", value: -1 }];
const SecondCategory =
  [[{ text: "스마트패션", value: 0 }, { text: "의상", value: 1 }, { text: "엑세서리", value: 2 }, { text: "패션모듈", value: 3 }],
  [{ text: "스마트카", value: 0 }, { text: "로봇", value: 1 }, { text: "기계/기기/기구", value: 2 }, { text: "센서모듈", value: 3 }, { text: "공예", value: 4 }],
  [{ text: "UI/UX", value: 0 }, { text: "광고", value: 1 }, { text: "웹", value: 2 }, { text: "영상", value: 3 }, { text: "타이포그래피", value: 4 }],
  [{ text: "스마트시티", value: 0 }, { text: "건축", value: 1 }, { text: "인테리어", value: 2 }, { text: "환경", value: 3 }],
  [{ text: "스마트미디어", value: 0 }, { text: "게임", value: 1 }, { text: "디지털컨텐츠", value: 2 }, { text: "서비스", value: 3 }],
  [{ text: "인공지능", value: 0 }, { text: "빅데이터", value: 1 }, { text: "시스템SW", value: 2 }, { text: "응용SW", value: 3 }],
  [{ text: "새분야", value: 0 }]];
const ItemType =
  [{ text: "디자인", value: 0 },
  { text: "프로젝트", value: 1 },
  { text: "특허권", value: 2 },
  { text: "기술자문/상담", value: 3 },
  { text: "경험", value: 4 },
  { text: "정보/데이터", value: 5 },
  { text: "아이디어/노하우", value: 6 },
  { text: "제품", value: 7 }];
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
  .contentsBox{
    width:100%;
    display:flex;
    padding-left:130px;
    padding-top:36px;
  }
  .font_red {
    width: 7px;
    height: 7px;
    color: #FF0000;
    cursor: default;
  }
`;
const RedButton = styled.div`
  width:290px;
  height:70px;
  font-family:Noto Sans KR;
  font-size:20px;
  font-weight:500;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:red;

  position:absolute;
  left:${props => props.left};
  bottom:${props => props.bottom};
`;
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width: 562px;
  height: max-content;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-top: 54px;
  margin-right: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .label{
    width:100%;
    height:29px;
    padding-left:42px;

  }
  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:20px;
  }
`;
const Thumbnail = styled.div`
  width: ${props => props.width == null ? 100 : props.width}px;
  height: ${props => props.height == null ? 100 : props.height}px;
  margin-bottom: ${props => props.marginBottom == null ? 0 : props.marginBottom}px;
  background: #E9E9E9;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormBox = styled.div`
  *{
    font-family: Noto Sans KR;
    font-weight: 500;
    font-size: 20px;
  }
  width:${props => props.width || 939}px;
  height:${props => props.height || "max-content"};
  box-shadow: ${props => props.boxShadow == null ? "" : "5px 5px 10px #00000029"};
  border-radius: 20px;
  
  .contentWrap{
    border-radius: 20px;
    padding-left:59px;
    padding-right:59px;
    padding-top:49px;
  }
  .wrapper{
    width:100%;
    margin-bottom:50px;
  }
  .margin_zero{
    margin:0px;
  }
  .flex{
    display:flex;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    min-width:157px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
`;
const Button = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  background-color:white;
  font-family:Noto Sans KR;
  font-size:20px;
  display:flex;
  align-items:center;
  margin-left:${props => props.margin == null ? 0 + "px" : props.margin + "px"};
  .label{
    margin-left:60px;
  }
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;

`;
const DropBox = styled(Dropdown)`
  min-width:200px !important;
  background-color: #E9E9E9 !important;
  margin-right: 10px;
  border-radius: 20px !important;
`;
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const HRLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: #E9E9E9;
  margin-top: 35px;
  margin-bottom: 35px;
`;

class CreateProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null, thumbnail_name: null,
      title: null, category1: null, category2: null, tag: [],
      type_content: null,
      firstCategory: 0, secondCategory: -1,
      itemType: -1, content: [], deleteContent: []
    };
    this.onClickFirstCategory = this.onClickFirstCategory.bind(this);
    this.onClickItemType = this.onClickItemType.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };
  success = () => 1070;
  onSubmit(event) {
    event.preventDefault();
    const basic = {
      thumbnail: this.state.thumbnail, thumbnail_name: this.state.thumbnail_name,
      title: this.state.title,
      category1: this.state.category1, category2: this.state.category2,
      tag: this.state.tags
    };
    const add = { type_content: this.state.type_content };
    const data = { ...basic, add };
    console.log(data);

    window.location.href = `/productDetail/${this.success()}`;
  }
  onClickFirstCategory(event, { value }) {
    this.setState({ firstCategory: { value }.value });
  };
  onClickItemType(event, { value }) {
    this.setState({ itemType: { value }.value });
  };
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  async deleteItem(index) {
    let copyContent = [...this.state.content];
    let copyDelete = [...this.state.deleteContent];
    if (copyContent[index].uid) {
      copyDelete.push(copyContent[index]);
    }
    await copyContent.splice(index, 1);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        delete item.target;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent, deleteContent: copyDelete });
  };
  async onAddValue(data) {
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);
    // let newContent = [];
    //copyContent = copyContent.map((item, index) => {
    //  if(item != null){
    //    newContent.push(item);
    //  }
    //})
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ content: newContent });
  };

  render() {
    const { /*edit, */ content } = this.state;
    const Mandatory = () => <span className="font_red" title="필수사항입니다.">*</span>

    return (<MainBox>
      <div className="title">아이템 등록하기</div>
      <div className="contentsBox">
        <ThumbnailBox>
          <div className="label">썸네일 이미지 등록<Mandatory /></div>
          <Margin height={50} />
          <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
          <label htmlFor="file">
            <Thumbnail img={this.state.thumbnail} width={334} height={334}>
              {this.state.thumbnail ? null : <div>첨부하기</div>}
            </Thumbnail>
          </label>
          <Margin height={75} />
        </ThumbnailBox>

        <FormBox height={'550px'} boxShadow={true}>
          <div className="contentWrap">
            <div className="wrapper flex">
              <div className="label">아이템명<Mandatory /></div>
              <InputText width={370} />
            </div>

            <div className="wrapper flex ">
              <div className="label">카테고리<Mandatory /></div>
              <DropBox id="firstCategory" selection options={FirstCategory} placeholder="대분류" onChange={this.onClickFirstCategory} />
              <DropBox id="secondCategory" selection placeholder="소분류"
                options={this.state.firstCategory > -1 ? SecondCategory[this.state.firstCategory] : EmptyCategory} />
            </div>

            <div className="wrapper flex">
              <div className="label">태그</div>
              <div>
                <InputTag width={370} />
              </div>
            </div>

            <div className="wrapper flex">
              <div className="label">아이템 유형<span className="font_red">*</span></div>
              <DropBox selection options={ItemType} placeholder="아이템 유형" onChange={this.onClickItemType} />
            </div>
            {/* <HRLine /> */}
          </div>
        </FormBox>
      </div>

      {/* create-item-detail */}
      {this.state.itemType > -1 ? (
        <div className="contentsBox">
          <FormBox boxShadow={true} >
            <div className="contentWrap">
              <ItemTypeForm itemType={this.state.itemType} />
            </div>
            <div className="contentWrap">
              <form onSubmit={this.onSubmit}>
                {content.length > 0 ? (
                  <div>
                    {content.map((item, index) => {
                      return (
                        <div key={index}>
                          {/* <AddController type="INIT" order={index} name={`add${index}`} getValue={this.onAddValue} /> */}
                          <Controller type={item.type} item={item} order={index} deleteItem={this.deleteItem} name={`content${index}`} getValue={this.onChangValue} />
                        </div>
                      );
                    })}
                    <AddController type="INIT" order={content.length} name="addBasic" getValue={this.onAddValue} />
                  </div>
                ) : (<AddController type="INIT" order={0} name="addBasic" getValue={this.onAddValue} />)}
              </form>
            </div>
          </FormBox>
        </div>) : (<div style={{ border: "1px dashed gray", padding: "25px", width: "860px", borderRadius: "20px", lineHeight: "28px", textAlign: "center", marginTop: "76px", marginLeft: "auto", marginRight: "auto", fontSize: "24px", color: "#707070" }}>아이템 유형을 선택하여 세부적인 <br />내용을 입력해주신 후 아이템을 등록해주세요.</div>)}

      {/* buttons */}
      {this.state.itemType > -1 ? (
        <div className="contentsBox">
          <RedButton onClick={this.onSubmit}>아이템 등록</RedButton>
        </div>
      ) : null}
    </MainBox>);
  };
} export default CreateProductForm;

class ItemTypeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selectType = this.props.itemType == null ? -1 : this.props.itemType;
    return (
      <FormBox>
        <div className="wrapper flex">
          <div className="label">설명</div>
          <InputTextarea width={483} height={99} />
        </div>
        <div className="wrapper flex">
          <div className="label">가격<span className="font_red">*</span></div>
          <InputText width={370} />
        </div>
        {/* <HRLine /> */}
        {selectType == 0 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">상세 이미지</div>
              <ThumbnailList />
            </div>

            <div className="wrapper flex">
              <div className="label">업로드 유형</div>
              <UploadType name="type" Options={["블로그형", "프로젝트형"]} />
            </div>
          </React.Fragment>}

        {selectType == 1 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">상세 이미지</div>
              <ThumbnailList />
            </div>

            <div className="wrapper flex">
              <div className="label">팀원 초대</div>
              <InputText width={370} />
            </div>

            <div className="wrapper flex">
              <div className="label">기간제 서비스</div>
              <UploadType name="isTerm" Options={["예", "아니오"]} />
            </div>

            <div className="wrapper flex">
              <div className="label">기간제 기간</div>
              <InputText width={100} /> ~ <InputText width={100} />
            </div>

            <div className="wrapper flex">
              <div className="label">공개</div>
              <UploadType name="isOpen" Options={["예", "아니오"]} />
            </div>
          </React.Fragment>}

        {selectType == 2 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">판매 방식</div>
              <DropBox selection options={[{ text: "양도", value: 0 }, { text: "독점 사용권", value: 1 }, { text: "일반 사용권", value: 2 }]}
                placeholder="판매 방식" onChange={this.onClickFirstCategory} />
            </div>
          </React.Fragment>}

        {selectType == 3 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">판매 방식</div>
              <DropBox selection options={[{ text: "양도", value: 0 }, { text: "독점 사용권", value: 1 }, { text: "일반 사용권", value: 2 }]}
                placeholder="판매 방식" onChange={this.onClickFirstCategory} />
            </div>
          </React.Fragment>}

        {selectType == 4 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">상담 방법</div>
              <DropBox selection options={[{ text: "온라인", value: 0 }, { text: "오프라인", value: 1 }]}
                placeholder="판매 방식" onChange={this.onClickFirstCategory} />
            </div>
          </React.Fragment>}
        {selectType == 5 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">업로드 유형</div>
              <UploadType name="type" Options={["블로그형", "프로젝트형"]} />
            </div>

            <div className="wrapper flex">
              <div className="label">공개</div>
              <UploadType name="isOpen" Options={["예", "아니오"]} />
            </div>
          </React.Fragment>}
        {selectType == 6 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">업로드 유형</div>
              <UploadType name="type" Options={["블로그형", "프로젝트형"]} />
            </div>

            <div className="wrapper flex">
              <div className="label">공개</div>
              <UploadType name="isOpen" Options={["예", "아니오"]} />
            </div>
          </React.Fragment>}
        {selectType == 7 &&
          <React.Fragment>
            <div className="wrapper flex">
              <div className="label">상세 이미지</div>
              <ThumbnailList />
            </div>
            <div className="wrapper flex">
              <div className="label">배송업체</div>
              <InputText width={370} />
            </div>
            <div className="wrapper flex">
              <div className="label">배송비</div>
              <InputText width={370} />
            </div>
            <div className="wrapper flex">
              <div className="label">배송 소요</div>
              <InputText width={370} />
            </div>
          </React.Fragment>}
      </FormBox>
    );
  }
};

// import React, { Component } from "react";
// import Button from "components/Commons/Button";
// import styled from "styled-components";
// // import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
// // import { Header, Grid, Form } from "semantic-ui-react";
// import noimg from "source/noimg.png";
// import newimg from "source/new-img.png";


// import { FormTag, FormDropBox, FormInput, FormTextArea } from "components/Commons/FormItems";
// import { FormControl, ValidationGroup } from "modules/FormControl";
// // import StyleGuide from "StyleGuide";

// import CreateOption from "components/Products/CreateProductForm/CreateOption/CreateOption";

// const patent_option = [
//   { text: "양도", value: 0 },
//   { text: "독점 사용권", value: 1 },
//   { text: "일반 사용권", value: 2 }
// ]
// //const counsel_option = [
// //  { text: "온/오프라인", value: 0 },
// //  { text: "방문지도", value: 1 },
// //  { text: "팀/개인교육", value: 2 }
// //]
// const newCategory = [
//   { text: "디자인", value: 0 },
//   { text: "특허권", value: 1 },
//   { text: "디자인권", value: 2 },
//   { text: "기술자문", value: 3 },
//   { text: "기술상담", value: 4 },
//   { text: "경험", value: 5 },
//   { text: "정보/데이터", value: 6 },
//   { text: "아이디어/노하우", value: 7 },
//   { text: "제품", value: 8 },
// ];
// const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };
// const MAX_PRODUCT_IMAGE_COUNT = 5;
// const FromFieldCard = styled.div`
//   width: 100%;
//   background-color: white;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//   padding: 70px;
//   margin-bottom: 30px;
//   border-radius: 3px;
//   @media only screen and (min-width: 1200px) {
//     padding: 70px 100px 70px 100px;
//   }
//   & .field label {
//     margin: 0 0 0.8rem 0;
//     display: block;
//     color: rgba(0,0,0,.87);
//     font-size: .92857143em;
//     font-weight: 700;
//     text-transform: none;
//   }
// `;
// const ProductImage = styled.div`
//   display:flex;
//   margin-bottom:50px;
//   .title-wrapper {
//     padding-top: 20px;
//     padding-bottom: 20px;
//     margin-right:80px;
//     display: flex;
//     flex-direction: row;
//     .title {
//       width: 150px;
//       height:30px;
//       border-right:10px solid #707070;
//       margin-left: 15px;
//       font-weight: bold;
//       font-size: ${TxtSz.M}px;
//     }
//     .text {
//       width: max-content;
//       margin-left: 25px;
//       font-weight: light;
//       font-size: ${TxtSz.s}px;
//       color: #707070;
//     }
//   }
//   .img-list-wrapper {
//     padding-top: 10px;
//     padding-bottom: 10px;
//     margin-left: 10px;
//     margin-right: 10px;
//     height: 180px;
//     background-color: white;
//     display: flex;
//     flex-direction: row;
//     overflow: hidden;

//     .list-element-img {
//       margin-top: 10px;
//       margin-left: 10px;
//       width: 120px;
//       height: 120px;
//       img {
//         width: 116px;
//         height: 116px;
//       }
//     }
//     .add-img {
//       margin-top: 10px;
//       margin-left: 10px;
//       min-width: 120px;
//       height: 120px;
//       background-color: #E0E0E0;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//     }
//   }
// `;
// const ProductDescription = styled.div`
//   display:flex;
//   margin-bottom:50px;
//   .title-wrapper {
//     margin-right:80px;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     .title {
//       width: 150px;
//       height:30px;
//       border-right:10px solid #707070;
//       margin-left: 15px;
//       font-weight: bold;
//       font-size: ${TxtSz.M}px;
//     }
//   }
//   .description-wrapper {

//     padding-top:10px;
//     margin-left: 10px;
//     margin-right: 10px;
//     background-color: white;
//     width:100%;
//     .row {
//       display: flex;
//       flex-direction: row;
//       margin-bottom: 10px;
//       margin-top: 10px;
//       .text {
//         width: 210px;
//         margin-left: 15px;
//       }
//       .input {
//         // display: flex;
//         // flex-direction: row;
//         width:100%;
//       }
//       .dropdown-style {
//         margin: 0;
//         padding: 5px;
//         width: max-content;
//         height: 30px;
//         font-size: 16px;
//         border: 1px solid #EFEFEF;
//         &.giveaspace {
//           margin-left: 15px;
//         }
//       }
//     }
//   }
// `;
// //const ProductPrice = styled.div`
// //  display:flex;
// //  margin-bottom:50px;
// //
// //  .title-wrapper {
// //    margin-right:80px;
// //    padding-top: 20px;
// //    padding-bottom: 20px;
// //    .title {
// //      width: 150px;
// //      height:30px;
// //      border-right:10px solid #707070;
// //      margin-left: 15px;
// //      font-weight: bold;
// //      font-size: ${TxtSz.M}px;
// //    }
// //  }
// //  .price-wrapper {
// //    width:100%;
// //    margin-left: 10px;
// //    margin-right: 10px;
// //    background-color: white;
// //    width:100%;
// //    .option {
// //      display: flex;
// //      flex-direction: row;
// //      margin-bottom: 10px;
// //      margin-top: 10px;
// //      .text {
// //        width: 210px;
// //        margin-left: 15px;
// //      }
// //      .input {
// //        width:100%;
// //      }
// //    }
// //    .button {
// //      border-radius: 5px;
// //      width: 175px;
// //      height: 32px;
// //      line-height: 32px;
// //      text-align: center;
// //      color: white;
// //      cursor: pointer;
// //      background-color: #A0A0A0;
// //    }
// //  }
// //`;

// const ProductDelivery = styled.div`
//   display:flex;
//   margin-bottom:50px;
//   .title-wrapper {
//     margin-right:80px;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     .title {
//       width: 150px;
//       height:30px;
//       border-right:10px solid #707070;
//       margin-left: 15px;
//       font-weight: bold;
//       font-size: ${TxtSz.M}px;
//     }
//   }
//   .delivery-method-wrapper {
//     width:100%;
//     margin-left: 10px;
//     margin-right: 10px;
//     background-color: white; 
//     .option {
//       display: flex;
//       flex-direction: row;
//       margin-bottom: 10px;
//       margin-top: 10px;
//       .text {
//         width: 210px;
//         margin-left: 15px;
//       }
//       .input {
//         width:100%;
//       }
//     }
//   }
// `;

// //const TextBox = styled.textarea`
// //  width:300px;
// //  height:100px;
// //  border:1px solid #EFEFEF;
// //`
// //const InputStyle = styled.input.attrs({ type: 'text' })`
// //   width: ${props => props.width || 200}px;
// //   height: ${props => props.height || 30}px;
// //   border: 1px solid #EFEFEF;
// //   padding: 10px;
// //`;

// class CreateProductForm extends Component {
//   constructor(props) {

//     super(props);

//     this.state = {
//       selectCategory: -1,
//       openCreateOption: false,
//       loading: false,
//       imgs: [], cate1: null, cate2: null,
//       is_custom: false
//     };

//     this.handleImageChange = this.handleImageChange.bind(this);
//     this.onSelectCategory = this.onSelectCategory.bind(this);
//   };
//   async handleImageChange(event) {
//     if (event.target.files.length <= 0) return;
//     let imgs = this.state.imgs;
//     const file = event.target.files[0];
//     const filename = file.name.replace(/\s/g, '');
//     await imgs.push({ src: URL.createObjectURL(file), value: await this.readFile(file), name: filename, key: "thumbnail[]" });
//     await this.setState({ imgs: imgs });
//     await console.log(this.state.imgs);
//   };
//   readFile = (inputFile) => {
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onerror = () => {
//         reader.abort();
//         reject(new DOMException("Problem parsing input file."));
//       };
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(inputFile);
//     });
//   };
//   onClickCreateOption = () => {
//     this.setState({ openCreateOption: true });
//   };
//   onCloseCreateOption = () => {
//     this.setState({ openCreateOption: false });
//   };
//   onChangeValue = async data => {
//     let obj = {};
//     if (data.target) {
//       obj[data.target.name] = data;
//     }
//     await this.setState(obj);
//   };

//   liveCheck = (target) => {
//     FormControl(this.state[target]);
//   };

//   onSelectCategory(value) {
//     this.setState({
//       selectCategory: value
//     });
//   }

//   onSubmit = async e => {
//     e.preventDefault();
//     this.state.member.value = JSON.stringify(this.state.member.value);
//     ValidationGroup(this.state, false).then(data => {
//       console.log("성공", data);
//       this.props.setLoader();
//       this.props.CreateDesignRequest(data, this.props.token)
//         .then(res => {
//           if (res.success) {
//             this.props.history.push(`/designDetail/${res.design_id}`);
//           } else {
//             alert("다시 시도해주세요");
//             this.state.member.value = JSON.parse(this.state.member.value);
//             this.props.setLoader();
//           }
//         });
//     }).catch(e => {
//       console.log("실패", e);
//       this.state.member.value = JSON.parse(this.state.member.value);
//     });
//   };

//   getMember = data => {
//     this.props.SearchMemberRequest(null, { key: data }, this.props.token);
//   }

//   render() {
//     const { imgs } = this.state;

//     const SectionDevelivery = () => {
//       return (
//         <ProductDelivery>
//           <div className="title-wrapper">
//             <div className="title">배송</div></div>
//           <div className="delivery-method-wrapper">
//             <div className="option">
//               <div className="text">배송기간</div>
//               <div className="input">
//                 <FormInput name="delivery_days" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
//             <div className="option">
//               <div className="text">배송업체</div>
//               <div className="input">
//                 <FormInput name="delivery_company" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
//             <div className="option">
//               <div className="text">배송비</div>
//               <div className="input">
//                 <FormInput name="delivery_cost" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
//           </div>
//         </ProductDelivery>
//       );
//     }

//     const SectionDescription = () => {
//       return (
//         <ProductDescription>
//           <div className="title-wrapper">
//             <div className="title">설명</div></div>
//           <div className="description-wrapper">

//             <div className="row">
//               <div className="text">상품 이름</div>
//               <div className="input">
//                 <FormInput name="name" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
//             </div>
//             <div className="row">
//               <div className="text">상품 설명</div>
//               <div className="input">
//                 <FormTextArea name="description" placeholder="상품 설명을 입력해주세요" />
//               </div>
//             </div>



//             {this.state.selectCategory === 1 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option} /></div></div> : null}
//             {this.state.selectCategory === 2 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option} /></div></div> : null}
//             {this.state.selectCategory === 3 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option} /></div></div> : null}
//             {this.state.selectCategory === 4 ? <div className="row"><div className="text">유형</div><div className="input"><FormDropBox options={patent_option} /></div></div> : null}

//             <div className="row">
//               <div className="text">태그</div>
//               <div className="input">
//                 <FormTag placeholder="상품 태그를 입력해주세요(한글10자이내 영문 20자이내)" /></div>
//             </div>
//           </div>
//         </ProductDescription >
//       );
//     }

//     //    const SectionPrice = () => {
//     //      return (
//     //        <ProductPrice>
//     //          <div className="title-wrapper"><div className="title">가격</div></div>
//     //          <div className="price-wrapper">
//     //            <div className="option">
//     //              <div className="text">가격</div>
//     //              <div className="input"><FormInput name="price" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
//     //            <div className="option">
//     //              <div className="text">재고</div>
//     //              <div className="input"><FormInput name="amount" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
//     //            <div className="option">
//     //              <div className="text">옵션</div>
//     //              <div className="input"><div className="button" onClick={this.onClickCreateOption}>옵션정보등록</div>
//     //              </div>
//     //            </div>
//     //          </div>
//     //        </ProductPrice>
//     //      );
//     //    }

//     return (
//       <React.Fragment>
//         <CreateOption handleSetOptions={this.handleSetOptions} closeOption={this.onCloseCreateOption} open={this.state.openCreateOption} />
//         {/* <form onSubmit={this.onSubmit}> */}
//         <FromFieldCard>
//           <ProductImage>
//             <div className="title-wrapper">
//               <div className="title">이미지</div>
//               {/* <div className="text">판매 상품의 이미지를 업로드 해주세요. 최대 5장까지 업로드 가능합니다.</div> */}
//             </div>
//             <div className="img-list-wrapper">
//               {imgs.length > 0 ?
//                 imgs.map(img =>
//                   <div key={img.src + "image-list"} className="list-element-img">
//                     <img alt="" src={img.src || noimg} /></div>)
//                 : null}
//               {imgs.length < MAX_PRODUCT_IMAGE_COUNT ?
//                 <div className="add-img" >
//                   <label htmlFor="file" >
//                     <img alt="" src={newimg} />
//                   </label>
//                   <input hidden onChange={this.handleImageChange} id="file" type="file" />
//                 </div> : null}
//             </div>
//           </ProductImage>
//           <ProductDescription>
//             <div className="title-wrapper">
//               <div className="title">종류</div></div>
//             <div className="description-wrapper">
//               <div className="row">
//                 <div className="text">카테고리</div>
//                 <div className="input">
//                   <FormDropBox onChangeValue={this.onSelectCategory} options={newCategory} />
//                 </div>
//               </div>
//             </div>
//           </ProductDescription>
//           {this.state.selectCategory !== -1 ? <SectionDescription /> : null}
//           {this.state.selectCategory === 8 ? <SectionDevelivery /> : null}


//         </FromFieldCard>
//         <Button type="submit">등록</Button>
//         {/* </form> */}
//       </React.Fragment>
//     );
//   }
// }

// export default CreateProductForm;

// // import React, { Component } from "react";
// // import styled from "styled-components";
// // import noimg from "source/noimg.png";
// // import newimg from "source/new-img.png";
// // import Button from "components/Commons/Button";
// // import { FormControl, ValidationGroup } from "modules/FormControl";
// // import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
// // import CreateOption from "components/Products/CreateProductForm/CreateOption/CreateOption";

// // const TxtSz = { s: 12, m: 16, M: 20, l: 24, b: 28 };
// // const MAX_PRODUCT_IMAGE_COUNT = 5;

// // const FromFieldCard = styled.div`
// //   width: 100%;
// //   background-color: white;
// //   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
// //   padding: 70px;
// //   margin-bottom: 30px;
// //   border-radius: 3px;
// //   @media only screen and (min-width: 1200px) {
// //     padding: 70px 100px 70px 100px;
// //   }
// //   & .field label {
// //     margin: 0 0 0.8rem 0;
// //     display: block;
// //     color: rgba(0,0,0,.87);
// //     font-size: .92857143em;
// //     font-weight: 700;
// //     text-transform: none;
// //   }
// // `;
// // const ProductImage = styled.div`
// //   display:flex;
// //   margin-bottom:50px;
// //   .title-wrapper {
// //     padding-top: 20px;
// //     padding-bottom: 20px;
// //     margin-right:80px;
// //     display: flex;
// //     flex-direction: row;
// //     .title {
// //       width: 150px;
// //       height:30px;
// //       border-right:10px solid #707070;
// //       margin-left: 15px;
// //       font-weight: bold;
// //       font-size: ${TxtSz.M}px;
// //     }
// //     .text {
// //       width: max-content;
// //       margin-left: 25px;
// //       font-weight: light;
// //       font-size: ${TxtSz.s}px;
// //       color: #707070;
// //     }
// //   }
// //   .img-list-wrapper {
// //     padding-top: 10px;
// //     padding-bottom: 10px;
// //     margin-left: 10px;
// //     margin-right: 10px;
// //     height: 180px;
// //     background-color: white;
// //     display: flex;
// //     flex-direction: row;
// //     overflow: hidden;

// //     .list-element-img {
// //       margin-top: 10px;
// //       margin-left: 10px;
// //       width: 120px;
// //       height: 120px;
// //       img {
// //         width: 116px;
// //         height: 116px;
// //       }
// //     }
// //     .add-img {
// //       margin-top: 10px;
// //       margin-left: 10px;
// //       min-width: 120px;
// //       height: 120px;
// //       background-color: #E0E0E0;
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       cursor: pointer;
// //     }
// //   }
// // `;
// // const ProductDescription = styled.div`
// //   display:flex;
// //   margin-bottom:50px;

// //   .title-wrapper {
// //     margin-right:80px;
// //     padding-top: 20px;
// //     padding-bottom: 20px;
// //     .title {
// //       width: 150px;
// //       height:30px;
// //       border-right:10px solid #707070;
// //       margin-left: 15px;
// //       font-weight: bold;
// //       font-size: ${TxtSz.M}px;
// //     }
// //   }
// //   .description-wrapper {
// //     padding-top:10px;
// //     margin-left: 10px;
// //     margin-right: 10px;
// //     background-color: white;
// //     .row {
// //       display: flex;
// //       flex-direction: row;
// //       padding-top: 5px;
// //       padding-bottom: 10px;
// //       .text {
// //         width: 210px;
// //         margin-left: 15px;
// //       }
// //       .input {
// //         display: flex;
// //         flex-direction: row;
// //       }
// //       .dropdown-style {
// //         margin: 0;
// //         padding: 5px;
// //         width: max-content;
// //         height: 30px;
// //         font-size: 16px;
// //         border: 1px solid #EFEFEF;
// //         &.giveaspace {
// //           margin-left: 15px;
// //         }
// //       }
// //     }
// //   }
// // `;
// // const ProductPrice = styled.div`
// //   display:flex;
// //   margin-bottom:50px;

// //   .title-wrapper {
// //     margin-right:80px;
// //     padding-top: 20px;
// //     padding-bottom: 20px;
// //     .title {
// //       width: 150px;
// //       height:30px;
// //       border-right:10px solid #707070;
// //       margin-left: 15px;
// //       font-weight: bold;
// //       font-size: ${TxtSz.M}px;
// //     }
// //   }
// //   .price-wrapper {
// //     margin-left: 10px;
// //     margin-right: 10px;
// //     background-color: white;

// //     .option {
// //       display: flex;
// //       flex-direction: row;
// //       margin-bottom: 10px;
// //       margin-top: 10px;
// //       .text {
// //         width: 210px;
// //         margin-left: 15px;
// //       }
// //       .input {
// //         ;
// //       }
// //     }
// //     .button {
// //       border-radius: 5px;
// //       margin-left: auto;
// //       margin-right: 25px;
// //       width: 175px;
// //       height: 32px;
// //       line-height: 32px;
// //       text-align: center;
// //       color: white;
// //       cursor: pointer;
// //       background-color: #A0A0A0;
// //     }
// //   }
// // `;
// // const ProductDelivery = styled.div`
// //   display:flex;
// //   margin-bottom:50px;
// //   .title-wrapper {
// //     margin-right:80px;
// //     padding-top: 20px;
// //     padding-bottom: 20px;
// //     .title {
// //       width: 150px;
// //       height:30px;
// //       border-right:10px solid #707070;
// //       margin-left: 15px;
// //       font-weight: bold;
// //       font-size: ${TxtSz.M}px;
// //     }
// //   }
// //   .delivery-method-wrapper {
// //     margin-left: 10px;
// //     margin-right: 10px;
// //     margin-bottom: 10px;
// //     background-color: white;

// //     .option {
// //       display: flex;
// //       flex-direction: row;
// //       margin-bottom: 10px;
// //       margin-top: 10px;
// //       .text {
// //         width: 210px;
// //         margin-left: 15px;
// //       }
// //       .input {
// //         ;
// //       }
// //     }
// //   }
// // `;
// // const TextBox = styled.textarea`
// //   width:300px;
// //   height:100px;
// //   border:1px solid #EFEFEF;
// // `;
// // const InputStyle = styled.input.attrs({ type: 'text' })`

// //    width: ${props => props.width || 200}px;
// //    height: ${props => props.height || 30}px;
// //    border: 1px solid #EFEFEF;
// //    padding: 10px;
// // `;

// // class CreateProductForm extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { openCreateOption: false, loading: false, imgs: [], cate1: null, cate2: null, category: [], is_custom: false };
// //     this.handleImageChange = this.handleImageChange.bind(this);
// //   };
// //   async handleImageChange(event) {
// //     if (event.target.files.length <= 0) return;
// //     let imgs = this.state.imgs;
// //     const file = event.target.files[0];
// //     const filename = file.name.replace(/\s/g, '');
// //     await imgs.push({ src: URL.createObjectURL(file), value: await this.readFile(file), name: filename, key: "thumbnail[]" });
// //     await this.setState({ imgs: imgs });
// //     // await console.log(this.state.imgs);
// //   };
// //   readFile = (inputFile) => {
// //     const reader = new FileReader();
// //     return new Promise((resolve, reject) => {
// //       reader.onerror = () => {
// //         reader.abort();
// //         reject(new DOMException("Problem parsing input file."));
// //       };
// //       reader.onload = () => {
// //         resolve(reader.result);
// //       };
// //       reader.readAsDataURL(inputFile);
// //     });
// //   };
// //   onClickCreateOption = () => {
// //     this.setState({ openCreateOption: true });
// //   };
// //   onCloseCreateOption = () => {
// //     this.setState({ openCreateOption: false });
// //   };
// //   onChangeValue = async data => {
// //     let obj = {};
// //     if (data.target) {
// //       obj[data.target.name] = data;
// //     }
// //     await this.setState(obj);
// //   };
// //   liveCheck = (target) => {
// //     FormControl(this.state[target]);
// //   };
// //   onSubmit = async e => {
// //     e.preventDefault();
// //     this.state.member.value = JSON.stringify(this.state.member.value);
// //     ValidationGroup(this.state, false).then(data => {
// //       console.log("성공", data);
// //       this.props.setLoader();
// //       this.props.CreateDesignRequest(data, this.props.token)
// //         .then(res => {
// //           if (res.success) {
// //             this.props.history.push(`/designDetail/${res.design_id}`);
// //           } else {
// //             alert("다시 시도해주세요");
// //             this.state.member.value = JSON.parse(this.state.member.value);
// //             this.props.setLoader();
// //           }
// //         });
// //     }).catch(e => {
// //       console.log("실패", e);
// //       this.state.member.value = JSON.parse(this.state.member.value);
// //     });
// //   };
// //   getMember = data => {
// //     this.props.SearchMemberRequest(null, { key: data }, this.props.token);
// //   };
// //   handleCate1 = (_, { value: v }) => {
// //     _.preventDefault();
// //     const category = [...this.props.category2[v]];
// //     this.setState({ cate1: v, category: category });
// //   };
// //   handleCate2 = (_, { value: v }) => {
// //     _.preventDefault();
// //     this.setState({ cate2: v });
// //   };

// //   render() {
// //     const { imgs, loading, category } = this.state; // const { category } = this.props;
// //     return (
// //       <React.Fragment>
// //         <CreateOption handleSetOptions={this.handleSetOptions} closeOption={this.onCloseCreateOption} open={this.state.openCreateOption} />
// //         <form onSubmit={this.onSubmit}>
// //           <FromFieldCard>
// //             <ProductImage>
// //               <div className="title-wrapper">
// //                 <div className="title">상품 이미지</div>
// //                 {/* <div className="text">판매 상품의 이미지를 업로드 해주세요. 최대 5장까지 업로드 가능합니다.</div> */}
// //               </div>
// //               <div className="img-list-wrapper">
// //                 {imgs.length > 0 ?
// //                   imgs.map(img =>
// //                     <div key={img.src + "image-list"} className="list-element-img">
// //                       <img alt="" src={img.src || noimg} /></div>)
// //                   : null}
// //                 {imgs.length < MAX_PRODUCT_IMAGE_COUNT ?
// //                   <div className="add-img" >
// //                     <label htmlFor="file" >
// //                       <img alt="" src={newimg} />
// //                     </label>
// //                     <input hidden onChange={this.handleImageChange} id="file" type="file" />
// //                   </div> : null}
// //               </div>
// //             </ProductImage>

// //             <ProductDescription>
// //               <div className="title-wrapper">
// //                 <div className="title">상품설명</div></div>
// //               <div className="description-wrapper">
// //                 <div className="row">
// //                   <div className="text">카테고리</div>
// //                   <div className="input">
// //                     <Dropdown
// //                       className="dropdown-style"
// //                       placeholder={"카테고리를 선택해주세요."}
// //                       onChange={this.handleCate1}
// //                       options={this.props.category1 || [{ key: "all", value: "all", text: "전체" },]} />
// //                     {this.state.cate1 ?
// //                       <Dropdown
// //                         className="dropdown-style giveaspace"
// //                         placeholder={"세부 카테고리를 선택해주세요."}
// //                         onChange={this.handleCate2}
// //                         options={this.state.category || [{ key: "all", value: "all", text: "전체" },]} /> : null}
// //                   </div>
// //                 </div>
// //                 <div className="row">
// //                   <div className="text">상품 이름</div>
// //                   <div className="input"><InputStyle width="300" name="name" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
// //                 </div>
// //                 <div className="row">
// //                   <div className="text">상품 설명</div>
// //                   <div className="input"><TextBox /></div>
// //                 </div>
// //                 <div className="row">
// //                   <div className="text">태그</div>
// //                   <div className="input"><InputStyle name="tag" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div>
// //                 </div>
// //               </div>
// //             </ProductDescription >

// //             <ProductPrice>
// //               <div className="title-wrapper"><div className="title">가격</div></div>
// //               <div className="price-wrapper">
// //                 <div className="option">
// //                   <div className="text">가격</div>
// //                   <div className="input"><InputStyle name="price" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
// //                 <div className="option">
// //                   <div className="text">재고</div>
// //                   <div className="input"><InputStyle name="amount" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
// //                 <div className="option">
// //                   <div className="text">옵션</div>
// //                   <div className="input"><div className="button" onClick={this.onClickCreateOption}>옵션정보등록</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </ProductPrice>

// //             <ProductDelivery>
// //               <div className="title-wrapper">
// //                 <div className="title">배송</div></div>
// //               <div className="delivery-method-wrapper">
// //                 <div className="option">
// //                   <div className="text">배송기간</div>
// //                   <div className="input">
// //                     <InputStyle name="delivery_days" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
// //                 <div className="option">
// //                   <div className="text">배송업체</div>
// //                   <div className="input">
// //                     <InputStyle name="delivery_company" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
// //                 <div className="option">
// //                   <div className="text">배송비</div>
// //                   <div className="input">
// //                     <InputStyle name="delivery_cost" onChange={this.handleChange} placeholder="내용을 입력해주세요" /></div></div>
// //               </div>
// //             </ProductDelivery>

// //           </FromFieldCard>
// //           <Button type="submit">등록</Button>
// //         </form>
// //       </React.Fragment>
// //     );
// //   }
// // }

// // export default CreateProductForm;
