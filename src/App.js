import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import AdminSignInPage from "pages/AdminSignInPage"
import AdminPage from "Admin/AdminPage/AdminPage"
import RequiresAuthAdmin from "containers/Commons/RequiresAuthAdmin"
import GroupManagerPage from "Admin/AdminPage/GroupManagerPage"
import DesignManagerPage from "Admin/AdminPage/DesignManagerPage"
import DesignerManagerPage from "Admin/AdminPage/DesignerManagerPage"
import NoticeManagerPage from "Admin/AdminPage/NoticeManagerPage"
import HotDesignManagerPage from "Admin/AdminPage/HotDesignManagerPage";
import HotGroupManagerPage from "/Users/kmc/opendesign/admin/src/Admin/AdminPage/HotGroupManagerPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/noticeManager" component={RequiresAuthAdmin(NoticeManagerPage)} />
          <Route path="/groupManager" component={RequiresAuthAdmin(GroupManagerPage)} />
          <Route path="/hotgroupManager" component={RequiresAuthAdmin(HotGroupManagerPage)} />
          <Route path="/designManager" component={RequiresAuthAdmin(DesignManagerPage)} />
          <Route path="/hotdesignManager" component={RequiresAuthAdmin(HotDesignManagerPage)} />
          <Route path="/designerManager" component={RequiresAuthAdmin(DesignerManagerPage)} />
          <Route path="/adminSignIn" component={AdminSignInPage} />
          <Route exact path="/" component={AdminPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
