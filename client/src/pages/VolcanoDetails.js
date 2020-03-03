import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getVolcano, updateVolcano} from "../actions/volcanoActions";
import {Container, Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import mongoose from 'mongoose';

class DetailsVolcano extends Component {

    static propTypes = {
        getVolcano: PropTypes.func.isRequired,
        auth: PropTypes.object,
        volc: PropTypes.object.isRequired
    };
    state = {
        isOnUpdate: false
    };
    currentVolcano = null;

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getVolcano(id);
        const {volcanoes} = this.props.volc;
        if (typeof volcanoes[0] != 'undefined' && volcanoes[0].hasOwnProperty('title')) {
            this.currentVolcano = volcanoes.filter(volcano => volcano._id === id)[0];
            this.setState({
                title: this.currentVolcano.title,
                desc: this.currentVolcano.desc,
                type: this.currentVolcano.type,
                latitude: this.currentVolcano.latitude,
                longitude: this.currentVolcano.longitude,
                country: this.currentVolcano.country,
                height: this.currentVolcano.height,
                image: this.currentVolcano.image
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onFileChange = e => {
        this.setState({image: e.target.files[0]});
    };

    toggleUpdate = () => {
        this.setState({
            isOnUpdate: !this.state.isOnUpdate
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const {title, desc, type, country, latitude, longitude, height, image} = this.state;
        const {_id} = this.currentVolcano;
        const added_by = mongoose.Types.ObjectId(this.currentVolcano.added_by);
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
        this.props.updateVolcano(_id, formData);
        this.toggleUpdate();
        this.forceUpdate();
    };

    render() {
        const {title, desc, type, country, latitude, longitude, height, image, isOnUpdate } = this.state;
        if (this.currentVolcano) {
            const {user} = this.props.auth;
            const notAdminFormat = (<Fragment>
                <div style={{color: 'white'}}>
                    <h1>Volcano's details :</h1>
                    <p>{title}</p>
                    <p>{desc}</p>
                    <p>TYPE : {type}</p>
                    <p>({latitude}°, {longitude}°)</p>
                    <p>COUNTRY : {country}</p>
                    <p>HEIGHT : {height}</p>
                    <img alt="imageVolcano" style={{maxWidth: '500px'}} src={`/assets/uploads/${image}`}/>
                </div>
            </Fragment>);
            const adminFormat = (<Fragment>
                <Form onSubmit={this.onSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="volcanoTitle">Title</Label>
                                <Input type="text" name="title" id="volcanoTitle"
                                       placeholder="Volcano's title"
                                       className='mb-3'
                                       value={title}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="volcanoDesc">Description</Label>
                                <Input type="textarea" name="desc" id="volcanoDesc"
                                       placeholder="Enter a description of the volcano"
                                       className='mb-3'
                                       value={desc}
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
                                       value={type}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="volcanoCountry">Country</Label>
                                <Input type="text" name="country" id="volcanoCountry"
                                       placeholder="Country where the volcano is located"
                                       className='mb-3'
                                       value={country}
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
                                       value={latitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="volcanoLongitude">Longitude</Label>
                                <Input type="number" step="any" name="longitude" id="volcanoLongitude"
                                       placeholder="Longitude"
                                       className='mb-3'
                                       value={longitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="volcanoHeight">Height</Label>
                                <Input type="number" step="any" name="height" id="volcanoHeight" placeholder="Height"
                                       className='mb-3'
                                       value={height}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="volcanoImage">Image</Label>
                        <Input type="file" name="image" id="volcanoImage"
                               className='mb-3'
                               onChange={this.onFileChange}/>
                    </FormGroup>
                    <Button
                        color="dark"
                        style={{marginTop: '2rem'}}
                        block
                    >Confirm</Button>
                </Form>
            </Fragment>);
            return (
                <div>
                    {user.isAdmin ? <Button onClick={this.toggleUpdate}>Update mode</Button> : null}
                    <Container>
                        {isOnUpdate ? adminFormat : notAdminFormat}
                    </Container>
                </div>
            )
        } else {
            return (<div>loading ...</div>)
        }
    }
}

const mapStateToProps = state => ({
    volc: state.volc,
    auth: state.auth
});
export default connect(mapStateToProps, {getVolcano, updateVolcano})(DetailsVolcano);
