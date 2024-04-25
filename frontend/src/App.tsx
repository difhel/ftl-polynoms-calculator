import './App.css'
import { Stack, useAppearance } from '@nacteam/sdfui'
import { Operations, Polynoms, Result, useDialog } from './components'

function App() {
  const { appearance } = useAppearance();
  const { dialog } = useDialog()!;

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
      {dialog}
    </div>
  )
}

export default App
