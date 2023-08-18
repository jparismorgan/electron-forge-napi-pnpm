import { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

// Works locally, but not with make (Cannot find module '/native_modules/llm.node')
const LlmModule = require('../../llm')

// Works locally, but not with make (fails to build).
// import LlmModule from '../../../packages/llm'

// Doesn't work locally, but not with make (Cannot find module 'llm') - though I get Cannot find module '/native_modules/llm.node' if I don't have the externals.
// import LlmModule = require('llm')

const App = () => {
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    const computedResult = LlmModule.addNumbers(1, 2)
    console.log('[app@useEffect] computedResult', computedResult)
    setResult(computedResult)
  }, [])

  return (
    <div>
      Hello world - {result ? `1 + 2 = ${result}` : 'Have not computed result yet.'}
    </div>
  )
}

function render() {
  const root = ReactDOM.createRoot(document.getElementById('app'))
  root.render(<App/>)
}

render()
