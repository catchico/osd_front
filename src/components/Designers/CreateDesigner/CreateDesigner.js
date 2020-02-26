import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import noimg from "source/noimg.png";

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

`;
const RedButton = styled.div`
  width: 290px;
  height: 70px;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.gray ? "#EFEFEF" : "red"};
  // position: absolute;
  // left: ${props => props.left};
  // bottom: ${props => props.bottom};
  cursor: pointer;
`;
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:562px;
  height:540px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:42px;
  padding-top:54px;
  margin-right:63px;
  .label{
    width:100%;
    height:29px;
  }
  .thumbnail{
    cursor:pointer;
    width:256px;
    height:256px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#E9E9E9;
    border-radius:50%;
    margin-left:110px;
  }
`;
const Thumbnail = styled.div`
  cursor:pointer;
  width:256px;
  height:256px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  border-radius:50%;
  margin-left:110px;
`;
const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-top:49px;

  .wrapper{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:70px;
  }
  .wrapper_noflex{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .margin_bottom{
    margin-bottom:30px;
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
    cursor:pointer;
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
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`;

class CreateDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getready: false,
      thumbnail: null, thumbnail_name: null,
      category_level1: 0, category_level2: -1, location: "",
      explain: "", tag: [],
      career: [{ number: 0, task: "", explain: "", during: "" }],
    }
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  async onChangeCareer(number, task, explain, during) {
    let arr = this.state.career.slice();
    await arr.splice(number, 1, { number: number, task: task, explain: explain, during: during });
    this.setState({
      career: arr,
    })
  }
  onClickAddCareer(event) {
    this.setState({
      career: this.state.career.concat({ number: this.state.career.length, task: "", explain: "", during: "" }),
    })
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value })
  }
  onChangeLocation(event) {
    this.setState({ location: event.target.value });
  }
  handleAddTag(tag) {
    this.setState({
      tag: tag.slice(),
    });
  }

  async handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      await reader.readAsDataURL(file);
    }
  }

  onSubmit = async e => {

    e.preventDefault();
    let experienceList = "";
    this.state.career.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
      return (
        experienceList += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
      );
    })
    const data = {
      files: [],
      user_id: this.props.userInfo.uid,
      // thumbnail:this.state.thumbnail,
      type: "designer",
      description: this.state.explain,
      location: this.state.location,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: this.state.tag.join(","),
      experience: experienceList,
    }
    let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
    await data.files.push(file);
    console.log(data);


    if (this.state.thumbnail != null || this.state.thumbnail != "") {
      await data.files.push(file);
    }
    // if (data.files.length <= 0 || data.files[0].value === (this.props.MyDetail.profileImg&&this.props.MyDetail.profileImg.m_img)) {
    //   delete data.files;
    // }
    this.props.InsertDesignerDetailRequest(data, this.props.token)
      .then(res => {
        console.log("res", res.res);
        const result = res.res;
        if (result.success) {
          alert("정보가 수정되었습니다.");
          //this.props.history.push(`/`);
          // window.location.href = "/designer";
        } else {
          alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      })
      .then(
        this.props.CreateDesignRequest(this.props.keep.item, this.props.token)
          .then(result => {
            if (result.success) {
              alert("아이템이 등록되었습니다.");
              console.log("result", result);
              window.location.href = `/mypage`;
            } else {
              alert("아이템 등록에 실패했습니다.");
            }
          })
      )
      .catch(e => {
        console.log("실패", e);
        alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
    // window.location.href = "/myPage"

  };

  componentDidMount() {
    if (this.props.keep) {
      this.setState(this.props.keep.designer);
      this.setState({ getready: true });
    }
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    console.log("category:", category1, this.state.category_level1, category2, this.props.category2);

    return (
      <React.Fragment>
        {this.props.keep ? "redirected" : null}

        <MainBox>
          <div className="title">디자이너 등록하기</div>
          <div className="contentsBox">
            <ThumbnailBox>
              <div className="label">썸네일 등록</div>
              <Margin height={70} />
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
              <label htmlFor="file">
                {this.state.thumbnail == null ?
                  <div className="thumbnail"><div>첨부하기</div></div>
                  :
                  <Thumbnail imageURL={this.state.thumbnail} />
                }
              </label>
            </ThumbnailBox>

            <FormBox>
              <div className="wrapper flex">
                <div className="label">카테고리</div>
                <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
              </div>

              <div className="wrapper flex">
                <div className="label">설명</div>
                <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" width={483} height={99} />
              </div>

              <div className="wrapper flex">
                <div className="label">태그</div>
                <div>
                  <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={483} />
                </div>
              </div>

              <div className="wrapper flex">
                <div className="label">거주지역</div>
                <InputText value={this.props.location} onChange={this.onChangeLocation} width={483} placeholder="국가 또는 도시를 입력하세요" />
              </div>

              <div className="wrapper_noflex ">
                {this.state.career.map((item, index) => {
                  console.log("career", item)
                  return (
                    <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} key={index} />
                  );
                })}
                {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
                <Button onClick={this.onSubmit} width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
                  <Icon name="plus" /><div className="label">경력 추가하기</div>
                </Button>
              </div>

            </FormBox>

          </div>

          <div className="contentsBox">
            <Link to={{
              pathname: `/createProduct/redirected`,
              state: { keep: this.state }
            }}>
              <RedButton >아이템 등록하기</RedButton>
            </Link>
          </div>
          <div className="contentsBox">
            {this.state.getready ?
              <RedButton onClick={this.onSubmit} ><div>등록하기</div></RedButton>
              :
              <RedButton onClick={() => alert("아이템을 등록해야 진해할 수 있습니다.")} gray={true}><div>등록하기</div></RedButton>
            }
          </div>
        </MainBox>
      </React.Fragment>
    );
  };
}
export default CreateDesigner;

// 경력 //
class CreateCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "", explain: "", during: "",
    }
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeDuring = this.onChangeDuring.bind(this);
  }
  componentDidMount() {

    this.setState({
      task: this.props.item.task,
      explain: this.props.item.explain,
      during: this.props.item.during,
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        task: this.props.item.task,
        explain: this.props.item.explain,
        during: this.props.item.during,
      })
    }
    return true;
  }
  onChangeTask(event) {
    this.setState({ task: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, event.target.value, this.state.explain, this.state.during);
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, event.target.value, this.state.during);
  }
  onChangeDuring(event) {
    this.setState({ during: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, this.state.explain, event.target.value);
  }


  render() {
    const leadingZeros = (n, digits) => { //0채우는 함수
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    }
    console.log("careerlog", this.state);
    return (
      <div className="wrapper flex margin_bottom ">
        <div className="label">경력</div>
        <div className="index">{leadingZeros(this.props.number, 2)}</div>
        <div>
          <div className="innerWraper">
            <div className="label label_centering">업무</div>
            <InputText value={this.state.task} onChange={this.onChangeTask} width={370} />
          </div>
          <div className="innerWraper">
            <div className="label label_centering">내용</div>
            <InputTextarea value={this.state.explain} onChange={this.onChangeExplain} width={370} height={84} />
          </div>
          <div className="innerWraper">
            <div className="label label_centering">기간</div>
            <InputText value={this.state.during} onChange={this.onChangeDuring} width={370} />
          </div>
        </div>
      </div>
    );
  }
}
