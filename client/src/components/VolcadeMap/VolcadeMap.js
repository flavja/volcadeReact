import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getVolcanoes} from "../../actions/volcanoActions";
import {getWaterfalls} from "../../actions/waterfallActions";
import PropTypes from 'prop-types';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

const volcanoIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0xMzYsNDQ0Yy0xLjM2NCwwLTIuNjM0LTAuNjk1LTMuMzY5LTEuODQ0Yy0wLjczNS0xLjE0OS0wLjgzNC0yLjU5NC0wLjI2My0zLjgzMmwxMjAtMjYwICAgYzAuNjUzLTEuNDE3LDIuMDcxLTIuMzI0LDMuNjMyLTIuMzI0czIuOTc5LDAuOTA3LDMuNjMyLDIuMzI0bDEyMCwyNjBjMC41NzEsMS4yMzgsMC40NzMsMi42ODMtMC4yNjMsMy44MzIgICBDMzc4LjYzNCw0NDMuMzA1LDM3Ny4zNjQsNDQ0LDM3Niw0NDRIMTM2eiIgZmlsbD0iI0ZGMzMzMyIvPjxwYXRoIGQ9Ik0yNTYsMTgwbDEyMCwyNjBIMTM2TDI1NiwxODAgTTI1NiwxNzJjLTMuMTIsMC01Ljk1NiwxLjgxNC03LjI2NCw0LjY0N2wtMTIwLDI2MCAgIGMtMS4xNDQsMi40NzgtMC45NDUsNS4zNjYsMC41MjUsNy42NjRjMS40NywyLjI5OCw0LjAxLDMuNjg4LDYuNzM4LDMuNjg4aDI0MGMyLjcyOSwwLDUuMjY5LTEuMzkxLDYuNzM4LTMuNjg4ICAgYzEuNDcxLTIuMjk4LDEuNjY5LTUuMTg3LDAuNTI1LTcuNjY0bC0xMjAtMjYwQzI2MS45NTYsMTczLjgxNCwyNTkuMTIsMTcyLDI1NiwxNzJMMjU2LDE3MnoiIGZpbGw9IiM2NjAwMzMiLz48L2c+PGc+PGc+PHBvbHlnb24gZmlsbD0iI0NDMzM2NiIgcG9pbnRzPSIzNjQuMDEzLDQxNC4wMjcgMzUyLjc5NiwzODkuNzI2IDE1My40ODEsNDAyLjEyMyAxNDEuNjAzLDQyNy44NjEgICAiLz48L2c+PGc+PHBvbHlnb24gZmlsbD0iI0NDMzM2NiIgcG9pbnRzPSIxNzcuMjQxLDM1MC42NDUgMTY1LjM2MSwzNzYuMzg0IDM0MS41OCwzNjUuNDIzIDMzMC4zNjMsMzQxLjEyMSAgICIvPjwvZz48Zz48cG9seWdvbiBmaWxsPSIjQ0MzMzY2IiBwb2ludHM9IjIyNC43NTksMjQ3LjY4OSAyMTIuODc5LDI3My40MjggMjk2LjcxNCwyNjguMjE0IDI4NS40OTcsMjQzLjkxMSAgICIvPjwvZz48Zz48cG9seWdvbiBmaWxsPSIjQ0MzMzY2IiBwb2ludHM9IjIwMSwyOTkuMTY3IDE4OS4xMiwzMjQuOTA2IDMxOS4xNDYsMzE2LjgxOCAzMDcuOTMxLDI5Mi41MTYgICAiLz48L2c+PC9nPjxwb2x5Z29uIGZpbGw9IiM2NjAwMzMiIHBvaW50cz0iMjU1LjQ2NCwxNzcuMzc3IDIzNS40NjQsMjEyLjA1OCAyNzQuMTMsMjEyLjA1OCAiLz48cGF0aCBkPSIgIE0zMTQuNDA2LDEzNS4zMzZjLTIzLjU2MywwLTQyLjY2NCwxOS4xMDItNDIuNjY0LDQyLjY2NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjYwMDMzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBvbHlnb24gZmlsbD0iI0ZGNjYzMyIgcG9pbnRzPSIzMTkuODcyLDEyMi45NjggMzIyLjE3OSwxMzAuNjQ4IDMyOS44MTMsMTMzLjEwMyAzMjMuMjIzLDEzNy42NyAzMjMuMjQ4LDE0NS42ODggMzE2Ljg2NiwxNDAuODMxICAgMzA5LjI0NywxNDMuMzMzIDMxMS44OTYsMTM1Ljc2NSAzMDcuMTYxLDEyOS4yOTEgMzE1LjE3OSwxMjkuNDcxICIvPjxwb2x5Z29uIGZpbGw9IiNGRjMzMzMiIHBvaW50cz0iMjU1LjY2NiwxMTYuNTU0IDI1OS40NjgsMTI0LjI1NiAyNjcuOTY4LDEyNS40OTEgMjYxLjgxNiwxMzEuNDg2IDI2My4yNjksMTM5Ljk1MiAyNTUuNjY2LDEzNS45NTUgICAyNDguMDYzLDEzOS45NTIgMjQ5LjUxNiwxMzEuNDg2IDI0My4zNjQsMTI1LjQ5MSAyNTEuODY0LDEyNC4yNTYgIi8+PHBhdGggZD0iICBNMTk3LjEwNSwxMzUuMzM2YzIzLjU2MywwLDQyLjY2NCwxOS4xMDIsNDIuNjY0LDQyLjY2NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjYwMDMzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iICBNMzA0LjQwNiwxMjUuMzM2Yy0yMy41NjMsMC00Mi42NjQsMTkuMTAyLTQyLjY2NCw0Mi42NjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2MDAzMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9IiAgTTIwNy4xMDUsMTI1LjMzNmMyMy41NjMsMCw0Mi42NjQsMTkuMTAyLDQyLjY2NCw0Mi42NjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2MDAzMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMiIvPjxwb2x5Z29uIGZpbGw9IiNGRjY2MzMiIHBvaW50cz0iMTkxLjk4NywxMjMuMDE2IDE5Ni44MzUsMTI5LjQwMiAyMDQuODQ4LDEyOS4wMjggMjAwLjI3MSwxMzUuNjEzIDIwMy4xMDMsMTQzLjExNiAxOTUuNDI0LDE0MC44ICAgMTg5LjE2MywxNDUuODEyIDE4OC45OTQsMTM3Ljc5NCAxODIuMjkzLDEzMy4zODkgMTg5Ljg2NywxMzAuNzQ5ICIvPjxwb2x5Z29uIGZpbGw9IiNGRjMzMzMiIHBvaW50cz0iMzAzLjk5OSwxMTkuMzk3IDMwNS4wNzUsMTIzLjMwMyAzMDguOTAyLDEyNC42MzEgMzA1LjUyMSwxMjYuODYgMzA1LjQ0MSwxMzAuOTExIDMwMi4yNzQsMTI4LjM4MyAgIDI5OC4zOTcsMTI5LjU2IDI5OS44MjMsMTI1Ljc2NyAyOTcuNTA4LDEyMi40NDUgMzAxLjU1NSwxMjIuNjI4ICIvPjxwb2x5Z29uIGZpbGw9IiNGRjMzMzMiIHBvaW50cz0iMjA4LjI5MywxMTkuNzMgMjEwLjcyOCwxMjIuOTY5IDIxNC43NzUsMTIyLjggMjEyLjQ0OCwxMjYuMTEzIDIxMy44NTksMTI5LjkxMSAyMDkuOTg2LDEyOC43MjIgICAyMDYuODEyLDEzMS4yMzggMjA2Ljc0NiwxMjcuMTg4IDIwMy4zNzMsMTI0Ljk0NiAyMDcuMjA1LDEyMy42MzIgIi8+PGNpcmNsZSBjeD0iMjM0LjE2NyIgY3k9IjEyNC4xNTIiIGZpbGw9IiNGRjY2MzMiIHI9IjQuMzMzIi8+PGNpcmNsZSBjeD0iMTk0LjA2IiBjeT0iMTUwLjE1MiIgZmlsbD0iI0ZGMzMzMyIgcj0iMS45OTkiLz48Y2lyY2xlIGN4PSIzMTguMDYiIGN5PSIxNTAuMTUyIiBmaWxsPSIjRkYzMzMzIiByPSIxLjk5OSIvPjxjaXJjbGUgY3g9IjI3OC43NDEiIGN5PSIxMjQuMTUyIiBmaWxsPSIjRkY2NjMzIiByPSI0LjMzMyIvPjwvc3ZnPg==',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
});
const waterfallIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9IkVuZXJneTIwIi8+PGcgaWQ9IkVuZXJneTE5Ii8+PGcgaWQ9IkVuZXJneTE4Ii8+PGcgaWQ9IkVuZXJneTE3Ii8+PGcgaWQ9IkVuZXJneTE2Ii8+PGcgaWQ9IkVuZXJneTE1Ii8+PGcgaWQ9IkVuZXJneTE0Ii8+PGcgaWQ9IkVuZXJneTEzIi8+PGcgaWQ9IkVuZXJneTEyIi8+PGcgaWQ9IkVuZXJneTExIj48Zz48cGF0aCBkPSJNMjgsMTljMCw2LjYyLTUuMzgsMTItMTIsMTJTNCwyNS42Miw0LDE5QzQsMTIuNTgsMTQuODMsMS43NSwxNS4zLDEuMjljMC4zOS0wLjM5LDEuMDEtMC4zOSwxLjQsMCAgICBDMTcuMTcsMS43NSwyOCwxMi41OCwyOCwxOXoiIGZpbGw9IiMzNEIwQzAiLz48L2c+PGc+PHBhdGggZD0iTTE0LDI2Yy0zLjMwODYsMC02LTIuNjkxNC02LTZjMC0wLjU1MjcsMC40NDc4LTEsMS0xczEsMC40NDczLDEsMWMwLDIuMjA2MSwxLjc5NDQsNCw0LDQgICAgYzAuNTUyMiwwLDEsMC40NDczLDEsMVMxNC41NTIyLDI2LDE0LDI2eiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGcgaWQ9IkVuZXJneTEwIi8+PGcgaWQ9IkVuZXJneTA5Ii8+PGcgaWQ9IkVuZXJneTA4Ii8+PGcgaWQ9IkVuZXJneTA3Ii8+PGcgaWQ9IkVuZXJneTA2Ii8+PGcgaWQ9IkVuZXJneTA1Ii8+PGcgaWQ9IkVuZXJneTA0Ii8+PGcgaWQ9IkVuZXJneTAzIi8+PGcgaWQ9IkVuZXJneTAyIi8+PGcgaWQ9IkVuZXJneTAxIi8+PC9zdmc+',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
});

