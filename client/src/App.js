import Home from "./components/home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { LoginPage, SignUpPage } from "./components/loginPage";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={< Home />}></Route>
      <Route exact path='/login' element={< LoginPage />}></Route>
      <Route exact path='/signup' element={< SignUpPage />}></Route>
      </Routes>
    </Router>
  )
};
