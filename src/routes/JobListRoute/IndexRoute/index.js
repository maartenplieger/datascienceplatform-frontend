import { connect } from 'react-redux';
import TitleComponent from '../../../components/TitleComponent';
import JobListComponent from '../../../components/JobListComponent';
import userActions from '../../../actions/userActions';

const mapStateToBasketProps = (state) => {
  return { ...state.basketState, ...state.userState };
};

const mapDispatchToBasketProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: userActions
  });
};

const mapStateToTitleProps = (state) => {
  return { ...state.userState };
};

const mapDispatchToTitleProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: userActions
  });
};

// Sync route definition
export default () => ({
  title: 'JobList',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToBasketProps, mapDispatchToBasketProps)(JobListComponent)
  }
});
