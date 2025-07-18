import { TextStyle } from 'react-native'

export type WheelOfFortuneProps = {
  sectors: Array<string>
  winnerIndex: number
  onFinish: (winner: string, index: number) => void
  colors?: Array<string>
  borderColor?: string
  borderWidth?: number
  textStyle?: TextStyle
  innerRadius?: number
  result?: string | number
}

export type WheelOfFortuneRef = {
  spin: () => void
}
