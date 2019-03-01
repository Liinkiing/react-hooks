## React hooks
A simple personal list of useful hooks I've made for React.

## Installation
With yarn
```bash
$ yarn add @liinkiing/react-hooks
```

With npm
```bash
$ npm i @liinkiing/react-hooks
```

## Documentation
https://liinkiing.github.io/react-hooks/globals.html

## Example
```typescript jsx
import * as React from 'react'
import {FunctionComponent} from 'react'
import {useResize, useKeyboardShortcuts} from '@liinkiing/react-hooks';

const App: FunctionComponent = props => {
  const { height, width } = useResize()
  console.log(height, width)
  
  useKeyboardShortcuts([
    {
      action: () => { console.log("You've pressed I or S")},
      keys: ["I", "S"]
    },
    {
      action: () => { console.log("You've pressed O")},
      keys: ["O"]
    },
    {
      action: () => { console.log("You've pressed U")},
      keys: ["U"]
    }
  ])
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}

export default App
```
