import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";
import { Rating } from 'semantic-ui-react'

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
import customimg from "source/toolbox.png";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  width: 320px;
  height: 410px;
  padding:27px 15px;
  position: relative;
  border: 1px solid transparent;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #00000029;
  background: transparent;
  font-family: Noto Sans KR;
  cursor: pointer;
`;
const ItemPic = styled.div`
  min-width: 290px;
  min-height: 250px;
  max-width: 290px;
  max-height: 250px;
  font-size:30px;
  font-weight:500;
  color:white;
  background-color:#EFEFEF;
  display:flex;
  justify-content:center;
  align-items:center;
  // background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 22px;
  width: 100%;
  .title {
    font-weight: 500;
    font-size: 13px;
    text-align: left;
  }
  .author {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    font-weight: 300;
    font-size: 11px;
    text-align: left;
    line-height: 18px;
  }
`;
const TypeWrapper = styled.div`
  height:23px;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:flex-end;
`
const NumberWrapper = styled.div`
  // margin-top: 23px;
  display: flex;
  flex-direction: row;
  align-items:center;
  margin-top:20px;
  .price {
    font-weight: 500;
    font-size: 15px;
    text-align: left;
  }
  .score {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    font-weight: 300;
    font-size: 15px;
    text-align: left;
  }
`;
const PrivateLabel = styled.div`
  position: absolute;
  right: 10px;
  bottom: 110px;
  width: max-content;
  padding: 5px 10px;
  background-color: gray;
  color: white;
  border-radius: 15px;
`;
const TypeText = styled.div`
  font-size:9px;
  font-weight:100;
  color:red;
`
const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Item extends Component {
  Keeper = () => {
    const item = this.props.data;
    if (item.uid) {
      const yours = item.members && item.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
      if (item.private && !yours) {
        // alert("비공개!");
        return;
      } else {
        window.location.href = `/productDetail/${item.uid}`;
      }
    }
    // () => item.uid ? item.private ? alert("비공개!") : null : alert("이 아이템의 상세내용을 가져올 수 없습니다.")
  }
  render() {
    const item = this.props.data || empty;
    const date = new Date(item.create_time).getFullYear() + '/' + (parseInt(new Date(item.create_time).getMonth(),10)+1) + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    // console.log(this.props);
    const RenderingStar = ()=>{
      return <Rating name="score" icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled />
    }
    return (
      // const ItemContent = () =>
      <Wrapper onClick={this.Keeper}>
        {/* picture */}
        <ItemPic img={img} />
        {/* text */}
        <TextWrapper>
          <div className="title"><TextFormat txt={item.title} /></div>
          <div className="author">
            <TextFormat txt={item.userName} />
            {/* <div className="date">{date}</div> */}
          </div>
        </TextWrapper>
        {/* numbers */}
        {/* <TypeWrapper>
        <TypeText>
          {item.type===0?"디자인":null}
          {item.type===1?"프로젝트":null}
          {item.type===2?"기술자문/상담":null}
          {item.type===3?"경험":null}
          {item.type===4?"정보/데이터":null}
          {item.type===5?"아이디어/노하우":null}
          {item.type===6?"지적재산권":null}
          {item.type===7?"제작품":null}
        </TypeText>
        </TypeWrapper> */}
        <NumberWrapper>
          <div className="price">{PointFormat(item.price / (parseInt(item.price)>9999?10000:1000) || 0)}{parseInt(item.price)>9999?"만 point":" point"}</div>
          <div className="score">
            {/* {Star(item.score + 0.5)}({NumberFormat(item.reviews)}) */}
            <RenderingStar/>
          </div>
        </NumberWrapper>
        {item.custom && item.isPurchased === 0 ?
          <PrivateLabel onClick={() => this.props.confirm(item.payment_id)}>
            <div>구매확인</div>
          </PrivateLabel> : null}
        {/* {item.private ? <PrivateLabel>비공개</PrivateLabel> : null} */}
      </Wrapper>
      // item.uid ?
      // <NavLink to={"/productDetail/" + item.uid}>
      // <ItemContent />
      // </NavLink>
      // : <ItemContent />
    )
  }
}

export default Item;