import React, { Component } from "react";
import { connect } from "react-redux";
import RequestDetail from "components/Request/RequestDetail";
import { GetRequestDetailRequest } from "actions/Request";
import { GetThisPurchasedRequest, UpdatePaymentRequest, CreateItemPaymentRequest } from "actions/Payment";
import bg from "source/design_bg.jpg";

class RequestDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.ConfirmPayment = this.ConfirmPayment.bind(this);
    this.Purchase = this.Purchase.bind(this);

  }
  componentDidMount() {
    this.props.GetRequestDetailRequest(this.props.id)
      .then(
        this.props.userInfo &&
        this.props.GetThisPurchasedRequest(this.props.id, this.props.token)
      )
  }
  ConfirmPayment() {
    const { Detail } = this.props;
    this.props.UpdatePaymentRequest(Detail.uid, this.props.token)
      .then(result => {
        if (result.success) {
          this.props.userInfo &&
            this.props.GetThisPurchasedRequest(this.props.id, this.props.token)
        }
      });

    // window.location.reload();
  };
  Purchase() {
    const { Detail } = this.props;
    console.log(this.props);

    this.props.CreateItemPaymentRequest(
      {
        payment_title: Detail.title,
        payment_price: Detail.price,
        response_id: Detail.uid
      },
      "custom",
      this.props.token)
      .then(res => {
        if (res.data.success) {
          alert("구입하였습니다. [구입확인]버튼을 눌러야 거래가 완료됩니다.");
          window.location.href = `/myPage/`;
        }
      })
  };

  render() {
    console.log(this.props);

    return (
      <div style={{ backgroundColor: "#F0F0F0" }}>
        <div style={{ height: "150px", backgroundColor: "#f8e6e4", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center center" }}></div>
        <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto", }}>
          <RequestDetail
            {...this.props}
            purchase={this.Purchase}
            confirm={this.ConfirmPayment}
          />
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.Authentication.status.userInfo,
  Detail: state.RequestDetail.status.Detail,
  token: state.Authentication.status.token,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  isPurchased: state.Payment.status.isPurchased,
});

const mapDispatchToProps = (dispatch) => ({
  GetRequestDetailRequest: (id) => dispatch(GetRequestDetailRequest(id)),
  GetThisPurchasedRequest: (id, token) => dispatch(GetThisPurchasedRequest(id, token)),
  UpdatePaymentRequest: (id, token) => dispatch(UpdatePaymentRequest(id, token)),
  CreateItemPaymentRequest: (data, id, token) => dispatch(CreateItemPaymentRequest(data, id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetailContainer);

/* 
  #fdd9d2	(253,217,210)
  #f8f0e4	(248,240,228)
  #f8e6e4	(248,230,228)
  #f5f6f4	(245,246,244)
  #f5f4f6	(245,244,246) 
*/