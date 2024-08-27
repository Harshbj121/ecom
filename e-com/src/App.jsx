import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import {Provider} from "react-redux";
import appStore from './utilities/appStore.';

function App() {

  return (
    <Provider store={appStore}>
      <div className="app-container">
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default App
