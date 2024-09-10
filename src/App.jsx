import { BrowserRouter, Route, Routes } from "react-router-dom"
import Init from "./pages/Init"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Init />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App