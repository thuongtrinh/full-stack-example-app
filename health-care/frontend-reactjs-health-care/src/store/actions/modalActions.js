import actionTypes from "./actionTypes";

export const showModal = () => ({
  type: actionTypes.SHOW_MODAL,
});

export const hideModal = () => ({
  type: actionTypes.HIDE_MODAL,
});

export const changeModalTitle = (title) => ({
  type: actionTypes.CHANGE_MODAL_TITLE,
  payload: {
    title,
  },
});

export const editingModal = (dataEditing) => ({
  type: actionTypes.EDITING_MODAL,
  payload: {
    dataEditing,
  },
});
