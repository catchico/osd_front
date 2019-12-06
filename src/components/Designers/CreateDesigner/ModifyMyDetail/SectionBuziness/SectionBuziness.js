import React, { Component } from "react";
import styled from "styled-components";
import CheckBox2 from "components/Commons/CheckBox";

const ContentsBox = styled.div`
    padding-left:47px;
    .title{
        width:100px;
        height:29px;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        text-align:left;
        color:#707070;
    }
    .tipTitle {
      // width: 375px;
      height: 25px;
      text-align:left;
      margin-left: 375px;
      font-size: 17px;
      color: #FF0000;
      text-align: left;
    }

    .tipDescription {
      width: 550px;
      margin-top: 5px;
      margin-left: 608px;
      font-size: 17px;
      font-weight: 200;
      font-family: Noto Sans KR;
      color: #707070;
      line-height: 25px;
    }
    @media only screen and (min-width : 780px) and (max-width:1440px) {
      flex-direction:column;
      .tipTitle {
        margin-top:15px;
        margin-left:0px;
      }
      .tipDescription {
      margin-left:0px;
      }
    }
    @media only screen and (min-width : 360px) and (max-width:780px) {
        flex-direction:column;
        .tipTitle {
          margin-top:15px;
          margin-left:0px;
        }
        .tipDescription {
        margin-left:0px;
        width: 90%;
        }
    }
`;
const IsDesignerBox = styled.div`
display:flex;
flex-direction:row;
.isDesignerText {
  display:flex;
  max-width: 200px;
  min-width:200px;
  font-size: 20px;
  font-weight: 500;
  line-height:29px;
  color: #707070;
}
@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
}


// const CheckBox = styled.input.attrs({ type: 'checkbox' })`
//       width:25px;
//       height:25px;
//       margin-left:10px;
//       background-color:#EFEFEF !important;
//       border:1px solid #707070 !important;
//       border-radius:5px !important;  
// `

const DesignerInfoBox = styled.div`
margin-left: 20px;
.itemBox{
  display: flex;
  position: relative;
  margin-top: 46px;
  .designerInfoTitle{
    min-width: 47px;
    margin-left: 150px;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: left;
    opacity: 0.5;
  }
}

@media only screen and (min-width : 780px) and (max-width:1440px) {   
  .itemBox{
    flex-direction:column;
    .designerInfoTitle{
      margin-left:0px;
      margin-bottom:10px;
    }
  }
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  .itemBox{
    flex-direction:column;
    .designerInfoTitle{
      margin-left:0px;
      margin-bottom:10px;
    }
  }
}
`
const InputText = styled.input.attrs({ type: 'text', maxLength: 100 })`
width: 505px;
height: 56px;
padding-left: 15px;
font-size: 20px;
font-weight: 500;
font-family: Noto Sans KR;
opacity: 0.5;
background-color: #EFEFEF;
border: none;
border-radius: 5px;
outline: none;
@media only screen and (min-width : 780px) and (max-width:1440px) {
  width:505px;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  width:80%
}

`

class SectionBuziness extends Component {
  constructor(props) {
    super(props);
    this.state = { isDesigner: false, team: "", career: "", location: "", contact: "" };
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.isDesignerCheck = this.isDesignerCheck.bind(this);
    this.onFocusNext=this.onFocusNext.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail !== nextProps.MyDetail) {
      this.setState({
        isDesigner: nextProps.MyDetail.is_designer, team: nextProps.MyDetail.team, career: nextProps.MyDetail.career,
        contact: nextProps.MyDetail.contact, location: nextProps.MyDetail.location
      })
      this.props.updateTeam(nextProps.MyDetail.team);
      this.props.updateCareer(nextProps.MyDetail.career);
      this.props.updateIsDesigner(nextProps.MyDetail.is_designer);
      this.props.updateLocation(nextProps.MyDetail.location);
      this.props.updateContact(nextProps.MyDetail.contact);
      
    }
    return true;
  }
  isDesignerCheck() {
    var checkDiv = document.getElementById("designercheckbox");
    if (checkDiv.style.backgroundColor === "rgb(255, 255, 255)") {
      checkDiv.style.backgroundColor = "#FF0000"
    }
    else {
      checkDiv.style.backgroundColor = "#FFFFFF";
    }
    const result = !this.state.isDesigner;
    this.setState({ isDesigner: result });
    this.props.updateIsDesigner(result);
  }
  onChangeIsDesigner(event) {
    this.setState({ isDesigner: event.target.checked });

  }
  onChangeTeam(event) {
    this.setState({ team: event.target.value });
    this.props.updateTeam(event.target.value);
  }
  onChangeCareer(event) {
    this.setState({ career: event.target.value });
    this.props.updateCareer(event.target.value);
  }
  onChangeLocation(event) {
    this.setState({ location: event.target.value });
    this.props.updateLocation(event.target.value);
  }
  onChangeContact(event) {
    this.setState({ contact: event.target.value });
    this.props.updateContact(event.target.value);
  }
  onFocusNext(event)
  {
    const arrID = ["team","career","location","contact"];
    if(event.key=="Enter")
    {
      if(event.target.id == arrID[0])
      {
        document.getElementById(arrID[1]).focus();
      }
      else if(event.target.id == arrID[1])
      {
        document.getElementById(arrID[2]).focus();
      }
      else if(event.target.id == arrID[2])
      {
        document.getElementById(arrID[3]).focus();
      }
      
    }
  }
  render() {

    let description = [];
    description[0] = "디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며"
    description[1] = "디자이너 리스트에 올라가게 됩니다."
    description[2] = "추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다."
    return (
      <ContentsBox>
        <IsDesignerBox>
          <div className="isDesignerText">디자이너 활동 여부</div>
          <CheckBox2 type="checkbox" id="designercheckbox" //className="cuteCheckBox"
            onChange={this.isDesignerCheck} checked={this.state.isDesigner} />
          <div className="tipTitle">TIP</div>
        </IsDesignerBox>
        <div className="tipDescription">
          {description[0]}<br />
          {description[1]}<br />
          {description[2]}</div>
        <DesignerInfoBox>
          <div className="itemBox">
            <div className="designerInfoTitle" >팀</div>
            <InputText id="team" onKeyDown={this.onFocusNext} onChange={this.onChangeTeam} value={this.state.team == null ? "" : this.state.team} />
          </div>
          <div className="itemBox">
            <div className="designerInfoTitle">경력</div>
            <InputText id="career" onKeyDown={this.onFocusNext} onChange={this.onChangeCareer} value={this.state.career == null ? "" : this.state.career} />
          </div>
          <div className="itemBox">
            <div className="designerInfoTitle">위치</div>
            <InputText id="location" onKeyDown={this.onFocusNext} onChange={this.onChangeLocation} value={this.state.location == null ? "" : this.state.location} />
          </div>
          <div className="itemBox">
            <div className="designerInfoTitle">연락</div>
            <InputText id="contact" onChange={this.onChangeContact} value={this.state.contact == null ? "" : this.state.contact} />
          </div>
        </DesignerInfoBox>
      </ContentsBox>
    );
  }
}
export default SectionBuziness;

