
import {Box, Typography, Button} from '@mui/material'
export default function InventoryModal({submit}){
    return (
        <Box className="Inventory-modal">
            <Typography className="Inventory-modal-topText" align="center">Are you sure you want to submit?</Typography>
            <Typography className="Inventory-modal-warningText" align="center"><b>This cannot be undone!</b></Typography>
            <Typography align="center">
            <Button onClick={submit} className="Inventory-modal-button"  variant="contained">Submit</Button>
            </Typography>
        </Box>
    )
}