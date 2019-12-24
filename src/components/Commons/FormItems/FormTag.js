import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const FormStyle = styled.input`
  width: 100%;
  margin: 0;
  outline: 0;
  -webkit-appearance: none;
  line-height: 1.21428571em;
  padding: 0.67857143em 1em;
  font-size: 1em;
  background: #fff;
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  color: ${StyleGuide.color.geyScale.scale7};
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color 0.1s ease, border-color 0.1s ease;
  &::placeholder {
    color: ${StyleGuide.color.geyScale.scale5};
  }
  &:focus {
    &::placeholder {
      color: ${StyleGuide.color.geyScale.scale7};
    }
    border-color: #85b7d9;
    box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
  }
  &.error {
    border: 1px solid ${StyleGuide.color.main.basic};
    color: ${StyleGuide.color.main.basic};
    &::placeholder {
      color: ${StyleGuide.color.main.basic};
    }
  }
`;
const TagList = styled.div`
width: 100%;
display:flex;
padding:10px;
flex-wrap:wrap;
`
const TagPiece = styled.div`
  width:max-content;
  min-width:30px;
  background-color:#EFEFEF;
  margin-right:5px;
  margin-bottom:5px;
  color:#707070;
  padding:5px;
  padding-left:10px;
  padding-right:10px
  border-radius:15px;
  display:flex;
  justify-content:space-between;

  .close{
      margin-left:10px;
      width:max-content;
      height:max-content;
      padding:0px 2px;
  }
`
export class FormTag extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            tag:[],
            value:"",
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterKeyDown = this.onEnterKeyDown.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }
    componentDidMount(){
        // this.setState({tag:this.props.tag});
    }
    onEnterKeyDown(event){
        if(event.key==='Enter')
        {
            if(this.state.value!=="")
            {
                this.setState({
                    tag:this.state.tag.concat(this.state.value),
                    value:"",
                });
            }

        }
    }
    onChangeValue(event){
        
        this.setState({value:event.target.value})
    }
    async onDeleteTag(event){
            console.log(event.target.id);
            const deleteIdx = event.target.id;
            const length = this.state.tag.length;
            let list=[];
            list=list.concat(this.state.tag);

            this.setState({
                tag:list.slice(0,deleteIdx).concat(this.state.tag.slice(parseInt(deleteIdx,10)+1,length))
            })
    }
    render(){
        const TagBox = this.state.tag.map((item,index)=>{
            return(
                <TagPiece key={index}>
                    {item}
                    <div id={index} onClick={this.onDeleteTag} className="close">x</div>
                </TagPiece>
            );
        })
        return(
            <React.Fragment>
            <FormStyle
            placeholder = {this.props.placeholder}
            onKeyDown = {this.onEnterKeyDown}
            onChange={this.onChangeValue}
            value={this.state.value}
            />
            <TagList>
                {TagBox}
            </TagList>
            
            </React.Fragment>
        );
    }
}