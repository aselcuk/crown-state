/**
 * The IState interface declares a set of methods for managing callbacks.
 */
 interface IState<T> {
  // Attach an callback to the State.
  attach(callback: (currentState?: T) => void): Attachment;

  // Update the state and fotify all callbacks.
  update(value: T): void;
}

/**
 * State contains a state object and notifies all callbacks at once.
 */
export default class State<T> implements IState<T> {

  private _previousState?: T;
  private _state?: T;

  /**
   * 
   * @param state 
   */
  constructor(state?: T) {
    this._state = state;
    this._previousState = state;
  }

  /**
   * get value of currenct state
   */
  get value(): T | undefined {
    return this._state;
  }

  /**
   * 
   */
  get previousValue(): T | undefined {
    return this._previousState;
  }

  /**
   * @type {Map<number, Function>} List of callbacks.
   */
  private callbacks: Map<number, Function> = new Map();

  /**
   * 
   * @param callback 
   */
  public attach(callback: (currentState?: T) => void): Attachment {
    callback(this._state);

    const key = this.callbacks.size + 1;

    this.callbacks.set(key, callback);

    return new Attachment(key, this.callbacks)
  }

  /**
   * Update current state and trigger notify
   */
  public update(value: T): void {
    this._previousState = this._state;
    this._state = value;

    this.notify();
  }

  /**
   * Trigger an update in each callback.
   */
  private notify(): void {
    for (const [_, callback] of this.callbacks.entries()) {
      callback(this._state);
    }
  }
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
    private callbackIndex: number,
    private callbacks: Map<number, Function>
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
