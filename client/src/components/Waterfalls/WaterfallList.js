import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getWaterfalls, deleteWaterfall} from "../../actions/waterfallActions";
import PropTypes from 'prop-types';
import WaterfallModal from "./WaterfallModal";
import {Link} from "react-router-dom";

class WaterfallList extends Component {

    static propTypes = {
        getWaterfalls: PropTypes.func.isRequired,
        waterf: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };

    componentDidMount() {
        this.props.getWaterfalls();
    }

    onDeleteClick = id => {
        this.props.deleteWaterfall(id);
    };

    render() {
        if (this.props.waterf) {
            const {isAuthenticated, user} = this.props.auth;
            const {waterfalls} = this.props.waterf;
            return (
                <div>
                    <WaterfallModal/>
                    <Container>
                        <ListGroup>
                            <TransitionGroup className="waterfalls-list">
                                {waterfalls.map(({_id, title, latitude, longitude, country}) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroupItem>
                                            <div>{title}, is located
                                                in {country} ({latitude}°, {longitude}°)
                                            </div>
                                            {user.isAdmin ? <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >
                                                &times;
                                            </Button> : ''}
                                            {isAuthenticated ? <Link to={`/waterfalls/${_id}`}><Button
                                                color="primary"
                                                size="sm"
                                            >
                                                &radic;
                                            </Button></Link> : ''}
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </ListGroup>
                    </Container>
                </div>
            );
        }
    }
}


const mapStateToProps = state => ({
    waterf: state.waterf,
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps, {getWaterfalls, deleteWaterfall})(WaterfallList);
