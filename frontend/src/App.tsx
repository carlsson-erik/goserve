import tw from 'twin.macro'
import { Logo } from './components'
import Navbar from './components/navbar'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
  ],
}

const App = () => (
  <div css={styles.container({ hasBackground: true })}>
    <div tw="flex flex-col h-full gap-y-5">
        <Navbar />
    </div>
    <Logo />
  </div>
)

export default App
