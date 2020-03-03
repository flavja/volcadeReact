import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Col, Form, FormGroup, Input, Label, Row} from "reactstrap";

class Profile extends Component {

    state = {};

    componentDidMount() {
        const {user} = this.props;
        this.setState({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            register_date: user.register_date
        });


    };

    render() {
        const {firstname, lastname, email, isAdmin, register_date} = this.props.user;
        return (
            <div>
                <Row>
                    <Col md={6}>
                        <p>Identity : {firstname} {lastname}</p>
                    </Col>
                    <Col md={6}>
                        <p>The email you registered this account with is '{email}' </p>
                    </Col>
                    <Col md={6}>
                        <p>This account was created the {register_date}</p>
                    </Col>
                </Row>
                <div>
                    <p>
                        {isAdmin ? 'Yey, you\'re an admin of the site' : 'Thanks for using Volcade'}
                    </p>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(Profile);
