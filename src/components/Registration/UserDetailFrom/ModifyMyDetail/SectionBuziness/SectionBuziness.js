import React, { Component } from "react";
// import { FormControl, ValidationGroup } from "modules/FormControl";
// import SelectBox from "components/Commons/SelectBox"
import CheckBox2 from "components/Commons/CheckBox";

class SectionBuziness extends Component {
  constructor(props) {
    super(props);
    this.state = { isDesigner: false, team: "", career: "", location: "", contact: "" };
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeIsDesigner = this.onChangeIsDesigner.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onFocusNext = this.onFocusNext.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.MyDetail != nextProps.MyDetail) {
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
  isDesignerCheck = () => {
    var checkDiv = document.getElementById("isDesignerCheckbox");
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
      {s
        document.getElementById(arrID[3]).focus();
      }
      
    }
  }
  render() {

    let description = [];
    description[0] = "디자이너로서 디자인과 그룹을 만들고 수정할 수 있으며"
    description[1] = "디자이너 리스트에 올라가게 됩니다."
    description[2] = "추후에 직업에 대한 부가적인 정보를 입력하여 많은 사람들과 소통하게 됩니다."

    console.log("checkbox", this.state.isDesigner);
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-start", paddingLeft: "95.5px" }}>
          <div style={{ fontSize: "20px", color: "#707070", fontWeight: "500" }}>디자이너 활동 여부</div>
          <CheckBox2 id="isDesignerCheckbox" onClick={this.isDesignerCheck} />
          {/* style={{marginLeft:"10px", width:"25px",height:"25px",background: this.state.isDesigner==1?"#FF0000  0% 0% no-repeat padding-box":"#FFFFFF 0% 0% no-repeat padding-box", border: "1px solid #707070", borderRadius: "5px", }} */}
          <div style={{ color: "#FF0000", fontSize: "17px", textAlign: "left", marginLeft: "420px", width: "27px", height: "25px" }}>TIP</div>
        </div>
        <div className="description" style={{ marginTop: "5px", marginLeft: "708px", color: "#707070", fontSize: "17px", fontWeight: "100", width: "540px", height: "75px" }}>{description[0]}<br />{description[1]}<br />{description[2]}</div>

        <div style={{ display: "flex", position: "relative", marginTop: "66px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>팀</div>
          <input  id="team" onKeyDown={this.onFocusNext} onChange={this.onChangeTeam} type="text" value={this.state.team} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "57px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>경력</div>
          <input id="career" onKeyDown={this.onFocusNext}  onChange={this.onChangeCareer} type="text" value={this.state.career} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>위치</div>
          <input id="location" onKeyDown={this.onFocusNext}  onChange={this.onChangeLocation} type="text" value={this.state.location} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>
        <div style={{ display: "flex", position: "relative", marginTop: "46px", justifyContent: "space-start" }}>
          <div style={{ marginLeft: "265px", color: "#707070", fontSize: "20px", opacity: "0.5" }}>연락</div>
          <input id="contact" onChange={this.onChangeContact} onChange={this.onChangeContact} type="text" value={this.state.contact} maxLength="100"
            style={{
              border: "none", outline: "none", fontSize: "20px", fontFamily: "Noto Sans KR", fontWeight: "500",
              paddingLeft: "15px", marginLeft: "37px", opacity: "0.5", width: "505.5px", height: "56px", backgroundColor: "#EFEFEF", borderRadius: "5px"
            }} />
        </div>

      </React.Fragment>
    );
  }
}
export default SectionBuziness;