type EventType = string;
type EventsShape = Record<EventType, unknown>;
export type EventHandler<T> = (event: T) => void;
type EventHandlerArray<T> = Array<EventHandler<T>>;

export type EventEmitter<Events extends EventsShape> = {
  on: <TEventKey extends keyof Events>(
    event: TEventKey,
    handler: EventHandler<Events[TEventKey]>,
  ) => void;

  off: <TEventKey extends keyof Events>(
    event: TEventKey,
    handler: EventHandler<Events[TEventKey]>,
  ) => void;

  emit: <TEventKey extends keyof Events>(event: TEventKey, payload: Events[TEventKey]) => void;
};

export function createEventEmitter<Events extends EventsShape>(): EventEmitter<Events> {
  const listeners = new Map<keyof Events, EventHandlerArray<Events[keyof Events]>>();

  return {
    on(event, listener) {
      const _listener = listener as EventHandler<Events[keyof Events]>;
      const eventListeners = listeners.get(event);

      eventListeners ? eventListeners.push(_listener) : listeners.set(event, [_listener]);
    },
    off(event, listener) {
      const eventListeners = listeners.get(event);
      if (!eventListeners) return;

      const listenerIndex = eventListeners.indexOf(listener as EventHandler<Events[keyof Events]>);
      const isListenerRegistered = listenerIndex !== -1;

      if (isListenerRegistered) {
        eventListeners.splice(listenerIndex, 1);
      }
    },
    emit(event, options) {
      const eventListeners = listeners.get(event);
      if (!eventListeners) return;

      eventListeners.forEach((listener) => listener(options));
    },
  };
}
