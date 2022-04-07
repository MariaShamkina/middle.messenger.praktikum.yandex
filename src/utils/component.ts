import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';

export interface IProperties {
  [propName: string]: unknown;
  events?: Record<string, handler>;
  settings?: { withInternalID: boolean };
  _id?: string;
}

export interface IChildren {
  // eslint-disable-next-line no-use-before-define
  [propName: string]: Component | Component[];
}

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: {props: IProperties };

  private _id: string | null = null;

  get id(): string | null {
    return this._id;
  }

  protected props: IProperties = {};

  protected children: IChildren;

  protected eventBus: () => EventBus;

  constructor(propsAndChildren:IProperties | IChildren = {}) {
    const eventBus = new EventBus();
    const { children, props } = Component._getChildren(propsAndChildren);
    this.children = children;
    this.initChildren();
    this._meta = {
      props,
    };
    this._id = makeUUID();
    const props1 : IChildren | IProperties = { ...props, _id: this._id };
    this.props = this._makePropsProxy(props1);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private static _getChildren(propsAndChildren: IProperties | IChildren) {
    const children: IChildren = {};
    const props: IProperties = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component
          || (Array.isArray(value) && value.every((v) => (v instanceof Component)))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  protected initChildren():void {}

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    if (this.props.settings?.withInternalID && this._id) element.setAttribute('data-id', this._id);
    return element;
  }

  init() {
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, listener]) => {
      this.element.addEventListener(eventName, listener);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, listener]) => {
      this.element.removeEventListener(eventName, listener);
    });
  }

  // compileProps() {
  //   const propsAndStubs = { ...this.props };
  //
  //   Object.entries(this.children).forEach(([key, child]) => {
  //     propsAndStubs[key] = child.getContent();
  //   });
  //
  //   return propsAndStubs;
  // }
  //
  // compile(template, props) {
  //   const propsAndStubs = { ...props };
  //
  //   Object.entries(this.children).forEach(([key, child]) => {
  //     propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
  //   });
  //
  //   const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;
  //
  //   fragment.innerHTML = template(propsAndStubs);
  //
  //   Object.values(this.children).forEach((child) => {
  //     const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
  //
  //     stub?.replaceWith(child.getContent());
  //   });
  //
  //   return fragment.content;
  // }

  compile(template: (arg: IProperties | IChildren) => string, props: IProperties | IChildren) {
    const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        props[key] = child.map(((ch) => `<div data-id="${ch._id}"></div>`));
      } else {
        props[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    fragment.innerHTML = template(props);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="${ch._id}"]`);
          stub?.replaceWith(ch.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  private _render() {
    const componentFragment: DocumentFragment = this.render();
    if (!componentFragment.firstElementChild) throw new Error('Render failed');

    const newElement = componentFragment.firstElementChild as HTMLElement;
    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  private get element(): HTMLElement {
    if (this._element === null) throw new Error('Root element is missing');
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _componentDidMount(oldProps:Object) {
    this.componentDidMount(oldProps);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount(oldProps:Object) {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps:IProperties, newProps:IProperties) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidUpdate(oldProps:IProperties, newProps:IProperties):boolean {
    // return !(oldProps === newProps);
    return true;
  }

  public setProps = (newProps:IProperties) => {
    if (!newProps) {
      return;
    }
    Object.assign(this.props, newProps);
  };

  private _makePropsProxy(props: IProperties | IChildren) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },

      set: function (
        target: IProperties | IChildren,
        prop: string,
        value: IProperties | IChildren,
      ) {
        const oldValue = target[prop];
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldValue, value);
        return true;
      }.bind(this),

      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}
