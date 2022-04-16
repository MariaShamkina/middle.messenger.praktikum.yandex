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
