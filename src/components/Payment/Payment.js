import React, { Component } from "react";
import styled from 'styled-components';
import DeliverySection from 'components/Payment/Common/Delivery/DeliverySection'
import AddInfoSection from 'components/Payment/Common/AddInformation/AddInfoSection'
import OrderSection from 'components/Payment/Common/Order/OrderSection'
import PaySection from 'components/Payment/Pay/PaySection'
import Button from "components/Commons/Button";

const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
    }
    width: 100%;
    background-color: white;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    padding-left: 90px;
    padding-top:90px;
    margin-bottom: 30px;
    border-radius: 3px;
    
    .title_box{
        width:100%;
        display:flex;
        justify-content:center;
        .title_label{
            font-size:30pt;
            font-weight:1000;
            padding:20px;

        }
    }
    .contents_box{
        width:100%;
        display:flex;
        .payment_box{
            width:70%;
            min-width:480px;
            .payment_content_box{
                width:100%;
                padding:15px;
                padding-left:20px;
                display:flex;
                justify-content:flex-end;
            }         
        }
    }
`
const FormCheckbox = styled.input.attrs({type:'checkbox'})`
  width:20px !important;
  height:20px !important;
  margin-top:2px;
`
const GrayButton = styled.div`
    width:200px;
    height:40px;
    padding:10px;
    border-radius:5px;
    font-weight:500;
    background-color:#707070;
    color:white;
    text-align:center;
    cursor:pointer;
`

class Payment extends Component {

  constructor(props){
        super(props);
        this.onClickPayment = this.onClickPayment.bind(this);
  }

  onClickPayment(){
      console.log("결제하기요청",this.props);
      const Result = {user_id:this.props.userInfo.uid,
                    product_id:3499,amount:1,name:"테스트",
                    phone:"01000000000",post_number:"10101",
                    address_essential:"경기도 고양시 일산동구 장항동 신성하이네스트",address_detail:"605호",
                    comment:"배송전전화주세요"
                };
      this.props.addOrderRequest(Result,this.props.token);
  }

  render() {
    return(
        <React.Fragment>
             <MainBox>
                    <div className="contents_box">
                        <div className="payment_box">
                            <DeliverySection/>
                            {/* <AddInfoSection/> */}
                            <OrderSection/>
                            <PaySection/>
                            <div className="payment_content_box">
                                
                            </div>
                            <div className="payment_content_box">
                            </div>
                        </div>
                    </div>

                </MainBox>
                <div className="payment_content_box">
                <Button onClick={this.onClickPayment}>결제하기</Button>
                <FormCheckbox/><span style={{paddingLeft:"10px"}}>구매 대행 서비스에 동의합니다.</span>
                </div>
        </React.Fragment>
    );
  }
}

export default Payment;
