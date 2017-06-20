import { connect } from 'react-redux';
import UploadComponent from '../../../components/UploadComponent';
import TitleComponent from '../../../components/TitleComponent';
import actions from '../../../actions/wrangleActions';

const mapStateToUploadProps = (state) => {
  return { ...state.fileDescriptionState, ...state.userState };
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
  title: 'Upload File',
  components : {
    header: connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent),
    mainContent: connect(mapStateToUploadProps)(UploadComponent)
  }
});
