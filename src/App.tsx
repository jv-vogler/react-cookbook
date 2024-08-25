import { ErrorBoundary } from 'react-error-boundary'

import { useTodos } from './hooks/useTodos'

function App() {
  return (
    <div>
      <ErrorBoundary fallback={<>Something went terribly wrong...</>}>
        <MyComponent />
      </ErrorBoundary>
    </div>
  )
}

export default App

const MyComponent = () => {
  const { data, error } = useTodos()

  return (
    <div>
      <h1>Todos</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {error ? (
        <>
          <p>error: </p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      ) : null}
    </div>
  )
}
