import React, {Component, Fragment} from 'react';
import {
    Container
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Home extends Component {

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
        const authMenu = (<Fragment>

            <Link to={'/online-map'}>
                <div className="card 3">
                    <div className="card_image">
                        <img src="/assets/img/menu/globe.gif"/>
                    </div>
                    <div className="card_title title-white">
                        <p>Online Map</p>
                    </div>
                </div>
            </Link>

            <Link to={'/volcanoes'}>
                <div className="card 1">
                    <div className="card_image"><img
                        src="/assets/img/menu/volcan.webp"/>
                    </div>
                    <div className="card_title title-white">
                        <p>Volcanoes</p>
                    </div>
                </div>
            </Link>

            <Link to={'/waterfalls'}>
                <div className="card 2">
                    <div className="card_image">
                        <img
                            src="/assets/img/menu/cascasde.webp"/>
                    </div>
                    <div className="card_title title-white">
                        <p>Waterfalls</p>
                    </div>
                </div>

            </Link>
            <Link to={'/profile'}>
                <div className="card 4">
                    <div className="card_image">
                        <img src="/assets/img/menu/profile.webp"/>
                    </div>
                    <div className="card_title title-white">
                        <p>Profile</p>
                    </div>
                </div>
            </Link>

        </Fragment>);
        const guestMenu = (<Fragment>

            <Link to={'/online-map'}>
                <div className="card 3">
                    <div className="card_image">
                        <img src="https://media.giphy.com/media/X6hiFJjvTDAAw/giphy.gif"/>
                    </div>
                    <div className="card_title title-white">
                        <p>Online Map</p>
                    </div>
                </div>
            </Link>

        </Fragment>);
        return (
            <Container>
                <div className="cards-list">
                    {isAuthenticated ? authMenu : guestMenu}
                </div>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
