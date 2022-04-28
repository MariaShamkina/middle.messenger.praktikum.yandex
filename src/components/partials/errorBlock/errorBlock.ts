import Component, { IProperties } from '../../../utils/component';
import errorBlockTemplate from './errorBlock.hbs';
import { convertToArray } from '../../../utils/helpers';

export interface IErrorBlockProps extends IProperties{
    errorImgSrc?: URL;
    errorsText: string[];
}

function displayErrorText(e: Event) {
  const errorText: HTMLElement | null = (e.currentTarget as HTMLElement).querySelector('.error-text-absolute');
  errorText?.toggleAttribute('hidden');
}

export class ErrorBlock extends Component<IErrorBlockProps> {
  constructor(props: IErrorBlockProps) {
    const changedProps = { ...props };
    if (!changedProps.events) {
      changedProps.events = {};
    }
    const { events } = changedProps;

    events.click = convertToArray<EventHandler>(events.click);
    events.click.push((e: Event) => {
      displayErrorText(e);
    });

    super(changedProps);
  }

  render() {
    const props = this.props as IErrorBlockProps;

    return this.compile(errorBlockTemplate, {
      ...props,
      errorImgSrc: new URL('../../../img/box-important--v1.png', import.meta.url),
    });
  }
}
