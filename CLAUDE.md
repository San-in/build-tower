# CLAUDE.md

Guidance for working in this repository.

## What this is

**Build Tower** is an offline mobile math-puzzle game built with Expo (SDK 54) and
React Native 0.81 (New Architecture enabled). There is **no backend** — every piece
of state lives on the device (Redux Toolkit + AsyncStorage). The player grows a
"second tower" from a small starting value to match a randomly generated "first
tower" height, choosing one of two arithmetic operations each step. 30 levels,
grouped Easy / Medium / Hard, themed after world cities.

## Commands

```bash
npm start          # expo start (Metro)
npm run ios        # open on iOS simulator / device
npm run android    # open on Android emulator / device
npm run web        # web target (react-native-web)
npm run lint       # eslint .
npm run lint-fix   # eslint . --fix
npx tsc --noEmit   # type-check (must stay clean)
npm run commit     # commitizen (conventional commits, enforced by commitlint + husky)
```

There is no automated test suite wired up despite `jest`/`jest-expo` being installed.
Verify changes by running the app and driving the affected flow.

## Architecture

### Boot sequence
`index.ts` → `registerRootComponent(App)`. Provider tree in `App.tsx`, outermost first:

```
SettingsProvider (React Context, deliberately OUTSIDE Redux)
└ ReduxProvider (store)
  └ GestureHandlerRootView
    └ SafeAreaProvider (initialWindowMetrics)
      └ NavigationContainer
        └ RootStackWrapper   ← the real boot gate
          └ GameStack
```

`RootStackWrapper` (`src/components/wrappers/RootStackWrapper`) is where startup
actually happens: it loads the Bell Gothic fonts (expo-font), hydrates the five
Redux slices in parallel via service thunks, then dispatches
`checkAndUpdateOnAppStart` (daily-streak logic). Until fonts + hydration + the
SettingsProvider's `hydrated` flag are all ready it renders a full-screen
`ActivityIndicator`. The native splash (expo-splash-screen) auto-hides; the code
never calls `preventAutoHideAsync`/`hideAsync`.

### Navigation
A single `createNativeStackNavigator` (`src/navigation/GameStack`). Three screens,
all `headerShown: false`, `fade` animation:
`WelcomeScreen` (initial) → `LevelsScreen` → `GameScreen` (param: `{ level: LevelId }`).
Route names come from the `SCREENS` enum. `@react-navigation/stack` and
`bottom-tabs` are installed but **unused**.

### State (`src/store`)
Redux Toolkit, five slices: `bananas`, `levels`, `market`, `userActivity`, `awards`.
- Each slice has a matching service in `src/services` that owns AsyncStorage
  persistence. `store/index.ts` calls each `setup*Persistence()` at **module import
  time**; each registers a `store.subscribe` listener that debounces a write
  (200–250 ms) whenever its slice changes.
- Hydration is the reverse: `hydrate*` thunks read AsyncStorage and dispatch
  `setAll*` on startup.
- Typed hooks: `useAppSelector` / `useAppDispatch` from `src/store/hooks.ts`. Always
  use these, not the untyped react-redux hooks.
- **App settings (sound / language) are NOT in Redux** — they live in
  `SettingsProvider` with its own AsyncStorage keys (`settings:*`). This is the only
  AsyncStorage user outside `src/services`.

### Game logic (`src/utils`)
Pure, deterministic functions (except three RNG helpers), barrel-exported via
`src/utils/index.ts`. This is the game's math core — treat it carefully:
- `calculateExpectedLevelConditions(target)` → `[gold, silver, bronze]` thresholds
  (gold = target, silver ≈ ceil(90%), bronze ≈ ceil(80%), each strictly below the
  previous).
- `getLevelResult` maps the final block count to a medal / Too High / Too Low.
- `calculateWheelResult` applies a wheel sector string (`'+5'`, `'x2'`, `'÷2'`) to a
  value. Parses `operation.charAt(0)` as the operator — **operator glyphs must match
  the `OPERATOR` enum** (`+`, `-`, `x`, `÷`).
- `nextStepOptionsUtils` builds the two option cards with rubber-banding
  (`showIsUserNeedHelp`, `getOptionOperators`, `getOptionNumberByOperator`).
- `calculateConsolationPrize`, `generateInitialLevels`, `calculateIsLevelAvailable`,
  `generateRandomNumber`, `generateRandomOperator`.

Game tuning data (all 30 levels, prices, rewards, streak table) is hard-coded in
`src/constants/index.ts` (`LEVEL_CONFIG`, `LEVEL_NAMES`, `MARKET_PRODUCT_PRICE`,
`CALENDAR_REWARDS`, etc.).

