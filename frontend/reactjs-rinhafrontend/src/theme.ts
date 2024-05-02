import { PaletteOptions, createTheme } from "@mui/material"

const palette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#037ffc',
        contrastText: '#fff'
    },
    background: {
        default: '#212020'
    }
}

const theme = createTheme({
    palette
});

export default theme;