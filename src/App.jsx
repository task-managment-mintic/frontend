import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Init from './pages/Init'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import NavBar from './components/NavBar'
import { HobbyProvider } from './context/HobbyContext'
import ProtectedRoute from './ProtectedRoute'
import { Box } from '@mui/material'

const App = () => {
    return (
        <AuthProvider>
            <HobbyProvider>
                <div>
                    <BrowserRouter>
                        <ConditionalNavBar />
                        <Box component='main' sx={{ flexGrow: 1, p: 3, ml: '200px'}}>
                            <Routes>
                                <Route path='/' element={<Init />} />
                                <Route element={<ProtectedRoute />}> 
                                    <Route path='/home' element={<Home />} />
                                    <Route path='/profile' element={<Profile />} />
                                </Route>
                            </Routes>
                        </Box>
                    </BrowserRouter>
                </div>
            </HobbyProvider>
        </AuthProvider>
    )
}

const ConditionalNavBar = () => {
    const location = useLocation()
    const shouldRenderNavBar = location.pathname !== '/'

    if (!shouldRenderNavBar) return null

    return <NavBar />
}

export default App