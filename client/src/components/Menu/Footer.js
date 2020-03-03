import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';

class Footer extends Component {

    render() {
        return (
            <div className="fixed-bottom">
                <Navbar color="dark" dark>
                    <NavbarBrand>
                        <span>
                            <small style={{fontSize: '0.5em'}}>
                                &copy; 2020 made by: Flavien Jarry
                            </small>
                        </span>
                        <span style={{marginLeft: '100%'}}> React personal marked project for H3 Hitema </span>
                    </NavbarBrand>
                </Navbar>
            </div>
        )
    }
}

export default Footer;
