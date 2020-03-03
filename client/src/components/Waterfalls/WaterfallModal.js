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
import {addWaterfall, getWaterfalls} from "../../actions/waterfallActions";
import PropTypes from 'prop-types';
import FormText from "reactstrap/es/FormText";

class WaterfallModal extends Component {
    static propTypes = {
        getWaterfalls: PropTypes.func,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };
    state = {
        modal: false,
        name: '',
        image: ''
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
        const {title, desc, country, latitude, longitude, height, image} = this.state;
        const added_by = user._id;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('country', country);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('height', height);
        formData.append('added_by', added_by);
        formData.append('image', image);
        //Add Waterfall via addWaterfall action
        this.props.addWaterfall(formData);
        this.props.getWaterfalls();

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
                    </div> : <h4 className="mb-3 ml-4">Sign in to add a waterfall</h4>}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Waterfall list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallTitle">Title</Label>
                                        <Input type="text" name="title" id="waterfallTitle"
                                               placeholder="Waterfall's title"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallDesc">Description</Label>
                                        <Input type="textarea" name="desc" id="waterfallDesc"
                                               placeholder="Enter a description of the waterfall"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallCountry">Country</Label>
                                        <Input type="text" name="country" id="waterfallCountry"
                                               placeholder="Country where the waterfall is located"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallHeight">Height</Label>
                                        <Input type="number" step="any" name="height" id="waterfallHeight" placeholder="Height"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallLatitude">Latitude</Label>
                                        <Input type="number" step="any" name="latitude" id="waterfallLatitude"
                                               placeholder="Latitude"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="waterfallLongitude">Longitude</Label>
                                        <Input type="number" step="any" name="longitude" id="waterfallLongitude"
                                               placeholder="Longitude"
                                               className='mb-3'
                                               onChange={this.onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="waterfallFile">File</Label>
                                <Input type="file"
                                       name="image"
                                       id="waterfallFile"
                                       className='mb-3'
                                       onChange={this.onFileChange}
                                />
                                <FormText color="muted">
                                    Choose a picture describing the waterfall you're adding.
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
    addWaterfall: waterfall => dispatch(addWaterfall(waterfall)),
    getWaterfalls
});
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterfallModal)
