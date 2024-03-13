import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppAppBar from './containers/AppAppBar'
import SignIn from './components/SignIn.tsx'
import SignUp from './components/SignUp.tsx'

function App() {
    return (
      <>
        <Routes>
          <Route path={"/"} element={<AppAppBar/>} />
          <Route path={"sign-up"} element={<SignUp/>} />
          <Route path={"sign-in"} element={<SignIn/>} />
        </Routes>
      </>
    );
}

export default App
