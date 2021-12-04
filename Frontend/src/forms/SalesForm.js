import { useState } from "react";
import {Box, FormGroup, FormControl, InputAdornment, TextField, Button} from '@mui/material'
export default function SalesForm({category, submit, submitted, unsubmit, invVals}){
    const [sales, setSales] = useState(invVals.Sales)
    const handleChange = (e) => {
        const {name, value} = e.target; 
        setSales(state => {
            return {
                ...state, 
                [name]: value
            }
        })
        
    }
    
    return (
        <Box>
           
            <FormControl>
            <TextField 
                
                type="number"
                label="Food Sales"
                value={sales.Food}
                onChange={handleChange}
                name="Food"
                disabled={submitted[category]}
                InputProps={{
                    startAdornment : (
                        <InputAdornment position="start">
                            $
                        </InputAdornment>
                    )
                }}
                />
            <TextField 
                type="number"
                label="Alcohol Sales"
                value={sales.Alcohol}
                onChange={handleChange}
                name="Alcohol"
                disabled={submitted[category]}
                InputProps={{
                    startAdornment : (
                        <InputAdornment position="start">
                            $
                        </InputAdornment>
                    )
                }}
                />
            <TextField 
                type="number"
                label="Beer Sales"
                value={sales.Beer}
                onChange={handleChange}
                name="Beer"
                disabled={submitted[category]}
                InputProps={{
                    startAdornment : (
                        <InputAdornment position="start">
                            $
                        </InputAdornment>
                    )
                }}
                />
            <TextField 
                type="number"
                label="NABev Sales"
                value={sales.NABev}
                onChange={handleChange}
                name="NABev"
                disabled={submitted[category]}
                InputProps={{
                    startAdornment : (
                        <InputAdornment position="start">
                            $
                        </InputAdornment>
                    )
                }}
                />
                {submitted[category] === false ? (
					<Button
						onClick={(e) => submit(e,category, sales)}
						variant="contained"
					>
						{`Submit ${category}`}
					</Button>
				) : (
					<Button onClick={() => unsubmit(category)}>
						Undo Submit
					</Button>
				)}
            </FormControl>
        </Box>
    )
}