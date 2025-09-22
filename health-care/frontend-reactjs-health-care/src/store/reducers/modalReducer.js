import actionTypes from "../actions/actionTypes";

const initialState = {
  isShowModal: false,
  title: "",
  dataEditing: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL: {
      return {
        ...state,
        isShowModal: true,
      };
    }
    case actionTypes.HIDE_MODAL: {
      return {
        ...state,
        isShowModal: false,
        title: "",
        dataEditing: null,
      };
    }
    case actionTypes.CHANGE_MODAL_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title,
      };
    }
    case actionTypes.EDITING_MODAL: {
      const { dataEditing } = action.payload;
      return {
        ...state,
        dataEditing,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
