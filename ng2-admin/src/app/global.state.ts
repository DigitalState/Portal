import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  /**
   * Get the value of an event.
   * This can also be used to check whether an event has been fired and has a value.
   * @param event
   */
  valueOf(event: string): any {
    return this._data[event];
  }

  /**
   * Push a notification carrying `data` to `event` subscribers.
   *
   * This is different from the `notifyDataChanged` method in that it does not check if `value`
   * has changed from its current value in the local data holder and it does not update
   * it if no `value` is provided.
   *
   * @param event {string} The name of the event
   * @param value {any} A parcel to deliver to event subscribers. Defaults to `true`
   */
  notify(event: string, value: any = true) : void {
    console.info('Event fired:', event, ', with data:', value);

    if (value) {
      this._data[event] = value;
    }

    this._data.next({
      event: event,
      data: event ? this._data[event] : null
    });
  }

  notifyDataChanged(event, value) {

    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  /**
   * Retrospectively subscribes to events, so the call back is immediately invoked if
   * `event` has already been fired.
   * @param event
   * @param callback
   */
  subscribeRetro(event: string, callback: Function): void {
    // Find out if the event has already been fired so the callback can be immediately
    // invoked with the event's data. Hence the `Retro` part.
    const eventData = this.valueOf(event);
    if (eventData) {
      callback.call(null, eventData);
    }

    // Now, do a normal `subscribe`
    this.subscribe(event, callback);
  }

  protected _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
