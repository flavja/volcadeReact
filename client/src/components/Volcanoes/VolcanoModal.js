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
import FormText from "reactstrap/es/FormText";

class VolcanoModal extends Component {
    static propTypes = {
        getVolcanoes: PropTypes.func,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };
    state = {
        modal: false,
        name: '',
        image: null
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onFileChange = e => {
        this.setState({image: e.target.files[0]});
    };

    onSubmit = e => {
        e.preventDefault();
        const {user} = this.props;
        const {title, desc, type, country, latitude, longitude, height, image} = this.state;
        const added_by = user._id;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('type', type);
        formData.append('country', country);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('height', height);
        formData.append('added_by', added_by);
        formData.append('image', image);

        //Add Volcano via addVolcano action
        this.props.addVolcano(formData);
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
                                               onChange={this.onChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="volcanoFile">File</Label>
                                <Input type="file"
                                       name="image"
                                       id="volcanoFile"
                                       className='mb-3'
                                       onChange={this.onFileChange}
                                />
                                <FormText color="muted">
                                    Choose a picture describing the volcano you're adding.
                                </FormText>
                            </FormGroup>
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
