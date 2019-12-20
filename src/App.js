// react
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// redux
import { GetCategoryLevel1Request, GetCategoryLevel2Request, GetCategoryAllRequest } from "actions/Categorys";

// market
import DesignListPage, { DesignDetailPage } from "pages/DesignPage";
import GroupListPage, { GroupDetailPage } from "pages/GroupPage";
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage";
import CreateDesignPage from "pages/CreateDesignPage";
import ModifyDesignPage from "pages/ModifyDesignPage";
import CreateGroupPage from "pages/CreateGroupPage";
import ModifyGroupPage from "pages/ModifyGroupPage";
import InserUserDetailPage from "pages/InserUserDetailPage"
import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import RequiresAuth from "containers/Commons/RequiresAuth";
import MainPage from "pages/MainPage/MainPage";
import FooterPage from "pages/FooterPage";
import MyDetailPage from "pages/MyDetailPage";
import MyDetailModifyPage from "pages/MyDetailModifyPage";
import ResetPwPage from "pages/ResetPwPage";
import SearchPage from "pages/SearchPage";
import MessagePage from "pages/MessagePage";
import PaymentPage from "pages/PaymentPage";
import CartPage from 'pages/CartPage';
import CreateDesignerPage from 'pages/CreateDesignerPage';
import ModifyDesignerPage from 'pages/ModifyDesignerPage';
import CreateMakerPage from 'pages/CreateMakerPage';
import ModifyMakerPage from 'pages/ModifyMakerPage';

// template
import ClientTemplate from 'templates/ClientTemplate';

class App extends Component {
  componentDidMount() {
    this.props.GetCategoryLevel1Request().then(() => {
      this.props.GetCategoryLevel2Request(null);
    });
    this.props.GetCategoryAllRequest();
  }
  render() {
    return (
      <BrowserRouter>
        <ClientTemplate>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/createdesign" component={RequiresAuth(CreateDesignPage)} />
            <Route path="/productDetail/:id" component={DesignDetailPage} />
            <Route path="/design/:sorting?/:cate1?/:cate2?" component={DesignListPage} />
            <Route path="/createGroup" component={RequiresAuth(CreateGroupPage)} />
            <Route path="/designModify/:id" component={RequiresAuth(ModifyDesignPage)} />
            <Route path="/groupDetail/:id/modify" component={RequiresAuth(ModifyGroupPage)} />
            <Route path="/groupDetail/:id/:sorting?" component={GroupDetailPage} />
            <Route path="/maker/:sorting?" component={DesignerListPage} />
            <Route path="/designerDetail/:id/:type?" component={DesignerDetailPage} />
            <Route path="/designer/:sorting?/:cate1?/:cate2?" component={DesignerListPage} />
            <Route path="/createDesigner" component={CreateDesignerPage} />
            <Route path="/designerModify" component={ModifyDesignerPage} />
            <Route path="/createMaker" component={CreateMakerPage} />
            <Route path="/makerModify" component={ModifyMakerPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/inserUserDetail" component={RequiresAuth(InserUserDetailPage)} />
            <Route path="/myPage/:type?/:type2?" component={RequiresAuth(MyDetailPage)} />
            <Route path="/myPage" component={RequiresAuth(MyDetailPage)} />
            <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)} />
            <Route path="/Term/:page" component={FooterPage} />
            <Route path="/Privacy/:page" component={FooterPage} />
            <Route path="/Info/:page" component={FooterPage} />
            <Route path="/search/:type?/:sort?/:keyword?" component={SearchPage} />
            <Route path="/message/:id?/:name?" component={RequiresAuth(MessagePage)} />
            <Route path="/resetPw" component={ResetPwPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/cart" component={CartPage} />
          </Switch>
        </ClientTemplate>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest());
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
