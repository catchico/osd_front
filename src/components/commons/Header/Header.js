import React, { Component } from "react";
import styled from "styled-components";
import logo from "source/logo.png";
import { SetSession } from "modules/Sessions";
import { Grid, Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";

// css styling
const Head = styled.header`
  width: 100%;
  height: 60px;
  top: 0;
  position: fixed;
  z-index: 100;
  color: ${StyleGuide.color.geyScale.scale9};
  background-color: #fff;
  box-shadow: 0 1px 1px 1px #E1E4E6;
  a {
    font-weight: normal;
    &:hover {
      color: ${StyleGuide.color.main.basic};
    }
  }
`;

const Content = styled(ContentBox)`
  position: relative;
`;

const MainMenu = styled.ul`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  list-style: none;
`;

const MenuItem = styled.li`
  float: left;
  a {
    line-height: 60px;
  }
  a.active {
    color: ${StyleGuide.color.main.basic};
  }
`;

const SubMenu = styled.div`
  display: block;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  line-height: 60px;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const SubMenuItem = styled.div`
  float: left;
  a {
    line-height: 60px;
  }
`;

const Logo = styled.a`
  height: 60px;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 60px;
  background-image: url(${logo});
  background-position: 50%;
  background-size: contain;
  background-position-y: top;
`;

const UserInterface = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
const UserItem = styled.div`
  margin-left: 1rem;
  text-align: right;
`;

const UserBtn = styled.button`
  color: ${StyleGuide.color.geyScale.scale9};
  text-align: right;
  vertical-align: top;
  margin-left: 20px;
  padding: 0;
  height: 60px;
  line-height: 60px;
  padding-left: 55px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  border: 0;
  .userIcon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: block;
    width: 25px;
    height: 25px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 50%;
  }
  &.active {
    background-color: ${StyleGuide.color.geyScale.scale3};
  }
`;

const UserMenuDimm = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  top: 0;
  left: 0;
  background: 0 0;
`;

const UserMenu = styled.ul`
  display: block;
  position: absolute;
  pointer-events: auto;
  top: 60px;
  right: 0;
  z-index: 1000;
  width: 150px;
  background-color: ${StyleGuide.color.geyScale.scale0};
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const UserMenuItem = styled.li`
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-sizing: border-box;
  line-height: 50px;
  &:hover {
    background-color: ${StyleGuide.color.geyScale.scale2};
  }
  a {
    line-height: 50px;
    display: block;
    width: 100%;
    height: 100%;
    &:hover {
      color: ${StyleGuide.color.geyScale.scale9};
    }
  }
`;

const LogOutBtn = styled.button`
  background-color: transparent;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: ${StyleGuide.color.geyScale.scale9};
`;

class Header extends Component {
  state = {
    profile: false,
    active: false
  };

  handleSignOut = () => {
    this.props.SignOutRequest();
    SetSession("opendesign_token", null).then(data => {
      console.log("setsession", data);
      window.location.reload();
    });
    console.log(this.props);
  };

  onActive = e => {
    const event = e;
    event.stopPropagation();
    let target = event.currentTarget;
    let active = this.props.isActive;
    if (active === "INIT" || active !== "MENU") {
      active = "MENU";
    } else if (active === "MENU") {
      active = "INIT";
    }
    console.log("onactive", active);
    this.props.SetActive(active, target);
  };

  render() {
    const LoginNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <UserBtn
              onClick={this.onActive}
              className={`openMenu ${this.props.active === "MENU" && "active"}`}
            >
              <div
                className="userIcon"
                style={{
                  backgroundImage: `url(${this.props.userInfo.thumbnail &&
                    this.props.userInfo.thumbnail.s_img}), url(${logo})`
                }}
                onError={this.noneImage}
              />
              {this.props.userInfo.nickName}
            </UserBtn>
            <UserMenuDimm
              style={{
                display: `${this.props.active === "MENU" ? "block" : "none"}`
              }}
            >
              <Content>
                <UserMenu>
                  <UserMenuItem>
                    <a href="/myPage">
                      <Icon name="user" />마이페이지
                    </a>
                  </UserMenuItem>
                  <UserMenuItem>
                    <a href="/message">
                      <Icon name="envelope" />메시지함
                    </a>
                  </UserMenuItem>
                  <UserMenuItem>
                    <LogOutBtn onClick={this.handleSignOut}>
                      <Icon name="log out" />logout
                    </LogOutBtn>
                  </UserMenuItem>
                </UserMenu>
              </Content>
            </UserMenuDimm>
          </UserItem>
        </UserInterface>
      );
    };

    const LogOutNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <a href="/signin">로그인</a>
          </UserItem>
          <UserItem>
            <a href="/signup">회원가입</a>
          </UserItem>
        </UserInterface>
      );
    };
    return (
      <Head>
        <Content>
          <MainMenu>
            <Logo href="/">

            </Logo>
            <MenuItem>
              <a href="/design"
                 className={this.props.location.pathname === "/design"
                            || this.props.location.pathname.indexOf("/design/") !== -1
                            || this.props.match.path.indexOf("/designDetail") !== -1
                            ? "active" : ""}>
              디자인
              </a>
            </MenuItem>
            <MenuItem>
              <a href="/group"
                 className={this.props.location.pathname === "/group"
                            || this.props.match.path.indexOf("/groupDetail") !== -1
                            ? "active" : ""}>
              그룹
              </a>
            </MenuItem>
            <MenuItem>
              <a href="/designer"
                 className={this.props.location.pathname === "/designer"
                            || this.props.location.pathname.indexOf("/designer/") !== -1
                            || this.props.match.path.indexOf("/designerDetail") !== -1
                            ? "active" : ""}>
              디자이너
              </a>
            </MenuItem>
            <MenuItem>
              <a href="/createdesign">
                <Button size="small" round={true} color="Solid">
                  디자인 등록
                </Button>
              </a>
            </MenuItem>
          </MainMenu>
          <SubMenu>
            <SubMenuItem>
              <a href="/search">
                <Icon name="search" />
              </a>
            </SubMenuItem>
            <SubMenuItem>
              {this.props.valid ? <LoginNav /> : <LogOutNav />}
            </SubMenuItem>
          </SubMenu>
        </Content>
      </Head>
    );
  }
}

export default Header;
