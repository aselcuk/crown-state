/**
 * The ICallback type declares callback method type.
 */
export type ICallback<T> = (currentState?: T, previousState?: T) => void;

/**
 * The IState interface declares a set of methods for managing callbacks.
 */
export interface IState<T> {
  // Attach an callback to the State.
  attach(callback: ICallback<T>): Attachment;

  // Update the state and notify all callbacks.
  update(value: T): void;
}

/**
 * Attachment contains a detach method and removes the spcified callback from the callbacks.
 */
export class Attachment {
  /**
   *
   * @param callbackIndex
   * @param callbacks
   * @returns
   */
  constructor(
    private callbackIndex: string,
    private callbacks: Map<string, Function>
  ) {
    return this;
  }

  /**
   * Detach removes the spcified callback from the callbacks
   */
  public detach(): void {
    this.callbacks.delete(this.callbackIndex);
  }
}

/**
 * State contains a state object and notifies all callbacks at once.
 */
export default class State<T> implements IState<T> {
  private _previousState?: T;
  private _state?: T;

  /**
   *
   * @param initialState
   */
  constructor(initialState?: T) {
    this._state = initialState;
    this._previousState = initialState;
  }

  /**
   * get value of currenct state
   */
  get value(): T | undefined {
    return this._state;
  }

  /**
   * get value of previous state
   */
  get previousValue(): T | undefined {
    return this._previousState;
  }

  /**
   * @type {Map<string, Function>} List of callbacks.
   */
  private callbacks: Map<string, Function> = new Map();

  /**
   *
   * @param callback
   */
  public attach(callback: ICallback<T>): Attachment {
    callback(this._state, this._previousState);

    const key = Math.random().toFixed(8);

    this.callbacks.set(key, callback);

    return new Attachment(key, this.callbacks);
  }

  /**
   * Update current state and trigger notify
   */
  public update(value: T, callback?: (newValue?: T) => void): void {
    this._previousState = this._state;
    this._state = value;

    this.notify().then(() => {
      if (callback) callback(value);
    });
  }

  /**
   * Trigger an update in each callback.
   */
  private notify(): Promise<void> {
    return new Promise((resolve) => {
      const callbacks = Array.from(this.callbacks.values());
      const callbackPromises = callbacks.map(
        (c) =>
          new Promise((resolve) => resolve(c(this._state, this._previousState)))
      );

      Promise.all(callbackPromises).then(() => resolve());
    });
  }
}
