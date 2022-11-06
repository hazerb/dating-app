import { useState } from "react"
import LoginComponent from "../../components/loginComponent";
import RegistrationComponent from "../../components/registrationComponent";
import logo from "../../rose.jpg"
import {Container, Row, Col} from 'reactstrap'
import './style.css'


function Landing({setLoggedIn}) {

    const [loginVisible, setLoginVisible] = useState(true)
    const [registrationVisible, setRegistrationVisible] = useState(false)

    const handleLoginVisibility = (isVisible) => {
        console.log("hee")
        setLoginVisible(isVisible);
    }
    
    const handleRegistrationVisibility = (isVisible) => {
        setRegistrationVisible(isVisible);
    };

    return(
        <Container>
            <Row xs='3'>
            <Col><p className="App-headers"> Quick Date</p></Col>
            <Col>
            {loginVisible && (
                <LoginComponent
                    handleLoginVisibility={handleLoginVisibility}
                    handleRegistrationVisibility={handleRegistrationVisibility}
                    setLoggedIn={setLoggedIn}
                />
            )}
            {registrationVisible && (
                <RegistrationComponent
                    handleLoginVisibility={handleLoginVisibility}
                    handleRegistrationVisibility={handleRegistrationVisibility}
                />
            )}
            </Col>
            <Col>
            <img src={logo} className="App-logos" />
            </Col>
            </Row>
        </Container>
    )
}

export default Landing