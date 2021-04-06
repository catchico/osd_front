import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemReview from "components/Items/ItemReview";
import { GetItemReviewRequest, CreateItemReviewRequest, /*DeleteItemReviewRequest*/ } from "actions/Item";
import { GetItemPaymentRequest } from "actions/Payment";
import styled from "styled-components";

const ReviewBox = styled.div`
    height: 100%;
    overflow:${props=>props.isScroll?"overlay":"hidden"};
`;
class ItemReviewContainer extends Component {
    constructor(props) {
        super(props);
        this.requestReview = this.requestReview.bind(this);
        this.getData = this.getData.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        this.props.GetItemReviewRequest(this.props.match.params.id, 0)
        .then(
            ()=>{
                console.log(this.props.review.length);
                return this.props.isExpanding(this.props.review.length>1?true:false);
            }
        )
        this.props.userInfo && this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0);
    }
    refresh() {
        this.props.GetItemReviewRequest(this.props.match.params.id, 0);
        this.props.userInfo && this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0);
    }
    requestReview(data) {
        this.props.CreateItemReviewRequest(data, this.props.match.params.id, this.props.token)
            .then(res =>
                res.data.success &&
                this.props.GetItemReviewRequest(this.props.match.params.id, 0))
            .then(
                this.props.userInfo &&
                this.props.GetItemPaymentRequest(this.props.match.params.id, this.props.token, 0))

    }
    getData(page) {
        this.props.GetItemReviewRequest(this.props.match.params.id, page);
    }
    render() {
        return (
            <ReviewBox>
            <ItemReview
            refresh={this.refresh}
            handler={this.props.handler}
            // writeHandler={this.props.writeHandler}
            id={this.props.match.params.id}
            getData={this.getData}
            request={this.requestReview}
            {...this.props} />
            </ReviewBox>
            );
    }
}

const mapStateToProps = (state) => ({
    ItemDetail: state.ItemDetail.status.ItemDetail,
    payment: state.Payment.status.Payment,
    review: state.ItemReview.status.Review,
    total: state.ItemReview.status.Total,
    score: state.ItemReview.status.TotalScore,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemReviewRequest: (id, page) => dispatch(GetItemReviewRequest(id, page)),
    CreateItemReviewRequest: (data, id, token) => dispatch(CreateItemReviewRequest(data, id, token)),
    GetItemPaymentRequest: (id, token, page) => dispatch(GetItemPaymentRequest(id, token, page))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemReviewContainer));