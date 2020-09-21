// REACT //
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// REDUX //
import { GetCategoryAllRequest } from "actions/Categorys";
// MARKET //
import ProductListPage, { ProductDetailPage,ProductPurchasePage } from "pages/ProductPage";
import DesignerListPage, { DesignerDetailPage } from "pages/DesignerPage";
import MakerListPage, { MakerDetailPage } from "pages/MakerPage";
import CreateProductPage from "pages/CreateProductPage";
import CreateGalleryPage from "pages/CreateGalleryPage";
import ModifyGalleryPage from "pages/ModifyGalleryPage";
import ModifyItemPage from "pages/ModifyItemPage";

import SignUpPage from "pages/SignUpPage";
import SignInPage from "pages/SignInPage";
import RequiresAuth from "containers/Commons/RequiresAuth";
import RequiresPayUser from "containers/Commons/RequiresPayUser";
import MainPage from "pages/MainPage";
import FooterPage from "pages/FooterPage";
import MyDetailPage from "pages/MyDetailPage";
import MyDetailModifyPage from "pages/MyDetailModifyPage";
import ResetPwPage from "pages/ResetPwPage";
import SearchPage from "pages/SearchPage";
import MessagePage from "pages/MessagePage";
import PaymentPage from "pages/PaymentPage";
import CartPage from 'pages/CartPage';
import PointPage from 'pages/PointPage';
import CreateDesignerPage from 'pages/CreateDesignerPage';
import ModifyDesignerPage from 'pages/ModifyDesignerPage';
import CreateMakerPage from 'pages/CreateMakerPage';
import ModifyMakerPage from 'pages/ModifyMakerPage';
import RequestListPage, { CreateRequestPage, RequestDetailPage } from "pages/RequestPage";
import requestDesignerPage from "pages/RequestToDesignerPage";
import requestMakerPage from "pages/RequestToMakerPage";
import ModifyrequestDesignerPage from "pages/ModifyRequestToDesignerPage";
import ModifyrequestMakerPage from "pages/ModifyRequestToMakerPage";
import ResponseToDesignerReqPage from "pages/ResponseToDesignerReqPage";
import ResponseToMakerReqPage from "pages/ResponseToMakerReqPage";
import { GalleryDetailPage } from "pages/GalleryPage/GalleryDetailPage";
import FooterPrivacy from "components/Commons/FooterPrivacy"
import FooterPara from "components/Commons/FooterTerm"
// TEMPLATE //
import ClientTemplate from 'templates/ClientTemplate';

