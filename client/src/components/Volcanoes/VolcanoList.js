import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getVolcanoes, deleteVolcano} from "../../actions/volcanoActions";
import PropTypes from 'prop-types';
import VolcanoModal from "./VolcanoModal";
import {Link} from "react-router-dom";

class VolcanoList extends Component {

    static propTypes = {
        getVolcanoes: PropTypes.func.isRequired,
        volc: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };

    componentDidMount() {
        this.props.getVolcanoes();
    }

    onDeleteClick = id => {
        this.props.deleteVolcano(id);
    };

    render() {
        if (this.props.volc) {
            const {isAuthenticated, user} = this.props.auth;
            const {volcanoes} = this.props.volc;

            return (
                <div>
                    <VolcanoModal/>
                    <Container>
                        <ListGroup>
                            <TransitionGroup className="volcanoes-list">
                                {volcanoes.map(({_id, title, type, latitude, longitude, country}) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroupItem>
                                            <div>{title} is a type of volcano called {type}, located
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
                                            {isAuthenticated ? <Link to={`/volcanoes/${_id}`}><Button
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
    volc: state.volc,
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps, {getVolcanoes, deleteVolcano})(VolcanoList);
