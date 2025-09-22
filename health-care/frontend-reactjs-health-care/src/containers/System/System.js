import React, { Component } from "react";
import { connect } from "react-redux";

class System extends Component {
  render() {
    return (
      <div className="system-container">
        <div className="system-list">SYSTEM</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
