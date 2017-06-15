import { connect } from 'react-redux';
import WPSWranglerDemo from '../../../components/WPSWranglerDemo';
import TitleComponent from '../../../components/TitleComponent';
import actions from '../../../actions/wrangleActions';

const mapStateToCounterProps = (state) => {
  return { ...state.countState };
};

const mapDispatchToCounterProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: actions
  });
};

const mapStateToTitleProps = (state) => {
  return { ...state.userState };
};

const mapDispatchToTitleProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: actions
  });
};

// Sync route definition
export default () => ({
  title: 'Counter',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToCounterProps, mapDispatchToCounterProps)(WPSWranglerDemo)
  }
});
