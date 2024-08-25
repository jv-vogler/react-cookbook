import { makeLogger } from './shared/logger'

function App() {
  const logger = makeLogger(console)

  logger.info('Info')
  logger.error('Error')
  logger.warn('Warn')

  return <>Hello World</>
}

export default App
