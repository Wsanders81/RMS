import { Form, Formik, Field, ErrorMessage } from 'formik'
import { Card, CardContent, Typography, TextField, FormGroup, Box, Button } from '@mui/material'
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import {getTokenFromAPI} from '../actions/actions'
import { useDispatch } from 'react-redux';
import {forwardRef} from 'react'
import {ALERT} from '../actions/types'

const LoginForm = forwardRef((props, ref) => {
    const initialValues = {
        username: "", 
        password: ""

    }
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    
    
    return (
        <div style={{textAlign:"center"}}>
            
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
                    try{
                    let res = await dispatch(getTokenFromAPI(values.username, values.password))
                    
                    if(res.token) {
                        props.toggle()
                        dispatch({type:ALERT, typeOfNotify:"success", message: `Welcome back, ${values.username}!`})
                        navigate('/dashboard')
                    }
                } catch(err){
                    console.log(err)
                    dispatch({type:ALERT, typeOfNotify:"error", message: `Invalid username / password`})

                }
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
                            <Button style={{backgroundColor: '#81c784'}} variant="contained" type="submit" color="success" >Login</Button>
                           
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
        </div>
    )
})

export default LoginForm; 