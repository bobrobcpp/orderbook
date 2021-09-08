
import { observer } from 'mobx-react'
// import { useStore } from '../store'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
// const store = useStore(pageProps.initialState)
  return (
      <Component {...pageProps} />
  )
}
export default observer(MyApp)
