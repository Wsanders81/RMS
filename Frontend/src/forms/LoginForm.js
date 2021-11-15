import { Form, Formik, Field, ErrorMessage } from 'formik'
import { Card, CardContent, Typography, TextField, FormGroup, Box, Button } from '@mui/material'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import {getTokenFromAPI} from '../actions/actions'
import { useDispatch, useSelector } from 'react-redux';

function LoginForm({ login }) {
    const initialValues = {
        username: "", 
        password: ""

    }
    const user = useSelector(store => store.userReducer.user)
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const notify = () => toast.error("Sorry, incorrect login information",{
        position: toast.POSITION.TOP_CENTER 
        
      })
    
    return (
        <div style={{textAlign:"center"}}>
            <ToastContainer 
            autoClose={2000}
            hideProgressBar={true}/>
        <Card sx={{margin: 'auto'}}>
            
            <CardContent>
                <Typography variant="h4" mb={2}>Login</Typography>
                <Formik 
                validationSchema={
                    object({
                        username: string().required().min(3).max(15), 
                        password: string().required().min(5).max(20)
                    })
                }
                initialValues={initialValues} onSubmit={async(values)=> {
                    let res = await dispatch(getTokenFromAPI(values.username, values.password))
                    if(res.token) {
                        navigate('/dashboard')
                    } else (
                        notify()
                        
                    )
                }}>
                    {({ values, errors }) => (
                        <Form >
                            
                            <FormGroup>
                            <Box mb={2}>
                            <Field name="username" as={TextField} label="Username"/>
                            <ErrorMessage name="username" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            
                            <Box mb={2}>
                            <Field name="password" type="password" as={TextField} label="Password"/>
                            <ErrorMessage name="password" render={ msg => <div style={{ color: 'red'}}>{msg}</div>}/>
                            </Box>
                            </FormGroup>
                            <Button style={{backgroundColor: '#81c784'}} variant="contained" type="submit" color="success" >beg for a job</Button>
                           
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
        </div>
    )
}

export default LoginForm; 