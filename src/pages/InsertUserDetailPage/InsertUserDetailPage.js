import React, { Component } from 'react';
import UserDetailFormContainer from "containers/Registration/UserDetailFormContainer";

class InsertUserDetailPage extends Component {
  render() {
    return (<React.Fragment>
      <UserDetailFormContainer token={this.props.token}
        type={this.props.match.params.type ? this.props.match.params.type : null}
        type2={this.props.match.params.type2 ? this.props.match.params.type2 : null}
        history={this.props.history} />
    </React.Fragment>);
  }
}

export default InsertUserDetailPage;
