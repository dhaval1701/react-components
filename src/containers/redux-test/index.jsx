import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ReduxTest from "../../modules/pages/redux-test";
import {
  fetchUserData,
  createUserData,
  updateUserData,
  deleteUserData,
} from "../../slices/user/userAsyncAction";
import { clearUserData } from "../../slices/user/userSlice";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUserData,
      createUserData,
      updateUserData,
      deleteUserData,
      clearUserData,
    },
    dispatch
  );

const ReduxTest_ = connect(mapStateToProps, mapDispatchToProps)(ReduxTest);

export default ReduxTest_;
