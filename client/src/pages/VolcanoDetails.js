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
        title: '',
        desc: '',
        type: '',
        latitude: '',
        longitude: '',
        country: '',
        height: '',
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
                height: this.currentVolcano.height
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    toggleUpdate = () => {
        this.setState({
            isOnUpdate: !this.state.isOnUpdate
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const {title, desc, type, country, latitude, longitude, height} = this.state;
        const {_id} = this.currentVolcano;
        const added_by = mongoose.Types.ObjectId(this.currentVolcano.added_by);
        const updatedVolcano = {
            title,
            desc,
            type,
            latitude,
            longitude,
            country,
            height,
            added_by
        };
        this.props.updateVolcano(_id, updatedVolcano);
    };

    render() {
        if (this.currentVolcano) {
            const {user} = this.props.auth;
            const notAdminFormat = (<Fragment>
                <h1>Volcano's details :</h1>
                <div>
                    <p>{this.currentVolcano.title}</p>
                    <p>{this.currentVolcano.desc}</p>
                    <p>TYPE : {this.currentVolcano.type}</p>
                    <p>({this.currentVolcano.latitude}°, {this.currentVolcano.longitude}°)</p>
                    <p>COUNTRY : {this.currentVolcano.country}</p>
                    <p>HEIGHT : {this.currentVolcano.height}</p>
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
                                       value={this.state.title}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="volcanoDesc">Description</Label>
                                <Input type="textarea" name="desc" id="volcanoDesc"
                                       placeholder="Enter a description of the volcano"
                                       className='mb-3'
                                       value={this.state.desc}
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
                                       value={this.state.type}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="volcanoCountry">Country</Label>
                                <Input type="text" name="country" id="volcanoCountry"
                                       placeholder="Country where the volcano is located"
                                       className='mb-3'
                                       value={this.state.country}
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
                                       value={this.state.latitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="volcanoLongitude">Longitude</Label>
                                <Input type="number" step="any" name="longitude" id="volcanoLongitude"
                                       placeholder="Longitude"
                                       className='mb-3'
                                       value={this.state.longitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="volcanoHeight">Height</Label>
                                <Input type="number" step="any" name="height" id="volcanoHeight" placeholder="Height"
                                       className='mb-3'
                                       value={this.state.height}
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
            </Fragment>);
            return (
                <div>
                    <Button onClick={this.toggleUpdate}>Update mode</Button>
                    <Container>
                        {user.isAdmin ? (this.state.isOnUpdate ? adminFormat : notAdminFormat) : notAdminFormat}
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
