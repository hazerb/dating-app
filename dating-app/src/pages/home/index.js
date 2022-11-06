import HeaderMenu from "../../components/headerMenu";
import Frame from "../../components/frame";
import { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    Row, Col, Container, Spinner, Alert
  } from 'reactstrap';
import './style.css'


const blankProfileBaseUrl = "http://localhost:8080/upload/static/images/"
let queryParameter = 0

function Home({setLoggedIn}){

    const userId = localStorage.getItem('user');
    const [loading, setLoading] = useState(true)
    const [actionCount, setActionCount] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [likableList, setLikableList] = useState([])
    const [userInfo, setUserInfo] = useState({currentUserIndex:0, name: "", age: "", items: []})

    const next = () => {
      const nextIndex = activeIndex === userInfo.items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      const nextIndex = activeIndex === 0 ? userInfo.items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const slides = userInfo.items.map((item) => {
        return (
          <CarouselItem key={item.url} >
            <img style={{ width: 900, height: 700 }} src={item.url} />
          </CarouselItem>
        );
      });

    const blankProfile = <img style={{ width: 1000, height: 700 }} src={blankProfileBaseUrl + "blank-profile.webp"}/>

    useEffect(() => {
      async function fetchLikableUsers(){
        try{
          const userEncoded = encodeURIComponent(userId);
          const response = await fetch('http://localhost:8020/match/getLikableUsers/?userId=' + userEncoded)
          if(response.status == 202){
              const body = await response.json()
              console.log(body)
              setLikableList(body.likableList)
              console.log("allllaah")
          }
        }catch(e){
          console.log(e)
        }
      }
      fetchLikableUsers()
    }, [])


    useEffect(() => {
      if(likableList.length != 0) fetchCurrentUser()
    }, [likableList])


    async function fetchCurrentUser(){
      try{
        queryParameter = likableList[userInfo.currentUserIndex]
        if(queryParameter != undefined){
          const response = await fetch('http://localhost:8020/profile/nameAge/?id=' + queryParameter)
          const imageUrls = await fetch('http://localhost:8020/profile/photos/?id=' + queryParameter)
          const body = await response.json()
          const urls = await imageUrls.json()
          setUserInfo({currentUserIndex: userInfo.currentUserIndex+1, name: body.name, age: body.age, items: urls})
          setLoading(false)
          console.log("taktak")
        }
      }catch(e){
        console.log(e)
      }
    }

    async function handleAction(input, url){
      setLoading(true)
      setActionCount(actionCount+1)
      console.log(userInfo.currentUserIndex)
      fetchCurrentUser()
      try{
        const response = await fetch('http://localhost:8020/match/' + url, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
                }
            },
        )
        if(response.status == 202){
            console.log("okay")
        }
      }catch(e){
        console.log(e)
      }
    }

    const handleLike = async() => {
      if(actionCount < likableList.length){
        console.log(likableList.length)
        let input = {likerId: userId, likedId: likableList[userInfo.currentUserIndex-1]}
        handleAction(input, "like")
      }
    };

    const handleDislike = async() => {
      if(actionCount < likableList.length){
        let input = {dislikerId: userId, dislikedId: likableList[userInfo.currentUserIndex-1]}
        handleAction(input, "dislike")
      }
    };
    return (
        <>
            <HeaderMenu setLoggedIn={setLoggedIn}/>
            <Frame leftpart={ actionCount == likableList.length ? (<></>) : ( 
              <>
                <p>{userInfo.name}</p>
                <p style={{color:'#6a9e5b'}}>{userInfo.age}</p>
              </> )
              }
            
              middlepart={ actionCount == likableList.length ? (
                <Alert>
                <h4 className="alert-heading">
                Well done!
                </h4>
                 <p>
                      You successfully liked or disliked people. No one left. 
                </p>
                <hr />
                  <p className="mb-0">
                        If new people come by, we'll let you know.
                    </p>
                </Alert>
              ):
                
                (loading ? 
                  (<Container style={{width: 100, height: 700}}>
                  <Spinner style={{width: 100, height: 100, marginTop:300}} color="success">
                    Loading...
                  </Spinner>
                  </Container>
                  ) : ( userInfo.items.length == 0 ? blankProfile :

                   ( 
                <Carousel
                    activeIndex={activeIndex}
                >
                    {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
              </Carousel>
                   )
                  
                      ) 
                )
              }

              bottompart={
                <Container className="Home">
                <Row xs='3'>
                    <Col>
                <img className="LikeButton"
                    style={{
                        marginTop:10,
                        cursor: "pointer",}}
                    src="/liked.png"
                    onClick={handleLike}
                />
                    </Col>
                    <Col></Col>
                    <Col>
                <img className="DislikeButton"
                    style={{
                        marginTop:16,
                        cursor: "pointer",}}
                    src="/dislike.png"
                    onClick={handleDislike}
                />
                    </Col>
                </Row>
                </Container>
              }
              />
        </>
    
    )
}

export default Home