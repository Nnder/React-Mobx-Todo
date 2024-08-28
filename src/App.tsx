import './App.scss'
import { observer } from "mobx-react-lite"
import { myTimer } from './main'


const App = observer(() => <span>Seconds passed: {myTimer.secondsPassed}</span>)


export default App
