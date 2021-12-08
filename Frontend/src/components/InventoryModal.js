
import {Box, Typography, Button} from '@mui/material'
export default function InventoryModal({submit, message, buttonText, color, ref}){
    return (
        <Box className="Inventory-modal" ref={ref}>
            <Typography className="Inventory-modal-topText" align="center">{message}</Typography>
            <Typography className="Inventory-modal-warningText" align="center"><b>This cannot be undone!</b></Typography>
            <Typography align="center">
            <Button onClick={submit} className="Inventory-modal-button" color={color} variant="contained">{buttonText}</Button>
            </Typography>
        </Box>
    )


}
