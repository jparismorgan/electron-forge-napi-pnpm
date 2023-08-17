import * as ReactDOM from 'react-dom/client'

// Works locally, but not with make (Cannot find module '/native_modules/llm.node')
const LlmModule = require('../../../packages/llm')

// Works locally, but not with make (fails to build).
// import LlmModule from '../../../packages/llm'

// Doesn't work locally, but not with make (Cannot find module 'llm') - though I get Cannot find module '/native_modules/llm.node' if I don't have the externals.
// import LlmModule = require('llm')

console.log('LlmModule', LlmModule.addNumbers(1, 2))

const App = () =>
  <div>
    Hello world
  </div>

function render() {
  const root = ReactDOM.createRoot(document.getElementById('app'))
  root.render(<App/>)
}

render()
