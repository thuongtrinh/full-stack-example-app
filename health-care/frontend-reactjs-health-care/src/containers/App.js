import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import routers from "../routes/routers";
import authRouters from "../routes/authRouters";
import { path } from "../utils";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Login from "./Auth/Login/Login";
import Home from "./Auth/Home";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import { ToastContainer } from "react-toastify";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSystemHeader: false,
      pathname: "",
    };
  }
  componentDidMount() {
    this.buildShowSystemHeader();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.pathname !== this.state.pathname) {
      this.buildShowSystemHeader();
    }
  }

  buildShowSystemHeader = () => {
    const pathname = window.location.pathname;
    let isShowHeader = true;
    if (_.includes(pathname, path.PREFIX_PAGE_USERS)) {
      isShowHeader = false;
    }
    this.setState({
      isShowSystemHeader: isShowHeader,
      pathname: pathname,
    });
  };

  render() {
    const { isLoggedIn } = this.props;
    let { isShowSystemHeader } = this.state;

    return (
      <>
        <div className="main-container">
          {/* <ConfirmModal /> */}
          {isLoggedIn && isShowSystemHeader && <Header />}

          <div className="content-container">
            <CustomScrollbars style={{ height: "100vh", with: "100%" }}>
              <Routes>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.EMPTY} element={<Home />} />
                <Route path={path.HOME_PAGE} element={<HomePage />} />
                <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                  {authRouters.map((item, index) => {
                    return (
                      <Route
                        path={item.path}
                        element={<item.component />}
                        key={index}
                      />
                    );
                  })}
                </Route>
                {routers.map((item, index) => {
                  return (
                    <Route
                      path={item.path}
                      element={<item.component />}
                      key={index}
                    />
                  );
                })}
              </Routes>
            </CustomScrollbars>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
