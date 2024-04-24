import './App.css'
import { Stack, useAppearance } from '@nacteam/sdfui'
import { Operations, Polynoms, Result } from './components'

function App() {
  const { appearance } = useAppearance()

  return (
    <div className={appearance} style={{ height: "100%" }}>
      <Stack direction={'row'} spacing={6} style={{ height: "100%" }}>
        <Polynoms />
        <Stack
          direction={'column'}
          style={{ width: "100%" }}
          spacing={6}
        >
          <Operations />
          <Result />
        </Stack>
      </Stack>
    </div>
  )
}

export default App
