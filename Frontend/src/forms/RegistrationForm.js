import { Form, Formik, Field, ErrorMessage } from 'formik'
import { Card, CardContent, Typography, TextField, FormGroup, Box, Button } from '@mui/material'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { registerUser } from '../actions/actions'
import { useDispatch } from 'react-redux'
export default function RegistrationForm({ toggle }) {
    const initialValues = {
        username: "", 
        firstName: "", 
        lastName: "", 
        email: "", 
        password: ""

    }
    const notify = () => toast.error("Username already taken",{
        position: toast.POSITION.TOP_CENTER 
        
      })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div style={{textAlign:"center"}}>
            <ToastContainer 
            autoClose={2000}
            hideProgressBar={true}/>
        <Card sx={{margin: 'auto'}}>
            
            <CardContent>
                <Typography variant="h4" mb={2}>Sign Up</Typography>
                <Formik 
                validationSchema={
                    object({
                        username: string().required("Required").min(2, "Too Short!").max(15), 
                        firstName: string().required("Required").min(3, "Too Short!").max(20), 
                        lastName: string().required("Required").min(3, "Too Short!").max(20),
                        email: string().email("Invalid Email").required("Required"), 
                        password: string().required('Required').min(5, "Add some more characters!").max(20, "How long does your password need to be?")
                    })
                }
                initialValues={initialValues} onSubmit={async(values) => {
                    try {
                        let res = await dispatch(registerUser(values))
                        
                        if(res.token) {
                            toggle()
                            navigate('/dashboard')
                        } 
                    } catch(err) {
                        notify()
                        console.log(err)
                    }
                    
                    
                }}>
                    {({ values, errors }) => (
                        <Form style={{height: '100vh'}} >
                            
                            <FormGroup>
                            <Box mb={2}>
                            <Field name="username" as={TextField} label="Username"/>
                            <ErrorMessage name="username" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}>
                                
                            </ErrorMessage>
                            </Box>
                            <Box mb={2}>
                            <Field name="firstName" as={TextField} label="First Name"/>
                            <ErrorMessage name="firstName" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="lastName" as={TextField} label="Last Name"/>
                            <ErrorMessage name="lastName" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="email" as={TextField} label="Email"/>
                            <ErrorMessage name="email" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            <Box mb={2}>
                            <Field name="password" type="password" as={TextField} label="Password"/>
                            <ErrorMessage name="password" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            </FormGroup>
                            <Button variant="contained" type="submit" style={{backgroundColor: '#81c784'}} >Get Started</Button>
                            
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
        </div>
    )
}