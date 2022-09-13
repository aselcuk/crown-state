# Crown State

Crown State is a lightweight state management library.
Just listens to state and sends changes to page or component that attach

## Installation

Crown State is available as a package on NPM and YARN:

```bash
# NPM
npm install crown-state
```

```bash
# YARN
yarn add crown-state
```

## Documantation
The Crown State docs are located at [crown-state](https://crown-state-doc.vercel.app)

- [Intoduction](https://crown-state-doc.vercel.app/docs/intro)
- [React Usage](https://crown-state-doc.vercel.app/docs/intro)

## Create a global state object

Create a new global state and export it, you can use with type and initial values

```tsx
// user-state.ts

import State from "crown-state";

//Initial State Type
type UserType = {
  age: number;
  name: string;
};

export const $user = new State<UserType>({
  age: 27,
  name: "Selçuk",
});
```

## Listen the state

```tsx
import { $user } from "../user-state";
import { Attachment } from "crown-state";

/**
 * This method attaches to the relevant state and returns an Attachment 
 * type value. In case of any change on this state, both current state 
 * and previous state values can be accessed via the callback method.
 */
const att = Attachment = $user.attach((value, previousValue) => {
  console.log(value);
  console.log(previousValue);
});

/**
 * If you don't want to listen to the changes on this state, 
 * you can use the detach method.
 */
att.detach();
```

## Update the state

```tsx
import { $user } from "../user-state";

// To update the state just pass the values to the update method
$user.update({
  name: 'changed name',
  age: 28
});

// If you want to change only one field in state
$user.update({
  ...$user.value, // value gives you the current state value
  name: 'changed name'
});
```

## License
[ISC](https://opensource.org/licenses/ISC)