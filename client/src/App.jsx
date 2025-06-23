import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import Aidats from "./pages/Aidats";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} >
            <Route  path="aidats" element={<Aidats />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
