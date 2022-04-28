import Component from '../../../utils/component';
import spinnerTemplate from './spinner.hbs';

export class Spinner extends Component {
  render() {
    return this.compile(spinnerTemplate, this.props);
  }
}
