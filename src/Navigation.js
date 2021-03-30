import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"/>                
                <Nav inline>                    
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Party
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/people">
                        People
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/drinks">
                        Drinks
                    </NavLink>                    
                </Nav>                
                <Navbar.Collapse/>
            </Navbar>
        )
    }
}