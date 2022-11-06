import {Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'


function LoginComponent({handleLoginVisibility, handleRegistrationVisibility, setLoggedIn}){

    const navigate = useNavigate();
    const [loginSuccessful, setLoginSuccessfull] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)
    const [inputFailed, setInputFailed] = useState(false)
    const [input, setInput] = useState({
        email: null,
        password: null,
    });

    const handleLogin = async(e) => {
        e.preventDefault();
        if(input.email == null || input.password == null){
            setInputFailed(true)
            return 
        }
        try{
            const response = await fetch('http://localhost:8020/auth/login', {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                    }
                },
            )
            if(response.status == 202){
                const body = await response.json()
                localStorage.setItem("token", body.token);
                localStorage.setItem("user", body.userId);
                setLoginSuccessfull(true)
            }else{
                setLoginFailed(true)
            }
        }catch(e){
            console.log(e)
        }
      };

    useEffect(() => {
        if(loginSuccessful){
            setLoggedIn(true)
            navigate("/home");
        }
    }, [loginSuccessful])

    return (
        <Form className='Form'>
            <FormGroup>
                <Label>
                    email
                </Label>
                <Input required
                    id='x'
                    name='email'
                    placeholder='example@gmail.com'
                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                    type='email'
                />
            </FormGroup>
            <FormGroup>
                <Label>
                    password
                </Label>
                <Input required
                    id='y'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                    type='password'
                />
            </FormGroup>
            <Button
                style={{backgroundColor:'#6a9e5b'}}
                onClick={handleLogin}
            >
                Login
            </Button>
            <Button 
                style={{marginTop:'20px', backgroundColor:'green'}}
                onClick={(e) => {
                    handleLoginVisibility(false);
                    handleRegistrationVisibility(true);
                  }}
            >
                No Account? Register
            </Button>
            {inputFailed && (
                <Alert>
                    Please fill all fields.
               </Alert>
            )}
            {loginFailed && (
                <Alert>
                    Wrong username or password. Please try again.
                </Alert>
            )}
        </Form>
        
    );
}

export default LoginComponent