import React, { Component } from "react";
import SignInModal from 'components/Header/SignNav/SignInModal'
import { SetSession } from 'modules/Sessions'

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { signin_modal: true, email: "", password: "", findPW: false }
  }
  signin = () => {
    this.closeModal()
    this.setState({ signin_modal: false })
        if (window.location.href.search("SignUp") > -1) {
          alert("?")
          window.history.go(-1)
          .then(window.location.reload())
        }
        else {
          window.history.go(-1)
        }
  }
  closeModal = () => { this.setState({ signin_modal: false }) }
  signout = () => {
    SetSession("opendesign_token", null)
      .then(data => {
        // console.log("data:", data)
        this.props.SignOutRequest()
        this.setState({ sign_modal: false })
        window.location.reload()
      })
    this.setState({ user_popup: null })
  }
  render() {
    return (
      <SignInModal open={this.state.signin_modal} CheckEmailRequest={this.props.CheckEmailRequest} 
      FindPwRequest={this.props.FindPwRequest} signinrequest={this.props.SignInRequest} signin={this.signin} close={this.closeModal} />
      // <form onSubmit={this.onSubmit}>
      // </form>
    );
  }
}

export default SignInForm