/* <div style = {{display:"flex", justifyContent:"space-start",paddingLeft:"95.5px"}}>
<div style={{ fontSize:"20px", color:"#707070",fontWeight: "500" }}>디자이너 활동 여부</div>
<checkbox id="designercheckbox" style={{marginLeft:"10px", width:"25px",height:"25px",background: this.state.isDesigner===1?"#FF0000  0% 0% no-repeat padding-box":"#FFFFFF 0% 0% no-repeat padding-box", border: "1px solid #707070", borderRadius: "5px", }}
  onClick={this.isDesignerCheck}/>
  <div style={{color:"#FF0000", fontSize:"17px", textAlign:"left", marginLeft:"420px", width:"27px", height:"25px"}}>TIP</div>
</div>
<div className="description" style={{marginTop:"5px",marginLeft:"708px", color:"#707070", fontSize:"17px", fontWeight: "100", width:"540px", height:"75px"}}>{description[0]}<br />{description[1]}<br />{description[2]}</div>

<div style={{display:"flex",position:"relative",marginTop:"66px" ,justifyContent:"space-start"}}>
    <div style={{marginLeft:"265px", color:"#707070",fontSize:"20px",opacity:"0.5"}}>팀</div>
      <input type="text"onChange = {this.onChangeTeam}  maxLength="100" value={this.state.team==null?"":this.state.team}
      style={{ border:"none", outline:"none",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"500",
       paddingLeft:"15px",marginLeft: "57px",opacity:"0.5" , width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}/>
</div>
<div style={{display:"flex",position:"relative",marginTop:"46px" ,justifyContent:"space-start"}}>
<div style={{marginLeft:"265px", color:"#707070",fontSize:"20px",opacity:"0.5"}}>경력</div>
      <input onChange = {this.onChangeCareer} type="text" maxLength="100" value={this.state.career==null?"":this.state.career}
            style={{ border:"none", outline:"none",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"500",
            paddingLeft:"15px",marginLeft: "37px",opacity:"0.5" , width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}/>
</div>
<div style={{display:"flex",position:"relative",marginTop:"46px" ,justifyContent:"space-start"}}>
<div style={{marginLeft:"265px", color:"#707070",fontSize:"20px",opacity:"0.5"}}>위치</div>
      <input onChange = {this.onChangeLocation} type="text" maxLength="100" value={this.state.location==null?"":this.state.location}
            style={{ border:"none", outline:"none",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"500",
            paddingLeft:"15px",marginLeft: "37px",opacity:"0.5" , width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}/>
</div>
<div style={{display:"flex",position:"relative",marginTop:"46px" ,justifyContent:"space-start"}}>
<div style={{marginLeft:"265px", color:"#707070",fontSize:"20px",opacity:"0.5"}}>연락</div>
      <input onChange = {this.onChangeContact} type="text" maxLength="100" value={this.state.contact==null?"":this.state.contact}
            style={{ border:"none", outline:"none",fontSize:"20px",fontFamily:"Noto Sans KR",fontWeight:"500",
            paddingLeft:"15px",marginLeft: "37px",opacity:"0.5" , width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px" }}/>
</div> */
