# Crown State

Lightweight state management library

## Installation


```bash
npm install crown-state --save
```

## Firstly define state

```js
import State from "crown-state";

export type FakeStateType = {
  age?: number;
  name?: string;
}

export const $userState = new State<FakeStateType>({
  name: 'Demo',
  age: 27
});
```

## Import and use anywhere

```jsx
import { Attachment } from "crown-state"
import { $userState, FakeStateType } from "../../global-states/user-state"

export function UserInfo() {
  const [user, setUser] = useState<FakeStateType>()

  useEffect(() => {
    const att: Attachment = $userState.attach(data => setUser(data))

    return () => {
      att.detach();
    }
  }, []);

  return (
    <span>{user?.name}</span>
  )
}
```

## Update state

```js
import { $userState } from "../../global-states/user-state"

export function UpdateUser() {

  const handleUser = () => {
    $userState.update({
      ...$userState.value,
      age: 28
    })
  }

  return (
    <button onClick={handleUser}>Change the state</button>
  )
}
```

## Get Previous state

```js
import { Attachment } from "crown-state"
import { $userState, FakeStateType } from "../../global-states/user-state"

export function UserInfo() {
  const [user, setUser] = useState<FakeStateType>();
  const [previousUserValue, setPreviousUserValue] = useState<FakeStateType>();

  useEffect(() => {
    const att: Attachment = $userState.attach((value, previousValue) => {
      setUser(value)
      setPreviousUserValue(previousValue)
    })

    return () => {
      att.detach();
    }
  }, []);

  const handleUser = () => {
    $userState.update({
      ...$userState.value,
      age: 28
    })
  }

export function ShowPrevious() {

  return (
    <div>
      <div> Current State: {user?.age}</div>
      <div> Previous State: {previousUserValue?.age}</div>

      <button onClick={handleUser}>Change the state</button>
    </div>
  )
}
```

## Props
will be added

## License
[ISC](https://opensource.org/licenses/ISC)