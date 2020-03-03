import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getWaterfall, updateWaterfall} from "../actions/waterfallActions";
import {Container, Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import mongoose from "mongoose";

class DetailsWaterfall extends Component {

    static propTypes = {
        getWaterfall: PropTypes.func.isRequired,
        auth: PropTypes.object,
        waterf: PropTypes.object.isRequired
    };
    state = {
        isOnUpdate: false
    };
    currentWaterfall = null;
    updatedWaterfall = null;

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getWaterfall(id);
        const {waterfalls} = this.props.waterf;
        if (typeof waterfalls[0] != 'undefined' && waterfalls[0].hasOwnProperty('title')) {
            this.currentWaterfall = waterfalls.filter(waterfall => waterfall._id === id)[0];
            this.setState({
                title: this.currentWaterfall.title,
                desc: this.currentWaterfall.desc,
                latitude: this.currentWaterfall.latitude,
                longitude: this.currentWaterfall.longitude,
                country: this.currentWaterfall.country,
                height: this.currentWaterfall.height,
                image: this.currentWaterfall.image
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
        const {title, desc, country, latitude, longitude, height, image} = this.state;
        const added_by = mongoose.Types.ObjectId(this.currentVolcano.added_by);
        const {_id} = this.currentWaterfall;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('country', country);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('height', height);
        formData.append('added_by', added_by);
        formData.append('image', image);
        this.props.updateVolcano(_id, formData);
        this.props.updateWaterfall(_id, this.updatedWaterfall);
        this.toggleUpdate();
    };

    render() {
        const {title, desc, country, latitude, longitude, height, image, isOnUpdate} = this.state;
        if (this.currentWaterfall) {
            const {user} = this.props.auth;
            const notAdminFormat = (<Fragment>
                <div style={{color: 'white'}}>
                    <h1>Waterfall's details :</h1>
                    <p>{title}</p>
                    <p>{desc}</p>
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
                                <Label for="waterfallTitle">Title</Label>
                                <Input type="text" name="title" id="waterfallTitle"
                                       placeholder="Waterfall's title"
                                       className='mb-3'
                                       value={title}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="waterfallDesc">Description</Label>
                                <Input type="textarea" name="desc" id="waterfallDesc"
                                       placeholder="Enter a description of the waterfall"
                                       className='mb-3'
                                       value={desc}
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
                                       value={country}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="waterfallHeight">Height</Label>
                                <Input type="number" name="height" id="waterfallHeight" placeholder="Height"
                                       className='mb-3'
                                       value={height}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="waterfallLatitude">Latitude</Label>
                                <Input type="number" name="latitude" id="waterfallLatitude" placeholder="Latitude"
                                       className='mb-3'
                                       value={latitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="waterfallLongitude">Longitude</Label>
                                <Input type="number" name="longitude" id="waterfallLongitude"
                                       placeholder="Longitude"
                                       className='mb-3'
                                       value={longitude}
                                       onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="waterfallImage">Image</Label>
                        <Input type="file" name="image" id="waterfallImage"
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
    waterf: state.waterf,
    auth: state.auth
});
export default connect(mapStateToProps, {getWaterfall, updateWaterfall})(DetailsWaterfall);
