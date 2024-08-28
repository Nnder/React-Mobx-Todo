import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { makeAutoObservable } from 'mobx'

class Timer {
  secondsPassed = 0

  constructor() {
      makeAutoObservable(this)
  }

  increaseTimer() {
      this.secondsPassed += 1
  }
}

export const myTimer = new Timer()

setInterval(()=>{
  myTimer.increaseTimer()
}, 1000)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
