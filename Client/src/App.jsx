import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import './App.css'
import Routing from './routes/Routing'
import store from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routing></Routing>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
