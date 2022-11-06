import {Container, Row, Col} from 'reactstrap'
import './style.css'

function Frame({leftpart=null, middlepart, bottompart=null, rightPart=null}) {

    return(<div style={{paddingTop:100, position:'relative'}}>
        <Container>
            <Row xs='3'>
                <Col xs='2' className='Frame'>
                    <p style={{paddingRight:100, fontSize:40}}>
                        {leftpart}
                    </p>
                </Col>
                <Col xs='8' className='Frame'>
                    <>
                    {middlepart}
                    {bottompart}
                    </>
                </Col>
                <Col xs='2'>{rightPart}</Col>
            </Row>
        </Container>
        </div>
    )
}

export default Frame