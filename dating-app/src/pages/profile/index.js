import HeaderMenu from "../../components/headerMenu";
import Frame from "../../components/frame";
import './style.css'
import { ModalBody, Modal, ModalHeader, ModalFooter, FormGroup, Input, Form, Label, FormText, Button, Alert, Card, Row, Col, CardBody, CardTitle, CardSubtitle, CloseButton, CardLink } from "reactstrap";
import { useEffect, useState } from "react";


function Profile({setLoggedIn}){

    const userId = localStorage.getItem('user');
    const [profileInfo, setProfileInfo] = useState({id: userId, name: "", age: "", instagram: "", gender: "", preference: ""})
    const [file, setFile] = useState("")
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [photos, setPhotos] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  
    const closeBtn = (
      <button className="close" onClick={toggle} type="button">
        &times;
      </button>
    );


    const photoCards = photos.map((photo) => {
        return (
          <h style={{marginTop:50}}>
          <Card
            style={{
            width: '25rem',
            height: '25rem',
          }}
          >
            <Row>
            <Col>
            <CardBody>
              <CardTitle tag="h7">
                
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
                style={{fontSize:24}}
              >
               
              </CardSubtitle>
            </CardBody>
            </Col>
            <Col xs='2'>
            <CloseButton />
            </Col>
            </Row>
            <img
              src={photo.url}
              width="100%"
              height="100%"
            />
            <CardBody>
            <CardLink style={{fontSize:20}}href="#">
            </CardLink>
          </CardBody>
        </Card>
        </h>
        );
      });

    
    const Photo = ({photo}) => {
        const [deleted, setDeleted] = useState(false);
        return(
            <ModalBody>
                {
                    deleted == true ? null : 
                    <Row>
                        <Col>
                            <img style={{width:200}} src={photo.url} />
                        </Col>
                        <Col>
                            <CloseButton onClick={() => {setDeleted(true); deletePhoto(photo);}}
                                variant='white' style={{backgroundColor:'yellow', color:'dodgerblue'}}/>
                        </Col>
                    </Row>
                }
            </ModalBody>
        )
    }
    
    const profile_photos = () => {
        return photos.map((item) => {
        return <Photo photo={item} />
        })
    }
    
    const photos_model = (
        <div>
            <Button color="danger" onClick={() => {
                toggle();
                fetchPhotos();
            }}>
              My Photos
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} >
                Photos
              </ModalHeader>
                {profile_photos()}
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
        </div>
    )
      
    
    useEffect(() => {
        async function fetchProfileInfo(){
          try{
            const userEncoded = encodeURIComponent(userId);
            const response = await fetch('http://localhost:8020/profile/info/?id=' + userEncoded)
            if(response.status == 202){
                const body = await response.json()
                setProfileInfo(body)
                console.log(body)
            }
          }catch(e){
            console.log(e)
          }
        }
        fetchProfileInfo()
        console.log(photos)
      }, []);


    useEffect(() => {
        fetchPhotos()
        console.log("ALAYINIZI")
    }, [])

    async function fetchPhotos(){
        try{
          const userEncoded = encodeURIComponent(userId);
          const response = await fetch('http://localhost:8020/profile/photos/?id=' + userEncoded)
          if(response.status == 202){
              const body = await response.json()
              console.log(body)
              setPhotos(body)
          }
        }catch(e){
          console.log(e)
        }
      }

    useEffect(() => {
        if(profileUpdated){
            const timer = setTimeout(() => {console.log('Initial timeout!'); setProfileUpdated(false)}, 3000);
            return () => clearTimeout(timer);
        }
    }, [profileUpdated])


    const deletePhoto = async(photo) => {
        console.log(photo)
        const deleteResponse = await fetch('http://localhost:8020/profile/deleteImage', {
                method: 'DELETE',
                body: JSON.stringify(photo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
             },
            )
            if(deleteResponse.status == 202){
                console.log("deleted")
            }
    }


    const handleUpdate = async(e) => {
        e.preventDefault();
        console.log(file)
        console.log("qwe")
        if(file.length != 0){
            const formData = new FormData()
            formData.append('imageFile', file)
            const fileResponse = await fetch('http://localhost:8020/profile/uploadImage/?userId=' + userId, {
                method: 'POST',
                body: formData
             },
            )
            if(fileResponse.status == 202){
                console.log("uploaded")
            }
            fetchPhotos()
        }

        const profileResponse = await fetch('http://localhost:8020/profile/info/?userId=' + userId, {
                method: 'PUT',
                body: JSON.stringify(profileInfo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                    }
            },
        )
        if(profileResponse.status == 202){
            setProfileUpdated(true)
        }
        console.log(profileInfo)
        console.log(file)
    };


    return (
        <>
            <HeaderMenu setLoggedIn={setLoggedIn}/>
            <Frame middlepart={
                <Form>
                    <FormGroup>
                        <Label for="exEmail">
                            Name
                        </Label>
                        <Input
                            id="exEmail"
                            name="name"
                            placeholder={profileInfo.name}
                            onChange={(e) => setProfileInfo({...profileInfo, name: e.target.value })}
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleNumber">
                            Age
                        </Label>
                        <Input
                            id="exampleNumber"
                            name="number"
                            placeholder={profileInfo.age}
                            onChange={(e) => setProfileInfo({...profileInfo, age: e.target.value })}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Instagram
                        </Label>
                        <Input
                            id='x'
                            name='text'
                            placeholder={profileInfo.instagram}
                            onChange={(e) => setProfileInfo({...profileInfo, instagram: e.target.value })}
                            type='text'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examp">
                            Gender
                        </Label>
                        <Input
                            id="examp"
                            name="select"
                            type="select"
                            onChange={(e) => setProfileInfo({...profileInfo, gender: e.target.value })}
                        >
                        <option>
                            {profileInfo.gender}
                        </option>
                        <option>
                            {profileInfo.gender == "male" ? "female" : "male"}
                        </option>
                        <option>
                            other
                        </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Preference
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            onChange={(e) => setProfileInfo({...profileInfo, instagram: e.target.value })}
                        >
                        <option>
                            {profileInfo.preference}
                        </option>
                        <option>
                            {profileInfo.preference == "male" ? "female" : "male"}
                        </option>
                        <option>
                            other
                        </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label onclick={console.log("hello world")} for="exampleFile">
                            Photos
                        </Label>
                        <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0] )}
                        />
                        <FormText>
                            Upload a picture of yourself
                        </FormText>
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button 
                                style={{backgroundColor:'#6a9e5b'}}
                                onClick={(e) => {
                                    handleUpdate(e)
                                }}
                            >
                                Update/Upload
                            </Button >
                        </Col>
                        <Col xs='4'>
                             <div>
                                {photos_model}
                            </div>
                        </Col>
                    </Row>
                    {profileUpdated && (
                    <Alert style={{width:"99%", height:"8%", marginTop:20, paddingTop:10}} color="info">
                        <p style={{fontSize:20}}>Profile is successfully updated.</p>
                    </Alert>
            )}
                </Form>
            }
            />
        </>
    )
}

export default Profile