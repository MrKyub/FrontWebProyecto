import { HashRouter , Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Principal from "./components/Principal";
import PaginaError from "./components/PaginaError";
import Secundaria from "./components/Secundaria";
import Terciaria from "./components/Terciaria";
import error from "./img/paginaError.jpg";

function App() {
  return (
    <>
      <HashRouter>
        <Menu/>
        <Routes>

          <Route path = "/" element = {<Principal/>}/>
          <Route path = "/secundaria" element = {<Secundaria/>}/>
          <Route path = "/terciaria" element = {<Terciaria/>}/>
          <Route path = "*" element = {<PaginaError url = {error}/>}/>

        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
