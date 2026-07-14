# Build Tower 🏗️🐵

A cartoon-styled mobile **math puzzle game** built with Expo and React Native.
Grow your tower to match the target using arithmetic — one careful step at a time.

Fully **offline**: there is no backend and no account. All progress (currency,
power-ups, unlocked levels, daily streak) is stored locally on the device.

## Gameplay

1. **Build the first tower.** Spin the Wheel of Fortune to generate a target tower
   of *N* blocks.
2. **See your goal.** Each level shows three reward tiers:
   - 🥇 **Gold** — land *exactly* on the target (full prize)
   - 🥈 **Silver** — reach ~90% of the target
   - 🥉 **Bronze** — reach ~80% of the target
   - Overshoot the target and you lose the round.
3. **Build the second tower.** Starting from a small value, each step you pick **one
   of two** operations (`+`, `−`, `×`, `÷`) and a number. The game rubber-bands the
   offered options toward the target as you get close.
4. **Finish** within the level's step limit. Stars unlock later levels; bananas 🍌
   (the in-game currency) buy power-ups.

### Progression & economy
- **30 levels** across three difficulties (Easy / Medium / Hard), themed after world
  cities (New York → Yangon).
- **Bananas** — earned by clearing levels and from the daily streak; spent in the
  Market.
- **Power-ups** — Add / Remove Random Blocks (Bronze / Silver / Gold grades) and
  Add Extra Step, purchasable in the Market and awarded on the calendar.
- **Activity Calendar** — a 14-day login streak with escalating rewards.
- **Awards** — repeat-based achievements that pay out prizes.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Expo SDK 54, React Native 0.81 (New Architecture) |
| Language | TypeScript (strict) |
| State | Redux Toolkit + AsyncStorage persistence |
| Navigation | React Navigation (native stack) |
| Animation | Moti, React Native Reanimated, Lottie, `expo-linear-gradient` |
| UI | `expo-image`, `react-native-svg`, custom atomic-design component library |
| Tooling | ESLint + Prettier, Husky, Commitlint (conventional commits) |

## Getting started

### Prerequisites
- Node.js 18+ and npm
- [Expo](https://docs.expo.dev/) tooling (`npx expo`)
- iOS Simulator (Xcode) and/or Android emulator (Android Studio), or the Expo Go /
  a dev client on a physical device
- This project uses native modules (gesture-handler, reanimated, svg, lottie), so it
  runs through an **Expo dev client**, not plain Expo Go.

### Install & run

```bash
npm install

npm start        # start Metro, then choose a target
npm run ios      # build & open on iOS
npm run android  # build & open on Android
npm run web      # run in the browser (react-native-web)
```

### Environment
`react-native-dotenv` is configured (imports from `@env`, `allowUndefined: false`),
so a `.env` file may be required if/when env vars are referenced.

## Project structure

```
src/
├─ components/        # atomic-design UI library
│  ├─ atoms/          # Button, IconButton, OutlinedText, BlockIcon, ...
│  ├─ molecules/      # Header, LevelCard, MonkeyAnimation, ...
│  ├─ organisms/      # Modals, WheelOfFortune, ...
│  └─ wrappers/       # RootStackWrapper (boot gate), EdgeGlowOverlay, ...
├─ constants/         # LEVEL_CONFIG, rewards, prices, z-index map
├─ hooks/             # asset preloading / readiness
├─ navigation/        # GameStack (native stack)
├─ providers/         # SettingsProvider (sound, language, isTablet)
├─ screens/           # WelcomeScreen, LevelsScreen, GameScreen
├─ services/          # AsyncStorage persistence per Redux slice
├─ store/             # Redux Toolkit store + slices + typed hooks
├─ theme/             # Colors, Typography, GlobalStyles, scaling helpers
├─ types/             # enums + shared types
└─ utils/             # pure game logic (level math, wheel, options)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` / `android` / `web` | Run on a target platform |
| `npm run lint` / `lint-fix` | Lint (and auto-fix) |
| `npm run commit` | Guided conventional commit (commitizen) |
| `npm run create-component-ui <Name>` | Scaffold a component folder |

## Status

Playable single-player build. Language switching and rewarded-ad features
("double prize") are scaffolded in the UI but not yet enabled. See
[`CLAUDE.md`](CLAUDE.md) for architecture details and known rough edges.
