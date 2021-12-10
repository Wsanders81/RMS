
import { Form, Formik, Field, ErrorMessage } from 'formik'
import { Card, CardContent, Typography, TextField, FormGroup, Box, Button } from '@mui/material'
import { object, string } from 'yup'
import { useDispatch } from 'react-redux'
import { forwardRef } from 'react'
const SupplierForm = forwardRef((props, ref) => {
    const initialValues = {
        name: "", 
        address: "", 
        phone: "", 
        email: "", 
        notes: ""

    }
    const dispatch = useDispatch()
    const {submit} = props; 
    return (
        <div className="Supplier-modal">
           
        <Card sx={{margin: 'auto', height: "100%"}}>
            
            <CardContent>
                <Typography variant="h4" mb={2}>Add New Supplier</Typography>
                <Formik 
                validationSchema={
                    object({
                        name: string().required("Required").min(2, "Too Short!").max(15), 
                        address: string().required("Required").min(3, "Too Short!").max(20), 
                        phone: string().required("Required").min(3, "Too Short!").max(20),
                        email: string().email("Invalid Email").required("Required")
                    })
                }
                initialValues={initialValues} onSubmit={async(values) => {
                    try {
                        let res = await submit(values)
                        return res; 
                    
                    } catch(err) {
                        dispatch({type: "ALERT", typeOfNotify: "error", message: "That supplier name is already taken"})
                    }
                    
                }}>
                    {({ values, errors }) => (
                        <Form  >
                            
                            <FormGroup>
                            <Box mb={2}>
                            <Field name="name" as={TextField} label="Supplier Name"/>
                            <ErrorMessage name="name" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}>
                                
                            </ErrorMessage>
                            </Box>
                            <Box mb={2}>
                            <Field name="address" as={TextField} label="Address"/>
                            <ErrorMessage name="address" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="phone" as={TextField} label="Phone Number"/>
                            <ErrorMessage name="phone" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="email" as={TextField} label="Email"/>
                            <ErrorMessage name="email" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="notes" type="notes" as={TextField} label="Notes"/>
                            <ErrorMessage name="notes" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            </FormGroup>
                            <Button variant="contained" type="submit" style={{backgroundColor: '#81c784'}} >Submit</Button>
                            
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
        </div>
    )
})

export default SupplierForm;