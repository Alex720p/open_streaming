import { AppBar, Toolbar, Typography, IconButton, Avatar, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'


const Header = ( ) => {
    return (
        <AppBar>
            <Toolbar>
                    <Typography sx={{flexGrow: 1}}>Streaming</Typography>
                    <IconButton onClick={() => console.log('handle menu')} sx={{float: 'right'}}>
                        <Avatar alt="user avatar" src=""/>
                    </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header