class VolcadeMap extends Component {
    static propTypes = {
        getVolcanoes: PropTypes.func.isRequired,
        getWaterfalls: PropTypes.func.isRequired,
        volc: PropTypes.object.isRequired,
        waterf: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };
    state = {
        lat: 48.858093,
        lng: 2.294694,
        zoom: 2,
    };

    componentDidMount() {
        this.props.getVolcanoes();
        this.props.getWaterfalls();
    }

    render() {
        const initialPosition = [this.state.lat, this.state.lng];
        const {volcanoes} = this.props.volc;
        const {waterfalls} = this.props.waterf;
        const {isAuthenticated} = this.props.auth;
        return (
            <Map className="volcadeMap" center={initialPosition} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {volcanoes.map(({_id, title, latitude, longitude}) => (
                    <Marker
                        key={_id}
                        position={[latitude, longitude]}
                        icon={volcanoIcon}>
                        <Popup>
                            {title}<br/>({latitude},{longitude})°
                            {isAuthenticated ?
                                <Link to={`/volcanoes/${_id}`}>
                                    <br/><Button>
                                    See more
                                </Button>
                                </Link> : ''}
                        </Popup>
                    </Marker>
                ))};
                {waterfalls.map(({_id, title, latitude, longitude}) => (
                    <Marker
                        key={_id}
                        position={[latitude, longitude]}
                        icon={waterfallIcon}>
                        <Popup>
                            {title}<br/>({latitude},{longitude})°
                            {isAuthenticated ?
                                <Link to={`/waterfalls/${_id}`}>
                                    <br/><Button>
                                    See more
                                </Button>
                                </Link> : ''}
                        </Popup>
                    </Marker>
                ))};
            </Map>
        )
    };
}

const mapStateToProps = state => ({
    volc: state.volc,
    waterf: state.waterf,
    auth: state.auth
});

export default connect(mapStateToProps, {getVolcanoes, getWaterfalls})(VolcadeMap);
