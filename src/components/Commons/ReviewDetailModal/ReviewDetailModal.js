import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import Cross from "components/Commons/Cross";
import noimg from "source/noimg.png";
import Star from "components/Commons/Star";
import { Rating } from 'semantic-ui-react'

const TextArea = styled.textarea`
    width:100%;
    height:100%;
`
const WriteDialog=styled(Modal)`
    width: 850px;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px;
    opacity: 1;
    padding:24px;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 

     .close-box {
        width: 100%;
        cursor: pointer;
        display:flex;
        justify-content:flex-end;
        position: relative;
    }
    ._wrapper{

        margin-right:26px;
        margin-left:26px;
    .starscore{
        width:100%;
        margin-top:26px;
        margin-bottom:13px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        .left{
            display:flex;
            .nickName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-right:10px;
            }
            .productName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-left:10px;
            }
        }
        .right{
            .create_time{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
            }
        }

    }
    .review-content{
        width:100%;
        display:flex;
        margin-top:19px;
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            margin-right:20px;
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:20px;
            font-weight:300;            
        }
    }
    
    }

`
const Dialog = styled(Modal)`
    width: 850px;
    height:max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #00000029;
    border-radius: 20px;
    opacity: 1;
    padding:24px;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 

     .close-box {
        width: 100%;
        cursor: pointer;
        display:flex;
        justify-content:flex-end;
        position: relative;
    }
    ._wrapper{

        margin-right:26px;
        margin-left:26px;
    .starscore{
        width:100%;
        margin-top:26px;
        margin-bottom:13px;
    }
    .basicInfo{
        width:100%;
        display:flex;
        justify-content:space-between;
        .left{
            display:flex;
            .nickName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-right:10px;
            }
            .productName{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
                margin-left:10px;
            }
        }
        .right{
            .create_time{
                font-size:15px;
                font-family:Noto Sans CJK KR, Regular;
            }
        }

    }
    .review-content{
        width:100%;
        display:flex;
        margin-top:19px;
        .pic{
            min-width:378px;
            min-height:384px;
            max-width:378px;
            max-height:384px;
            background-image: url(${props => props.img});
            background-size:cover;
            border-radius:5px;
            margin-right:20px;
            border:1px solid #efefef;
        }
        .comment{
            width:100%;
            font-family:Noto Sans CJK KR, Regular;
            font-size:20px;
            font-weight:300;            
        }
    }
    
    }
`;

class ReviewDetailModal extends Component {
    render() {
        const { detail } = this.props;
        console.log(detail);
        const RenderStar = () => {
            return <Rating size="tiny" name="score" icon='star' defaultRating={parseInt(5, 10)} maxRating={5} disabled />
          }
        return (
            <React.Fragment>
                    <Dialog open={this.props.open} onClose={this.props.close} img={detail&&detail.thumbnail_url || noimg}>
                    <div className="close-box" onClick={this.props.close}>
                        <Cross angle={45} color={"#707070"} weight={1} width={15} height={15} />
                    </div>
                    <div className="_wrapper">
                    <div className="starscore">
                    <RenderStar />
                    </div>
                    <div className="basicInfo">
                        <div className="left">
                            <div className="nickName">{detail&&detail.nick_name}</div>
                            <div>|</div>
                            <div className="productName">{detail&&detail.title}</div>
                        </div>
                        <div className="right">
                            <div className="create_time">
                                {
                                    new Date(detail&&detail.create_time).getFullYear()+"."
                                    +((new Date(detail&&detail.create_time).getMonth()+1)<10?'0'+(new Date(detail&&detail.create_time).getMonth()+1):(new Date(detail&&detail.create_time).getMonth()+1))+"."
                                    +(new Date(detail&&detail.create_time).getDate()<10?'0'+new Date(detail&&detail.create_time).getDate():new Date(detail&&detail.create_time).getDate())
                                }
                            </div>
                        </div>
                    </div>
                    <div className="review-content">
                        {detail&&detail.thumbnail_url==null?null:<div className="pic"/>}
                        <div className="comment">
                            {detail&&detail.comment}
                        </div>
                    </div>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default ReviewDetailModal;
