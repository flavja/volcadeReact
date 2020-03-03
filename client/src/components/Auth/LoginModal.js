import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from "../../actions/errorActions";

class LoginModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    state = {
        modal: false,
        email: '',
        password: '',
        message: null
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            //check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({message: error.message.message})
            } else {
                this.setState({message: null})
            }
        }
        if (this.state.modal && this.props.isAuthenticated) {
            this.toggle();
        }

    }


    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        //attempt to login
        this.props.login(user);
    };


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Sign In
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Connect to your account</ModalHeader>
                    <ModalBody>
                        {this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="loginEmail">Email</Label>
                                        <Input type="email" name="email" id="loginEmail"
                                               placeholder="Email"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="loginPassword">Password</Label>
                                        <Input type="password" name="password" id="loginPassword"
                                               placeholder="Password"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Login</Button>
                        </Form>
                        <p>Après la connexion, merci de rafraichir la page pour une bonne utilisation de
                            l'application</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(mapStateToProps, {login, clearErrors})(LoginModal)