### Screens
- `GameScreen` (~1450 lines) — the whole gameplay loop: build first tower via
  Wheel of Fortune → show level conditions → build second tower → step loop
  (pick operation, monkey animation, apply to block count) → result modal.
- `WelcomeScreen` — hub: side menu, Market / Awards / Settings modal, streak
  Activity Calendar bottom sheet.
- `LevelsScreen` — level picker.

### Components (`src/components`)
Atomic design: `atoms/`, `molecules/`, `organisms/`, `wrappers/`, each with a barrel
`index.ts`. Component convention: `Name/Name.tsx` + `Name.styles.ts`
(`StyleSheet.create`) + `Name.types.ts` + `index.ts`.

Visual language is cartoon-game: `OutlinedText` (fake text stroke via 4 absolutely
positioned copies), `expo-linear-gradient` fills, `expo-image` with placeholder
colors, **Moti** (`MotiView` / `AnimatePresence`) for declarative animation, RN
`Animated` for loops, **Lottie** for characters/celebrations.

## Conventions

- **Path aliases** (tsconfig `paths`, resolved by Metro — babel has no
  module-resolver): `@components/*`, `@providers`, `@types`, `@screens`, `@utils`,
  `@theme`, `@navigation/*`, `@validation`, `@constants`, `@store/*`, `@assets/*`,
  `@services`, `@hooks`. Most point at an `index.ts` barrel.
- **Theme** (`@theme`): `COLORS` (flat palette with 10 alpha steps per color +
  gradient ramps), `TextStyles` / `FONT_FAMILY`, `GlobalStyles`. No light/dark theme.
- **Z-index**: use `Z_INDEX_TYPE` from `@constants` (keyed by the `Z_INDEX_PRIORITY`
  enum), never raw numbers.
- **SVGs** import as React components (`react-native-svg-transformer`); `.lottie` and
  `.svg` handling is configured in `metro.config.js`.
- **Imports** are auto-sorted (`eslint-plugin-simple-import-sort`); inline styles are
  an ESLint **error** (`react-native/no-inline-styles`) — put styles in `.styles.ts`.
- **Commits**: conventional commits enforced by commitlint + husky. Use `npm run commit`.

## Responsive styling

The app targets phones **and** tablets (`app.json` locks portrait orientation;
`supportsTablet: true`). Styles use **raw design values** sized for phones
(baseline iPhone 11, 414 × 896 pt) — there is **no scaling layer**. Do not
re-introduce `scale()`/`verticalScale()`/`moderateScale()`/`scaleFont()` helpers;
they were tried and deliberately removed. Write plain numbers in `.styles.ts`.

- `IS_TABLET` (in `src/constants`, from `expo-device` deviceType + a
  `Platform.isPad` fallback) and `isTablet` from `useSettings()` are available if a
  screen ever needs a coarse tablet branch, but nothing scales by default.
- `OutlinedText` fakes a stroke with 5 layers; when it needs to shrink to fit
  (`adjustsFontSizeToFit` + `numberOfLines`) it measures once and applies **one**
  size to all layers so the outline stays crisp. Give it a bounded-width
  `containerStyle` for the fit to work.
- **Absolutely-positioned overlays anchored to another component** (monkey
  notification bubble, power-up count badge, Wheel-of-Fortune knob, `CustomModal`
  monkey, exclamation badge, Celebration monkey, `Button` depth border) must keep
  their anchor offsets consistent with the host. The Celebration monkey and the
  user-tower monkey anchor to the tower's **actual height**
  (`blocks * BLOCK_DIMENSION`), not a fixed offset.

## Known rough edges (pre-existing)

Do not be surprised by these; fix opportunistically, but they are not regressions:
- Typos baked into the codebase: `fistTower` (should be `firstTower`) throughout
  `LEVEL_CONFIG` and types; directory `AcitvityModal` (should be `ActivityModal`);
  `СheckBox` folder starts with a **Cyrillic** С; enum values with trailing spaces
  (`GAME_MODAL_TYPE.Reset = 'reset '`, `MODAL_TYPE.Green = 'green '`).
- `src/store/slices/awardsSlice.ts` imports config from a **screen** folder
  (store → UI layering inversion).
- `src/validation/index.ts` is empty; language switching and ad/"double prize"
  features are scaffolded but disabled.

Previously-known logic bugs that have now been **fixed** (2026-07): `*`→`x` wheel
glyphs on levels 28–30; `getOptionOperators` argument order in `GameScreen`;
`ActivityCalendar` double-claim race; non-positive medal thresholds for tiny
targets; wheel division/multiplication now rounded to whole blocks; persisted
market/awards state is merged over defaults on hydration; and the level-unlock
gate now checks only the immediately preceding level, requiring stars by the
unlocked level's difficulty (Easy 1, Medium 2, Hard 3) — previously it demanded
that star count on *every* earlier level.
