import { BrowserRouter, Route, Routes } from "react-router-dom"
import Init from "./pages/Init"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { AuthProvider } from "./context/AuthContext"
import NavBar from "./components/NavBar"

const App = () => {
    return (
        <AuthProvider>
            <div>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<Init />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    )
}

export default App