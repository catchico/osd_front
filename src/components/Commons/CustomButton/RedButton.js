import React, { Component } from "react";
import styled from "styled-components";
// import StyleGuide from "StyleGuide";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import { options } from "components/Commons/InputItem/AlertConfirm"
import market_style from "market_style";

const StyleButton = styled.div`
  width:${props => props.width == null ? "290px" : props.width + "px"};
  height:${props => props.height == null ? "70px" : props.height + "px"};
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:${props => props.disabled == false || props.disabled == null ? "red" : "#A0A0A0"};
  border:${props => props.disabled == false || props.disabled == null ? "1px solid red" : "1px solid gray"};
  cursor:pointer;
  margin-right:${props => props.marginRight == null ? "20px" : props.marginRight + "px"};
  .text{
    margin: auto;
    width: max-content;
    text-align: center;
    font: normal normal bold 15px/22px Noto Sans KR;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1
    // color:${props => props.disabled == false || props.disabled == null ? "white" : "white"};
    // font-family:Noto Sans KR;
    // font-weight:400;
    // font-size: ${props => props.fontSize == null ? market_style.font.size.giant2 : props.fontSize + "px"};
  }
  &:hover{
      opacity:90%;
  }
`
export class RedButton extends Component {

    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }
    onClickButton = async event => {
        if (this.props.onClick == null || this.props.disabled) return;
        if (this.props.isConfirm === false) {
            this.props.onClick(event);
        }
        else {
            // await confirmAlert(options(this.props.value + "하시겠습니까?", this.props.onClick, event));

            if (await confirm(this.props.text == null ? this.props.value + "하시겠습니까?" : this.props.text, this.props.okText == null ? "예" : this.props.okText, this.props.cancelText == null ? "아니오" : this.props.cancelText) === false) {
                return;
            } else {
                this.props.onClick(event);
            }
        }
    }

    render() {
        // console.log("disabled:", this.props.disabled);
        return (
            <React.Fragment>
                <StyleButton marginRight={this.props.marginRight} width={this.props.width} height={this.props.height} fontSize={this.props.fontSize} disabled={this.props.disabled} onClick={this.onClickButton}>
                    <div className="text">{this.props.value}</div>
                </StyleButton>
            </React.Fragment>
        );
    }
}