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

```js
import { Attachment } from "crown-state"
import { $userState, FakeStateType } from "../../global-states/user-state"

export function UserInfo() {
  const [user, setUser] = useState<FakeStateType>()

  useEffect(() => {
    const att: Attachment = $userState.attach(data => setState(data))

    return () => {
      att.detach();
    }
  }, []);

  return (
    <span>{user?.name}</span>
  )
}
```

## Props
will be added

## License
[ISC](https://opensource.org/licenses/ISC)