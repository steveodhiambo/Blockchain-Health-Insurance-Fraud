import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
// import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
// import IntlMessages from "../../util/IntlMessages";

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">


              {/*<Menu.Item key="sample">*/}
              {/*  <Link to="/sample"><i className="icon icon-widgets"/>*/}
              {/*    <IntlMessages id="sidebar.samplePage"/></Link>*/}
              {/*</Menu.Item>*/}

              <Menu.Item key="log-in">
                <Link to="/log-in"><i className="icon icon-auth-screen"/>Login</Link>
              </Menu.Item>

              <Menu.Item key="create-claim">
                <Link to="/create-claim"><i className="icon icon-add-circle"/>Create Claim</Link>
              </Menu.Item>

              <Menu.Item key="verified-claims">
                <Link to="/verified-claims"><i className="icon icon-check-circle-o"/>Verified Claims</Link>
              </Menu.Item>

              <Menu.Item key="unverified-claims">
                <Link to="/unverified-claims"><i className="icon icon-spam"/>Unverified Claims</Link>
              </Menu.Item>

              <Menu.Item key="rejected-claims">
                <Link to="/rejected-claims"><i className="icon icon-close-circle"/>Rejected Claims</Link>
              </Menu.Item>

              <Menu.Item key="claim-analysis">
                <Link to="/claim-analysis"><i className="icon icon-chart-area"/>Analysis</Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

