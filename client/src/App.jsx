import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import Aidats from "./pages/Aidats";
import AddTransaction from "./pages/AddTransaction";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} >
            <Route  path="aidats" element={<Aidats />} />
            <Route  path="add-transaction" element={<AddTransaction />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
