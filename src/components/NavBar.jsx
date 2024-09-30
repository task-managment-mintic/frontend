import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from '@mui/material'
import { Home, ManageAccounts } from '@mui/icons-material'

const NavBar = () => {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    return (
        <Drawer variant='permanent'
            anchor='left'
            sx={{
                width: '200px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '200px',
                    boxSizing: 'border-box',
                    bgcolor: '#000',
                    color: '#fff'
                }
            }}
        >
            <Toolbar>
                <Typography>
                    Logo APP
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={{ marginTop: '100px' }}>
                <ListItem>
                    <ListItemIcon>
                        <Home sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <Link to='/home'>Inicio</Link>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ManageAccounts sx={{ color: '#fff' }}/>
                    </ListItemIcon>
                    <Link to='/profile'>Mi Perfil</Link>
                </ListItem>
            </List>
            <Divider />
            <List sx={{ marginTop: '80px '}}>
                <ListItem>
                    <ListItemButton sx={{
                        color: '#000',
                        backgroundColor: '#c3bc7c',
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000'
                        }
                    }}
                        onClick={handleSignOut}
                    >
                        Cerrar Sesión
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default NavBar