class App extends Component {
  componentDidMount() {
    this.props.GetCategoryAllRequest();
  }
  render() {
    return (
      <BrowserRouter>
        <ClientTemplate>
          <Switch>
            {/* MAIN */}
            <Route exact path="/" component={MainPage} />
            {/* FOOTER */}
            <Route path="/footerPrivacy" component={FooterPrivacy} />
            <Route path="/footerPara" component={FooterPara} />
            {/* DESIGNER */}

            <Route path="/designer/:sorting?/:cate1?/:cate2?" component={DesignerListPage} />
            <Route path="/designerDetail/:id/:type?" component={DesignerDetailPage} />
            <Route path="/designerModify" component={ModifyDesignerPage} />
            <Route path="/createDesigner" component={RequiresAuth(CreateDesignerPage)} />
            <Route path="/createDesigner/redirected" component={RequiresAuth(CreateDesignerPage)} />
            <Route path="/modifyDesigner/:id" component={RequiresAuth(ModifyDesignerPage)} />
            {/* MAKER */}
            <Route path="/maker/:sorting?/:cate1?/:cate2?" component={MakerListPage} />
            <Route path="/makerDetail/:id/:type?" component={MakerDetailPage} />
            <Route path="/createMaker" component={RequiresAuth(CreateMakerPage)} />
            <Route path="/modifyMaker/:id" component={ModifyMakerPage} />
            {/* ITEM */}
            <Route path="/createProduct" component={RequiresPayUser(CreateProductPage)} />
            <Route path="/createProduct/redirected" component={RequiresPayUser(CreateProductPage)} />
            {/* <Route path="/createProduct" component={RequiresAuth(CreateProductPage)} /> */}
            <Route path="/productModify/:id" component={RequiresAuth(RequiresPayUser(ModifyItemPage))} />
            <Route path="/productDetail/:id" component={ProductDetailPage} />
            <Route path="/product/:sorting?/:cate1?/:cate2?" component={ProductListPage} />
            {/*PURCHASE*/}
            <Route path="/productPurchase/:id/:payment" component={ProductPurchasePage} />

            {/* REQUEST */}
            <Route path="/createRequest" component={RequiresAuth(RequiresPayUser(CreateRequestPage))} />
            <Route path="/requestDetail/:id" component={RequestDetailPage} />
            {/* <Route path="/requestDesigner/:sorting?/:cate1?/:cate2?" component={RequestListPage} />  */}
            {/* <Route path="/requestMaker/:sorting?/:cate1?/:cate2?" component={RequestListPage} /> */}
            <Route path="/request/:type/:page?/:cate1?/:cate2?/:sort?/:keyword?" component={RequestListPage} />
            <Route path="/requestToDesigner/:id" component={RequiresAuth(RequiresPayUser(requestDesignerPage))} />
            <Route path="/requestToMaker/:id" component={RequiresAuth(RequiresPayUser(requestMakerPage))} />
            <Route path="/ModifyrequestToDesigner/:id" component={RequiresAuth(RequiresPayUser(ModifyrequestDesignerPage))} />
            <Route path="/ModifyrequestToMaker/:id" component={RequiresAuth(RequiresPayUser(ModifyrequestMakerPage))} />
            <Route path="/responseToDesignerReq/:pid" component={RequiresAuth(RequiresPayUser(ResponseToDesignerReqPage))} />
            <Route path="/responseToMakerReq/:id" component={RequiresAuth(RequiresPayUser(ResponseToMakerReqPage))} />
            {/* GALLERY */}
            <Route path="/createGallery" component={RequiresAuth(CreateGalleryPage)} />
            <Route path="/modifyGallery/:id" component={RequiresAuth(ModifyGalleryPage)} />
            <Route path="/galleryDetail/:id" component={GalleryDetailPage} />
            {/* ETC */}
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/myPage/:type?/:type2?" component={RequiresAuth(MyDetailPage)} />
            <Route path="/myModify" component={RequiresAuth(MyDetailModifyPage)} />
            <Route path="/Term/:page" component={FooterPage} />
            <Route path="/Privacy/:page" component={FooterPage} />
            <Route path="/Info/:page" component={FooterPage} />
            <Route path="/search/:type?/:sort?/:keyword?" component={SearchPage} />
            <Route path="/message/:id?/:name?" component={RequiresAuth(MessagePage)} />
            <Route path="/resetPw" component={ResetPwPage} />
            {/* <Route path="/myPage" component={MyDetailPage} /> */}
            {/* <Route path="/payment/:id/:amount/:option" component={PaymentPage} /> */}
            {/* <Route path="/payment/:id/:title/:amount/:option/:thumbnail" component={PaymentPage} /> */}
            <Route path="/payment" component={RequiresAuth(PaymentPage)} />
            <Route path="/cart" component={CartPage} />
            {/* POINT */}
            <Route path="/point" component={RequiresAuth(PointPage)} />
            {/* NOT FOUND */}
            <Route component={() => <div style={{ width: "100%", fontSize: "36px" }}>페이지를 찾을 수 없습니다.</div>} />

          </Switch>
        </ClientTemplate>
      </BrowserRouter>);
  }
}


const mapDispatchToProps = (dispatch) => ({
  GetCategoryAllRequest: () => dispatch(GetCategoryAllRequest())
});

export default connect(null, mapDispatchToProps)(App);
