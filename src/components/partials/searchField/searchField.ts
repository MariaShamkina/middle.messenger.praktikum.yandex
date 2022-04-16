import Component from '../../../utils/component';
import inputFieldTemplate from './searchField.hbs';

export class SearchField extends Component {
  render() {
    return this.compile(inputFieldTemplate, this.props);
  }
}
