import { setProp } from './helpers';
import EventBus from './eventBus';

export enum StoreEvents {
    UPDATED = 'updated',
}

class Store extends EventBus {
  private state: ModelData = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    setProp(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }
}

const singleStore = new Store();
export const store = singleStore;
