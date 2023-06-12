import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components'

import { defaultTheme } from '@theme/default'

import { Groups } from '@screens/Groups'
import { Loading } from '@components/Loading'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {hasLoadedFonts ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
