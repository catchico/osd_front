import React, { Component } from "react";
import { Modal, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import { FormInput } from "components/Commons/FormItems";
import { FormControl, ValidationGroup } from "modules/FormControl"
import SignUpModal from "./SignUpModal"
import StyleGuide from "StyleGuide"
import FooterPara from "components/Commons/FooterTerm/FooterPara";

const MainBox = styled.div`
  *{
    font-family:Noto Sans KR,Medium;
    color:#060000;
  }

  width:933px;
  height:748px;
  padding:32px;
  display:flex;
  justify-content:center;
  align-items:center;

  .contentsBox{
    width:498px;
    height:100%;
    display:flex;
    flex-direction:column;

    .titleBox{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      .title{
        font-size:20px;
        font-weight:500;
      }
    }
    
    .row{
      *{
        font-size:15px;
      }
      display:flex;
      height:43px;
      margin-bottom:19px;
      .label{
        min-width:104px;
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .red_text{
        color:red;
      }
    }
    .row2{
      *{
        font-family:Noto Sans KR,Light
      }
      width:100%;
      height:29px;
      display:flex;
      .label2{
        min-width:104px;
        height:100%;
        font-weight:200;
      }
      .content2{
        display:flex;
      }
      .red_text{
        color:red;
      }
    }
    .paddingTop{
      padding-top:5px;
    }
    .spaceBetween{
      justify-content:space-between;
    }

  }
`
const CustomButton = styled.div`
    width:${props=>props.width}px;
    height:${props=>props.height}px;
    border:1px solid ${props=>props.borderColor};
    border-radius:${props=>props.borderRadius}px;
    background-color:${props=>props.bgColor};
    color:${props=>props.fontColor};
    margin-top:26px;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:1;
    cursor:pointer;
    &:hover{
      opacity:0.7;
    }

  `
const CustomBox = styled.div`
  width:${props=>props.width==null?100:props.width}%;
  height:${props=>props.height==null?100:props.height}%;
  display:flex;
  margin-top:${props=>props.marginTop == null?0:props.marginTop}px;
  margin-bottom:${props=>props.marginBottom == null?0:props.marginBottom}px;
  margin-left:${props=>props.marginLeft == null?0:props.marginLeft}px;
  margin-right:${props=>props.marginRight == null?0:props.marginRight}px;
`
const CheckBox = styled.div`
  width:17px;
  height:17px;
  border:0.5px solid #707070;
  margin-right:11px;
`
const InputTextBox = styled.input.attrs({type:'text'})`
  border:none;
  width:100%;
  height:100%;
  padding-left:20px;
  background-color:#E9E9E9;
  border-radius:21px;
  display:flex;
  justify-content:center;
  outline:none;
  
  color:#060000;
`

class SignUpForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      email:"",password:"",passwordCheck:"",name:"",phone:"",
    }
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordCheck = this.onChangePasswordCheck.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onSubmit = async e => {
    e.preventDefault();
    const data = {email:this.state.email,password:this.state.password,nick_name:this.state.name};
  
      this.props.SignUpRequest(data).then(res => {
        if (res.type === "AUTH_SIGNUP_SUCCESS") {
          this.setState({ success: true });
          window.location.href="/";
        } else {
          alert("다시 시도해주세요")
        }
      }).catch(e => {
        console.log("실패", e);
      });
    }
  onChangeID(event){
    this.setState({email:event.target.value});
  }
  onChangePassword(event){
    this.setState({password:event.target.value});
  }
  onChangePasswordCheck(event){
    this.setState({passwordCheck:event.target.value});
  }
  onChangeName(event){
    this.setState({name:event.target.value});
  }
  onChangePhone(event){
    this.setState({phone:event.target.value});
  }
  render() {
    console.log(this.state.agree)
    return (
      <React.Fragment>
            <MainBox>
              <div className="contentsBox">
                <div className="titleBox"><div className="title">회원 가입</div></div>
                  <CustomBox height={8}/>
                  <div className="row">
                    <div className="label"><div>아이디</div></div>
                    <InputTextBox 
                    placeholder="아이디를 입력하세요."
                    value = {this.state.email}
                    onChange={this.onChangeID}/>
                  </div> 
                  <div className="row">
                    <div className="label"><div>비밀번호</div></div>
                    <InputTextBox 
                    value = {this.state.password}
                    placeholder="비밀번호를 입력하세요."
                    onChange={this.onChangePassword}/>
                  </div> 
                  <div className="row">
                    <div className="label"><div>비밀번호 확인</div></div>
                    <InputTextBox 
                    value = {this.state.passwordCheck}
                    placeholder="비밀번호를 한번 더 입력하세요."
                    onChange={this.onChangePasswordCheck}/>
                  </div> 
                  <div className="row">
                    <div className="label"><div>이름</div></div>
                    <InputTextBox 
                    value = {this.state.name}
                    placeholder="이름을 입력하세요."
                    onChange={this.onChangeName}/>
                  </div> 
                  <div className="row">
                    <div className="label"><div>휴대폰</div></div>
                    <InputTextBox 
                    value = {this.state.phone}
                    placeholder="휴대폰 번호를 입력하세요."
                    onChange={this.onChangePhone}/>
                  </div> 
                  <CustomBox height={4}/>
                  <div className="row">
                    <div className="label"><div className="red_text">이용약관</div></div>
                    <div className="label"><CheckBox/>전체동의</div>
                  </div> 
                  <div className="row2">
                    <div className="label2"/>
                    <div className="content2"><CheckBox/>이용약관 (필수)</div>
                  </div>
                  <div className="row2">
                    <div className="label2"/>
                    <div className="content2"><CheckBox/>개인정보 수집 및 이용 (필수)</div>
                  </div>
                  <div className="row2">
                    <div className="label2"/>
                    <div className="content2"><CheckBox/>개인정보 수집 및 이용&nbsp;<div className="red_text">(선택)</div></div>
                  </div>

                  <CustomButton onClick={this.onSubmit}
                  width={498} 
                  height={43} 
                  bgColor={"#FF0000"} 
                  borderRadius={21} 
                  fontColor={"white"}>가입하기</CustomButton>
              </div>
            </MainBox>
      </React.Fragment>
    )
  }
}
export default SignUpForm

