import dataChangeZoneTemplate from './dataChangeZone.hbs';
import Component from '../../../../../utils/component';
import ProfileDataZone from '../profileDataZone';
import ControlZone from '../controlZone';

export default class DataChangeZone extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  protected initChildren() {
    this.children.profileDataZone = new ProfileDataZone();
    this.children.controlZone = new ControlZone();
  }

  render() {
    const { props } = this;
    return this.compile(dataChangeZoneTemplate, { ...props });
  }
}
