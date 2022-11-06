import {Navbar, NavItem, NavLink, CloseButton} from 'reactstrap'
import './style.css'
import { useNavigate } from "react-router-dom";

function HeaderMenu({setLoggedIn}){

    const navigate = useNavigate();

    return (
        <div style={{position:'fixed', width:1850, zIndex:2, top:0}}>
            <Navbar className='MenuHeader'>
                    <CloseButton onClick={() => { 
                                setLoggedIn(false)
                                localStorage.clear()         
                            }}
                            variant='white' style={{backgroundColor:'yellow', color:'dodgerblue'}}/>
                        <NavLink className='barItem'
                            href='#' 
                            onClick={() => { 
                                navigate("/home");         
                            }}
                            style={{marginLeft:1000}} 
                        >
                        LikeOrNot
                        </NavLink>
                        <NavLink className='barItem'
                            href='#' 
                            onClick={() => { 
                                navigate("/matches");         
                            }} 
                        >
                            Matches
                        </NavLink>
                        <NavLink className='barItem'
                            style={{marginRight:10}}
                            href='#' 
                            onClick={() => { 
                                navigate("/profile");      
                            }}
                        >
                        Profile
                        </NavLink>
            </Navbar>
            </div>

    )
}

export default HeaderMenu