// state = {
//   SignUpData: { email: null, nick_name: null },
//   agree: false, openTerm: false, error: null, success: false
// }

// onChangeValue = async data => {
//   let obj = {};
//   if (data.target) {
//     console.log(obj, data.target.name, data)
//     obj[data.target.name] = data
//   }
//   await this.setState(obj)
//   console.log(this.state)
// }

// liveCheck = (target) => {
//   FormControl(this.state[target])
// }

// samePwCheck = () => {
//   FormControl({
//     value: [this.state.password.value, this.state.password2.value],
//     target: this.state.password2.target,
//     validates: this.state.password2.validates
//   })
// }
// onSubmit = async e => {
//   e.preventDefault();
//   let formData = this.state;
//   var reg_pw = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*<>?])/;
//   if (!reg_pw.test(formData.password.value) || formData.password.value.length < 6 || formData.password.value.length > 15) {
//     alert("비밀번호는 6자~15자 이내로 영문, 숫자, 특수문자를 모두 조합하여 작성해 주십시오");
//     return false;
//   }

//   if (formData.password.value !== formData.password2.value) {
//     alert("비밀번호 확인을 다시 해주십시오");
//     return false;
//   }

//   if (!this.state.agree) {
//     alert("이용약관에 동의해주십시오");
//     return false;
//   }

//   delete formData.password2;

//   ValidationGroup(formData, true).then(data => {
//     this.props.SignUpRequest(data).then(res => {
//       if (res.type === "AUTH_SIGNUP_SUCCESS") {
//         this.setState({ success: true });
//       } else {
//         alert("다시 시도해주세요")
//       }
//     })
//   }).catch(e => {
//     console.log("실패", e);
//   })
// }
// openTermModal = () => { this.setState({ openTerm: true }) }
// checkAgree = async () => {
//   let obj = this.refs.use_agreement
//   obj.checked = true
//   await this.setState({ openTerm: false, agree: true })
// }
// preventClick = () => {
//   if (this.state.agree === false) {
//     alert("`이용약관 보기`를 통해 동의하실 수 있습니다")
//     this.refs.use_agreement.checked = false
//   }
// }
// onCloseTerm = () => { this.setState({ openTerm: false }) }

//  <div>
//         <form onSubmit={this.onSubmit}>
//           {this.state.success === true && <SignUpModal history={this.props.history} />}

//           <Label>Email</Label>
//           <FormInput
//             name="email"
//             placeholder="email을 입력해주세요."
//             getValue={this.onChangeValue}
//             validates={["Required", "IsEmail", "CheckEmail"]}
//             onBlur={() => { this.liveCheck("email") }}
//           />
//           <Label>닉네임</Label>
//           <FormInput
//             name="nick_name"
//             maxLength="20"
//             placeholder="닉네임을 입력해주세요."
//             getValue={this.onChangeValue}
//             validates={["Required", "NotSpecialCharacters", "CheckNickName"]}
//             onBlur={() => { this.liveCheck("nick_name") }}
//           />
//           <Label>Password</Label>
//           <FormInput
//             name="password"
//             type="password"
//             placeholder="비밀번호를 입력해주세요."
//             getValue={this.onChangeValue}
//             validates={["Required", "NotBlank"]}
//             onBlur={() => { this.liveCheck("password") }}
//           />
//           <Label>Password 확인</Label>
//           <FormInput
//             name="password2"
//             type="password"
//             placeholder="비밀번호를 다시 한번 입력해주세요."
//             getValue={this.onChangeValue}
//             validates={["SamePassword"]}
//             onBlur={this.samePwCheck}
//           />

//           <Label>휴대폰 번호</Label>
//           <div style={{display:"flex"}}>
//           <FormInput
//             name="phone"
//             type="phone"
//             placeholder="휴대폰 번호를 입력해주세요."
//             getValue={this.onChangeValue}
//             // validates={["SamePassword"]}
//             // onBlur={this.samePwCheck}
//           />
//           <button style={{height:"40px",marginLeft:"10px",borderRadius:"5px"}}>휴대폰 인증</button>
//           </div>

//           <Label>이용약관 동의 확인</Label>
//           <Labellink><div style={{ cursor: "pointer" }} onClick={this.openTermModal}>이용약관 보기</div></Labellink>
//           <label><input disabled ref="use_agreement" value={this.state.agree} onClick={this.preventClick} type="checkbox" /> 이용약관에 동의함</label>
//           <ButtonBox>
//             <SignUpBtn type="submit" round={true} fluid={true}> 회원가입 </SignUpBtn>
//           </ButtonBox>
//         </form>
//         {this.state.openTerm && (
//           <CustomModal open={this.state.openTerm} onClose={this.onCloseTerm}>
//             <Modal.Content>
//               <Icon name="close" size="big" onClick={this.onCloseTerm} />
//               <div style={{ overflowY: "scroll", overflowX: "hidden", height: "450px", width: "100%" }}>
//                 <FooterPara style={{ backgroundColor: "#EEE" }} />
//               </div>
//               <div style={{ paddingTop: "5px", display: "flex", justifyContent: "right" }}>
//                 <Button onClick={this.checkAgree}>동의</Button>
//               </div>
//             </Modal.Content>
//           </CustomModal>
//         )}
//       </div>
