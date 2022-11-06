import HeaderMenu from "../../components/headerMenu";
import Frame from "../../components/frame";
import './style.css'
import {Card,Col,CloseButton, Row, CardLink, CardSubtitle, CardTitle, CardText, CardBody, Alert} from "reactstrap";
import { useEffect, useState } from "react";


const blankProfileUrl = "http://localhost:8080/upload/static/images/blank-profile.webp"


function Matches({setLoggedIn}){

  const userId = localStorage.getItem('user');
  const [matches, setMatches] = useState([])

  useEffect(() => {
    async function fetchMatches(){
      try{
        const userEncoded = encodeURIComponent(userId);
        const response = await fetch('http://localhost:8020/match/allMatches/?userId=' + userEncoded)
        if(response.status == 202){
            const body = await response.json()
            console.log(body)
            setMatches(body)
        }
      }catch(e){
        console.log(e)
      }
    }
    fetchMatches()

  }, [])

  
  const x = (
  <h>hello world</h>
  )

  const deleteMatch = async(match) => {
    const body = {user_id: userId, other_user_id: match.userId}
    console.log(body)
    const deleteResponse = await fetch('http://localhost:8020/match/deleteMatch', {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
         },
        )
        if(deleteResponse.status == 202){
            console.log("deleted")
        }
  }

  const Match = ({match}) => {
    const [deleted, setDeleted] = useState(false);
    const link = "http://instagram.com/" + match.instagram

    return (
      deleted == true ? null : 
      <Card
        style={{
        marginTop:20
      }}
      >
        <Row>
        <Col>
        <CardBody>
          <CardTitle tag="h7">
            {match.name}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
            style={{fontSize:24}}
          >
            {match.age}
          </CardSubtitle>
        </CardBody>
        </Col>
        <Col xs='2'>
        <CloseButton onClick={() => {setDeleted(true); deleteMatch(match)}}/>
        </Col>
        </Row>
        <img
          src={match.url == null ? blankProfileUrl : match.url}
          width="100%"
          height="100%"
        />
        <CardBody>
        <CardLink style={{fontSize:20}} href={link}>
          {match.instagram}
        </CardLink>
      </CardBody>
    </Card>
    ); 
}


  const matchCards = () => {
    return matches.map((match) => {
    return <Match match={match} />
    })
}


  return (
      <>
          <HeaderMenu setLoggedIn={setLoggedIn}/>
          <Frame middlepart={matches.length == 0 ? 
            <Alert style={{height:"8%", marginTop:20, paddingTop:10}} color="info">
              No matches yet.
            </Alert> :
          <div style={{width:400}}>{matchCards()} </div>} />
      </>
  )
}

export default Matches