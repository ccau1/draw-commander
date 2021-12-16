# Draw Commander

The base structure is based on the [PIXI.js](https://pixijs.com/) library and it provides both class level and component (React) level access to the features. The aim is to maintain functionality while providing flexibility in switching frameworks (ie. React, React-Native, Angular).

Commands are extendable so we can enjoy scalability without reading through all the code!

## Run Development

`yarn i` - install required dependencies

`yarn start` - start project in development

## Run Production

`yarn build` - build the project into a compact optimized bundle in `/build` folder. This folder can be deployed as a static website.

## Component Usage

### Basic Usage

```typescript
import DrawCommander from "./components/DrawCommander";

const App = () => {
  return <DrawCommander />;
};
```

### Extending Commands

```typescript
import DrawCommander from "./components/DrawCommander";

const commands = {
  circle: {
    run: ({ canvas, args }) => {
      // draw to canvas here
    },
    alias: ["cir"],
  },
};

const App = () => {
  return <DrawCommander commands={commands} />;
};
```

## Commands

The following commands includes and also extends additional commands such as `remove` and `clear`. The commands are extendable both within the DrawCommander component and outside using prop `commands={extendedCommands}`.

| Command    | Arguments   | Description                                  |
| ---------- | ----------- | -------------------------------------------- |
| C          | w h         | create/resize a canvas to a width and height |
| L, line    | x1 y1 x2 y2 | draw a line between two coordinates          |
| R, rect    | x1 y1 x2 y2 | draw a rectangle between two coordinates     |
| B          | x y c       | fill an area of same color with a new color  |
| rm, remove |             | remove last added element (ie. line, rect)   |
| clear      |             | clears canvas                                |

## TODO

[ ] handle export & save

[ ] touch gestures

[ ] add undo/redo

[ ] track time for each action (for playback)
