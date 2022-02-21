import { Typography } from '@mui/material'

const Info = (props) => {
    return (
        <Typography variant="body2" sx={{color: props.type == 'success' ? 'green' : 'red'}}>{props.type}: {props.text}</Typography>
    )
}

export default Info

//needs a type and text passed: type is either 'success' or 'error'