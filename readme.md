# Dungeon Game in Pure TypeScript Type System

A game implemented in pure compile time, pushing TypeScript's limit one step further.

Originally designed by [@fc01](https://github.com/fc01). This is a translated version for English readers.
NPM and stackblitz setup are also added.

[Trying it out in stackblitz](https://stackblitz.com/github/HerringtonDarkholme/type_game?file=src%2Findex.ts) does not quite work.
Using [Github Codespace](https://docs.github.com/en/codespaces/getting-started/quickstart) is the recommended way.

### DEMO

```ts
import { start } from './game'

start
.chooseStage
.stage6
.chooseRenderMode
['multiLine: Press [``] to render']
[`
💭💭💭💼💼💼💼💼💼💼💭💭💭
💼💼💼💼💭💭💭💭💭💼💭💭💭
💼💭💭💭🖤💼💼💼💭💼💭💭💭
💼💭💼💭💼💭💭💭💭💼💼💭💭
💼💭💼💭💥💭💥💼🖤💭💼💭💭
💼💭💼💭💭💭💭💭💼💭💼💭💭
💼💭🖤💼💥💭💥💭💼💭💼💭💭
💼💼💭💭💭💭💼💭💼💭💼💼💼
💭💼💭💼💼💼🖤💭💭💭💭👾💼
💭💼💭💭💭💭💭💼💼💭💭💭💼
💭💼💼💼💼💼💼💼💼💼💼💼💼
`]
.c__combo.a.a.a.a.w.w.w.a.a.over
[`
💭💭💭💼💼💼💼💼💼💼💭💭💭
💼💼💼💼💭💭💭💭💭💼💭💭💭
💼💭💭💭🖤💼💼💼💭💼💭💭💭
💼💭💼💭💼💭💭💭💭💼💼💭💭
💼💭💼💭💥💭💥💼🖤💭💼💭💭
💼💭💼💭💭👾💭💭💼💭💼💭💭
💼💭🖤💼💥💭💥💭💼💭💼💭💭
💼💼💭💭💭💭💼💭💼💭💼💼💼
💭💼💭💼💼💼🖤💭💭💭💭💭💼
💭💼💭💭💭💭💭💼💼💭💭💭💼
💭💼💼💼💼💼💼💼💼💼💼💼💼
`]
```
