import {connect} from 'react-redux';
import {fetchReviews} from '../../actions/review_actions';
import {clearErrors} from '../../actions/errors_actions';
import ReviewBox from './review_box';
import { withRouter } from 'react-router-dom';
import { selectAllReviews } from '../../reducers/selectors';

const mapStatetoProps = (state) => {
  return {
    review: selectAllReviews(state),
    currentUser: state.currentUser
  };
};


const mapDispatchtoProps = (dispatch) => {
  return {
  fetchReviews: (kitchenId) => dispatch(fetchReviews(kitchenId)),
  clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter (connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ReviewBox));
