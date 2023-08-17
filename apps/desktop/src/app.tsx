import * as ReactDOM from 'react-dom/client'

const App = () =>
  <>
    <div>
      Hello world
    </div>
  </>

function render() {
  const root = ReactDOM.createRoot(document.getElementById('app'))
  root.render(<App/>)
}

render()
