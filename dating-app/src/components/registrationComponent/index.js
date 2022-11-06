import {Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap'
import { useState } from "react";



function RegistrationComponent({handleLoginVisibility, handleRegistrationVisibility}){
    
    const [input, setInput] = useState({
        email: null,
        password: null,
        name: null,
        instagram: null,
        age: null,
        gender: "male",
        preference: "female"
    });
    const [registerSuccessful, setRegisterSuccessfull] = useState(false)
    const [inputFailed, setInputFailed] = useState(false)

    const handleRegister = async(e) => {
        e.preventDefault();
        if(input.email == null || input.password == null || input.name == null || input.instagram == null || input.age == null){
            setInputFailed(true)
            return
        }
        try{
            const accountResponse = await fetch('http://localhost:8020/auth/signup', {
                method: 'POST',
                body: JSON.stringify({email: input.email, password: input.password}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                    }
                },
            )           
            const profileResponse = await fetch('http://localhost:8020/profile/info', {
                method: 'POST',
                body: JSON.stringify({name: input.name, age: input.age, instagram: input.instagram, gender: input.gender, preference: input.preference}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                    }
                },
            )
            if(accountResponse.status == 202 && profileResponse.status == 202){
                setRegisterSuccessfull(true)
            }else{
                console.log("error")
            }
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Form className='Form'>
            <FormGroup>
                <Label>
                    name
                </Label>
                <Input
                    id='x'
                    name='text'
                    required={true}
                    placeholder=''
                    onChange={(e) => setInput({ ...input, name: e.target.value })}
                    type='text'
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleNumber">
                    age
                </Label>
                <Input
                    id="exampleNumber"
                    required={true}
                    name="number"
                    placeholder=""
                    onChange={(e) => setInput({ ...input, age: e.target.value })}
                    type="number"
                />
            </FormGroup>
            <FormGroup>
                <Label>
                    email
                </Label>
                <Input
                    id='z'
                    name='email'
                    placeholder='example@gmail.com'
                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                    required={true}
                    type='email'
                />
            </FormGroup>
            <FormGroup>
                <Label>
                    password
                </Label>
                <Input
                    id='1'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                    required={true}
                    type='password'
                />
            </FormGroup>
            <FormGroup>
                <Label>
                    instagram username
                </Label>
                <Input
                    id='x'
                    name='text'
                    placeholder='example123'
                    required={true}
                    onChange={(e) => setInput({ ...input, instagram: e.target.value })}
                    type='text'
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">
                    gender
                </Label>
                <Input
                    id="3"
                    name="select"
                    type="select"
                    onChange={(e) => setInput({ ...input, gender: e.target.value })}
                >
                <option>
                    male
                </option>
                <option>
                    female
                </option>
                <option>
                    other
                </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label 
                    for="exampleSelect">
                        preference
                </Label>
                <Input
                    id="4"
                    name="select"
                    type="select"
                    onChange={(e) => setInput({ ...input, preference: e.target.value })}
                >
                <option>
                    female
                </option>
                <option>
                    male
                </option>
                <option>
                    other
                </option>
                </Input>
            </FormGroup>
            <Button
                style={{backgroundColor:'#6a9e5b'}}
                onClick={handleRegister}
            >
                Submit
            </Button>
            <Button 
                style={{marginTop:'20px', backgroundColor:'rgb(98, 165, 185)'}}
                onClick={(e) => {
                    handleLoginVisibility(true);
                    handleRegistrationVisibility(false);
                  }}
            >
                Back to Login
            </Button>
            {inputFailed && (
                <Alert>
                    Please fill all fields.
               </Alert>
            )}
            {registerSuccessful && (
                <Alert color="info">
                    You are successfully registered. Please go back to login.
              </Alert>
            )}
        </Form>
    );

}

export default RegistrationComponent