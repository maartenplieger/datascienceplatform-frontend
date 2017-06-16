// Sync route definition
import UploadComponent from '../../components/UploadComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { ...state.deep };
};

export default () => ({
  title: 'KNMI React Redux Starter Kit',
  components: {
    mainContent: connect(mapStateToProps)(UploadComponent)
  }
});
