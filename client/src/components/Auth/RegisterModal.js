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
import {register} from '../../actions/authActions';
import {clearErrors} from "../../actions/errorActions";

class RegisterModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isAdmin: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    state = {
        modal: false,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isAdmin: false,
        roleAdmin: false,
        message: null
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'REGISTER_FAIL') {
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

    onChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const {firstname, lastname, email, password} = this.state;
        const newUser = {
            firstname,
            lastname,
            email,
            password
        };

        this.props.register(newUser);
    };


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Sign Up
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Create your account</ModalHeader>
                    <ModalBody>
                        {this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="registerFirstname">Firstname</Label>
                                        <Input type="text" name="firstname" id="registerFirstname"
                                               placeholder="Firstname"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="registerLastname">Lastname</Label>
                                        <Input type="text" name="lastname" id="registerLastname"
                                               placeholder="Lastname"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="registerEmail">Email</Label>
                                        <Input type="email" name="email" id="registerEmail"
                                               placeholder="Email"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="registerPassword">Password</Label>
                                        <Input type="password" name="password" id="registerPassword"
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
                            >Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.isAdmin,
    error: state.error
});


export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)
