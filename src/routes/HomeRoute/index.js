// Sync route definition
import CounterComponent from '../../components/CounterComponent';
import TitleComponent from '../../components/TitleComponent';
export default () => ({
  title: 'Data Science Platform',
  components: {
    header: TitleComponent,
    mainContent: CounterComponent
  }
});
