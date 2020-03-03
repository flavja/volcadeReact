import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModal from "../Auth/RegisterModal";
import Logout from "../Auth/Logout";
import LoginModal from "../Auth/LoginModal";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import VolcadeMap from "../VolcadeMap/VolcadeMap";

class NavBar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    state = {
        isOpen: true
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <Fragment>
                <Nav className="ml-auto" navbar>
                    <Link to={'/volcanoes'}>Volcanoes list</Link>
                    <Link to={'/waterfalls'}>Waterfalls list</Link>
                    <Link to={'/online-map'}>Map</Link>
                    <NavItem>
                    <span className="navbar-text">
                        <strong>{user ? `Connected as ${user.isAdmin ? 'ADMIN' : 'USER'}: ${user.firstname} ${user.lastname} (${user.email})` : ''}</strong>
                    </span>
                    </NavItem>
                    <Link to={'/profile'}>My profile</Link>
                    <NavItem>
                        <Logout/>
                    </NavItem>
                </Nav>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <RegisterModal/>
                    </NavItem>
                    <NavItem>
                        <LoginModal/>
                    </NavItem>
                </Nav>
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/"><img className="logoMenu" src="/logovolcade.png" />Volcade</NavbarBrand>
                    <Container>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(NavBar);
