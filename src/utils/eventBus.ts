export default class EventBus {
  private listeners: Record<string, EventHandler[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: EventHandler):void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  weakOn(event: string, callback: EventHandler):void {
    const weakRef = new WeakRef({ callback });
    const listener = () => {
      const obj = weakRef.deref();
      if (obj == null) {
        this.off(event, listener);
      } else {
        obj.callback();
      }
    };
    this.on(event, listener);
  }

  off(event:string, callback:EventHandler):void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]):void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
