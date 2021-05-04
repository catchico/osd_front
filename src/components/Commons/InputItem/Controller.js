import React, { Component } from "react";
import styled from "styled-components";
import { TextControllerClassic as TextController } from "components/Commons/InputItem/TextControllerClassic";
// import { TextControllerPlus as TextController } from "components/Commons/InputItem";
import { FileController } from "components/Commons/InputItem/FileController";
import { ProblemController } from "components/Commons/InputItem/ProblemController";

// import { EmbController } from "components/Commons/InputItem/EmbController";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"

// css styling
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const ControllerWrap = styled.div`
  position: relative;
  &:hover {
    border: 1px dashed #E1E4E6;
    background-color: #F8FAFB;
    .editBtn {
      display: block;
    }
  }
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
//const UpBtn = styled.button`
//  display: none;
//  position: absolute;
//  top: 0;
//  left: 90%;
//  transform: translate(-50%, -50%);
//  border: 0;
//  padding: 0;
//  width: 45px;
//  height: 45px;
//  border-radius: 25px;
//  line-height: 25px;
//  box-sizing: border-box;
//  font-size: 12px;
//  background-color: blue;
//  color: white;
//  text-align: center;
//  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
//  outline: 0;
//  i.icon {
//    margin: 0;
//  }
//  &:focus .subMenu {
//    display: block;
//  }
//`;
//const DownBtn = styled.button`
//  display: none;
//  position: absolute;
//  top: 0;
//  left: 95%;
//  transform: translate(-50%, -50%);
//  border: 0;
//  padding: 0;
//  width: 45px;
//  height: 45px;
//  border-radius: 25px;
//  line-height: 25px;
//  box-sizing: border-box;
//  font-size: 12px;
//  background-color: blue;
//  color: white;
//  text-align: center;
//  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
//  outline: 0;
//  i.icon {
//    margin: 0;
//  }
//  &:focus .subMenu {
//    display: block;
//  }
//`;
const FuncButton = styled.button`
  // display: none;
  position: absolute;
  top: 0;
  left: ${props => props.left || "100%"};
  // transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: ${market_style.font.size.mini1};
  background-color: ${props => props.bgcolor || "#E72327"};
  color: white;
  text-align: center;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  i.icon {
    margin: 0;
  }
  &:focus .subMenu {
    display: block;
  }
`;

export class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "INIT", order: 0, click: false, private: 0 };
    this.InitClick = this.InitClick.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.moveDownItem = this.moveDownItem.bind(this);
    this.moveUpItem = this.moveUpItem.bind(this);
    this.privateItem = this.privateItem.bind(this);
    this.cancelItem = this.cancelItem.bind(this);
    this.confirmed = this.confirmed.bind(this);
  }
  // async shouldComponentUpdate(nextProps) {
  //   if (nextProps.content !== this.props.content)
  //     return true;
  // }
  async componentDidMount() {
    if (this.props.type)
      await this.setState({ type: this.props.type, order: this.props.order });
  }
  async InitClick() {
    await this.setState({ click: true });
  };
  async onChangeValue(data) {
    // let newObj={...this.props.item };
    // newObj.content = data.content;
    // await this.setState({ ...newObj });
    // await this.setState({content:data.content});
    // await console.log(this.state);

    if (this.props.getValue)
      // await this.props.getValue(this.state);
      await this.props.getValue({ ...this.props.item, content: data.content })
  };
  async privateItem(event) {
    if (this.props.privateItem) {
      if (await confirm("선택하신 항목을 비공개로 설정하시겠습니까?")) {
        this.props.privateItem(this.props.item);
      }
      // confirmAlert(options("선택하신 항목을 비공개로 설정하시겠습니까?",()=>{this.props.privateItem(this.props.item);},event));
    }
  }
  async cancelItem(event) {
    if (this.props.deleteItem) {
      if (await confirm("작업을 취소하시겠습니까?")) {
        this.props.deleteItem(this.props.item.order);
      }
    }
  }
  async deleteItem(event) {
    if (this.props.deleteItem) {
      if (await confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
        this.props.deleteItem(this.props.item.order)
      }
      // confirmAlert(options("선택된 항목을 정말 삭제하시겠습니까?",()=>{this.props.deleteItem(this.props.item.order);},event));
    }
  };
  async moveUpItem() {
    if (this.props.moveUp) {
      this.props.moveUp({ old: this.props.item.order, new: this.props.item.order - 1 });
    }
  };
  async moveDownItem() {
    if (this.props.moveDown) {
      this.props.moveDown({ old: this.props.item.order, new: this.props.item.order + 1 });
    }
  };
  async confirmed() {

  }

  render() {
    const { item, name, /* maxOrder */ } = this.props;

    return (
      <ControllerWrap>
        <div className="contentWrap">
          {/* {item.private === 1 ? "(비공개 항목으로 설정되어 있습니다.)" : null} */}
          {item.type === "FILE" ? <FileController item={item} name="source" initClick={this.state.click} getValue={this.onChangeValue} deleteItem={this.deleteItem} setController={this.setController} /> : null}
          {item.type === "TEXT" ? <TextController item={item} initClick={this.state.click} private={item.private} name={name} getValue={this.onChangeValue} deleteItem={this.deleteItem} /> : null}
          {/* {item.type === "EMBED" ? <EmbController /> : null} */}
          {item.type === "PROBLEM" ? <ProblemController item={item} getValue={this.onChangeValue} confirmed={this.confirmed} onCancel={this.cancelItem} /> : null}
          {/* <div>
            <div onClick={() => { delete item.notyet; this.onChangeValue({ ...item, content: "selected" }); }}>clickclick</div>
          </div>
          <ProblemContainer
            open={this.state.addProblem}
            openModal={async (show) => {
              this.setState({ addProblem: show });
              if (show === false && item.content === "") {
                let copyContent = [...this.state.content];
                for (var i = 0; i < copyContent.length; i++) {
                  if (copyContent[i].type === "PROBLEM" && copyContent[i].content === "") {
                    copyContent.splice(i, 1);
                  }
                }
                for (i = 0; i < copyContent.length; i++) {
                  copyContent[i].order = i;
                }
                await this.setState({ content: copyContent });
                this.props.handleUpdate && this.props.handleUpdate(this.props.uid ? this.state : this.state.content);
                // console.log("csd:", item);
              }
            }}
            item={item}
            initClick={this.state.click}
            getValue={(data) => {
              if (data != null) {
                this.onChangeValue(data, item.order)
              }
            }}
          />
        */}
        </div>

        {this.props.mode == "project" ? null : item.private === 1
          ? <FuncButton left="90%" type="button" className="editBtn" bgcolor="gray" onClick={this.privateItem}><i className="eye icon large" /></FuncButton>
          : <FuncButton left="90%" type="button" className="editBtn" bgcolor="blue" onClick={this.privateItem}><i className="eye icon large" /></FuncButton>}
        <FuncButton left="95%" type="button" className="editBtn" onClick={this.deleteItem}><i className="trash alternate icon large" /></FuncButton>
        {/* {maxOrder - 1 >= item.order && item.order !== 0 ? <UpBtn type="button" className="editBtn" onClick={this.moveUpItem}><i className="angle up alternate icon large" /></UpBtn> : null} */}
        {/* {maxOrder - 1 !== item.order && item.order >= 0 ? <DownBtn type="button" className="editBtn" onClick={this.moveDownItem}><i className="angle down alternate icon large" /></DownBtn> : null} */}
      </ControllerWrap>
    );
  }
}


