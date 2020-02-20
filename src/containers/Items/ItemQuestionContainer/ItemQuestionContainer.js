import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemQuestion from "components/Items/ItemQuestion";
import { GetItemQuestionRequest, CreateItemQuestionRequest, DeleteItemQuestionRequest } from "actions/Item";


class ItemQuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.requestQuestion = this.requestQuestion.bind(this);
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.props.GetItemQuestionRequest(this.props.match.params.id, 0);
    }
    requestQuestion(data) {
        this.props.CreateItemQuestionRequest(data, this.props.match.params.id, this.props.token)
            .then(res => {
                if (res.data.success) {
                    this.props.GetItemQuestionRequest(this.props.match.params.id, 0);
                }
            });
    }
    getData(page) {
        this.props.GetItemQuestionRequest(this.props.match.params.id, page);
    }
    render() {
        return (<ItemQuestion id={this.props.match.params.id} getData={this.getData} request={this.requestQuestion} {...this.props} />);
    }
}

const mapStateToProps = (state) => ({
    question: state.ItemQuestion.status.Question,
    total: state.ItemQuestion.status.Total,
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
    GetItemQuestionRequest: (id, page) => dispatch(GetItemQuestionRequest(id, page)),
    CreateItemQuestionRequest: (data, id, token) => dispatch(CreateItemQuestionRequest(data, id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemQuestionContainer));
