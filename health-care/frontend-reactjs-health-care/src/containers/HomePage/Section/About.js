import React, { Component } from "react";
import { connect } from "react-redux";
import MainLayout from "../../../components/Layout/MainLayout";
import "../HomePage.scss";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <MainLayout>
        <div className="section-about">
          <div className="section-about-header">
            Truyền thông nói về Healthy Care
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/i2pMEhEzbEs"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                "Sức khỏe là thứ quý giá nhất" là một câu nói hoàn toàn chính
                xác và sâu sắc. Sức khỏe là nền tảng để mỗi người có thể sống,
                làm việc, học tập và tận hưởng cuộc sống. Khi có sức khỏe, chúng
                ta có thể theo đuổi ước mơ, thực hiện hoài bão và đóng góp cho
                xã hội. Mất đi sức khỏe, dù có tiền bạc, danh vọng hay địa vị
                cũng trở nên vô nghĩa.
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
    // modalActionCreators: bindActionCreators(actions, dispatch),
    // setContentOfConfirmModal: (contentOfConfirmModal) =>
    //   dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
