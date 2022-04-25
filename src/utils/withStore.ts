import Component, { IChildren, IProperties } from './component';
import { store, StoreEvents } from './store';
import { isDeepEqual } from './helpers';

export function withStore<PropsType extends IProperties | IChildren = {}>(
  mapStateToProps: (state: ModelData) => PropsType,
  component: new(...args: any) => Component<PropsType>,
) {
  return class extends component {
    public static componentName = component.name;// todo зачем?

    constructor(...args: any) {
      const localState = mapStateToProps(store.getState());
      // todo подебижить и понять как сейчас прокси на пропсах и дидАпдейт обрабатывают
      //  изменения. По одному или кучей.
      super({ ...args, ...localState });
      this.state = localState;

      // todo проверить, что хендлер не нужно вынести отдельной функцией
      //  (что он сейчас удалится вместе с компонентом)
      store.weakOn(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(store.getState());
        if (!isDeepEqual(this.state, newState)) {
          this.setProps(newState);
        }
        this.state = newState;
      });
    }
  };
}
