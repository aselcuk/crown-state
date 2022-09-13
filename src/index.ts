/**
 * The IState interface declares a set of methods for managing callbacks.
 */
 interface IState<T> {
  // Attach an callback to the State.
  attach(callback: (currentState?: T, previousState?: T) => void): Attachment;

  // Update the state and notify all callbacks.
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
  public attach(callback: (currentState?: T, previousState?: T) => void): Attachment {
    callback(this._state, this._previousState);

    const key = generateGuid();

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
      callback(this._state, this._previousState);
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
 * @utilyty generate guid
 * @returns guid
 */
function generateGuid()  
{  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });  
}