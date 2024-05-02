import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';

export function Navbar(){

    return(
        <AppBar position="static" enableColorOnDark>
            <Toolbar>
                <IconButton color="inherit" edge="start">
                    <PaidIcon/>
                </IconButton>
                <Typography variant="h6">Gerenciador de Transacao</Typography>
            </Toolbar>
        </AppBar>
    );
}