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
    Col
} from 'reactstrap';
import {connect} from 'react-redux';
import {addVolcano, getVolcanoes} from "../../actions/volcanoActions";
import PropTypes from 'prop-types';

class VolcanoModal extends Component {
    static propTypes = {
        getVolcanoes: PropTypes.func,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };
    state = {
        modal: false,
        name: ''
    };
    newVolcano = {};

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const {user} = this.props;
        const {title, desc, type, country, latitude, longitude, height} = this.state;
        const added_by = user._id;
        this.newVolcano = {
            title,
            desc,
            type,
            latitude,
            longitude,
            country,
            height,
            added_by
        };
        //Add Volcano via addVolcano action
        this.props.addVolcano(this.newVolcano);
        this.props.getVolcanoes();

        this.toggle();

    };

    render() {
        return (
            <div>
                {this.props.isAuthenticated ?
                    <div className="" style={{marginLeft: '2rem', marginTop: '1%', textAlign: 'left'}}>
                        <Button
                            onClick={this.toggle}
                            className="icon-btn add-btn">
                            <div className="add-icon"></div>
                            <div className="btn-txt">Add one</div>
                        </Button>
                    </div> : <h4 className="mb-3 ml-4">Sign in to add a volcano</h4>}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Volcano list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="volcanoTitle">Title</Label>
                                        <Input type="text" name="title" id="volcanoTitle"
                                               placeholder="Volcano's title"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="volcanoDesc">Description</Label>
                                        <Input type="textarea" name="desc" id="volcanoDesc"
                                               placeholder="Enter a description of the volcano"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="volcanoType">Type</Label>
                                        <Input type="text" name="type" id="volcanoType"
                                               placeholder="What is the type of the volcano"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="volcanoCountry">Country</Label>
                                        <Input type="text" name="country" id="volcanoCountry"
                                               placeholder="Country where the volcano is located"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="volcanoLatitude">Latitude</Label>
                                        <Input type="number" step="any" name="latitude" id="volcanoLatitude"
                                               placeholder="Latitude"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="volcanoLongitude">Longitude</Label>
                                        <Input type="number" step="any" name="longitude" id="volcanoLongitude"
                                               placeholder="Longitude"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="volcanoHeight">Height</Label>
                                        <Input type="number" step="any" name="height" id="volcanoHeight"
                                               placeholder="Height"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Confirm</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addVolcano: volcano => dispatch(addVolcano(volcano)),
    getVolcanoes
});
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(VolcanoModal)
