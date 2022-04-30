import Component, { IChildren, IProperties } from './component';
import { store, StoreEvents } from './store';
import { isDeepEqual } from './helpers';

export function withStore<PropsType extends IProperties | IChildren = {}>(
  mapStateToProps: (state: ModelData) => Partial<IProperties & PropsType>,
  component: new(...args: any) => Component<PropsType>,
) {
  return class extends component {
    public static componentName = component.name;// todo зачем?

    constructor(props: PropsType) {
      const localState = mapStateToProps(store.getState());
      // todo подебижить и понять как сейчас прокси на пропсах и дидАпдейт обрабатывают
      //  изменения. По одному или кучей.
      super({ ...props, ...localState });
      this.state = localState;

      store.weakOn(StoreEvents.UPDATED, this, this.handlerOnStoreChanges);
    }

    public handlerOnStoreChanges() {
      const newState = mapStateToProps(store.getState());
      if (!isDeepEqual(this.state, newState)) {
        this.setProps(newState);
      }
      this.state = newState;
    }
  };
}
