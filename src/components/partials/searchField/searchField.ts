import Component from '../../../utils/component';
import inputFieldTemplate from './searchField.hbs';

export default class SearchField extends Component {
  render() {
    const { props } = this;
    return this.compile(inputFieldTemplate, { ...props });
  }
}
