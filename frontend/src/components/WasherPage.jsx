import React from 'react';
import {NavLink} from 'react-router-dom';
import {Col, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as actionCreators from './../store/actions';
import ToggleWasherButton from "./elements/ToggleWasherButton";
import BackButton from "./elements/BackButton";
import EditButton from "./elements/EditButton";

class WasherPage extends React.Component {

	constructor(props) {
		super(props);

		this.onChangeSearch = this.onChangeSearch.bind(this);
		this.deleteWasher = this.deleteWasher.bind(this);

		this.state = {
			washer: this.props.washer,
			selectedMode: {
				id: 0
			}
		};

	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getWasher(id);
		const {getModes} = this.props;
		getModes();
	}

	deleteWasher() {
		const id = this.props.match.params.id;
		this.props.deleteWasher(id).then(() => {
			this.props.getWashers().then(() => {
				this.props.history.push('/');
			})
		})
	}

	onChangeSearch(e) {
		const text = e.target.value;
		this.setState({
			searchText: text
		});
	}

	selectMode(mode) {
		console.log(mode)
		this.setState({
			selectedMode: mode
		});
	}

	timeFormat(time) {
		let hour = '';
		if (time > 60) hour = Math.round(time / 60) + 'h '
		return hour + Math.round(time % 60) + ' min'
	}

	render() {
		const {washer, modes} = this.props;
		return (
			<div>
				<div className="d-flex mb-3 justify-content-start">
					<BackButton backTo="/" name="Home"/>
				</div>

				<div>
					<h1 className="text-center mb-4">{washer.name}</h1>
					<h2 className="text-center mb-4">{washer.model}</h2>
					<h1 className="text-center mb-4">
						{washer.isWorking ?
							<div> on </div> : <div> off </div>
						}
					</h1>

				</div>

				<div className="d-flex my-3 align-items-center">
					<ToggleWasherButton/>
					<h1 className="ml-5"> Wash modes </h1>

				</div>

				<div className="row">

					{
						modes.map((mode) =>
							<div key={'washer' + mode.id}
							     className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
								<Card onClick={(e) => this.selectMode(mode)}
								      className={mode.id === this.state.selectedMode.id ? 'card--selected' : ''}>
									<Card.Body>
										<Card.Title>
											{mode.name}
										</Card.Title>
										<div>
											{mode.temperature}°
										</div>
										<div>
											{mode.spinSpeed} spin speed
										</div>
										<div className="mb-4">
											{this.timeFormat(mode.duration)}
										</div>
										<EditButton />
									</Card.Body>
								</Card>
							</div>)
					}

					<div className="d-flex col-12 col-sm-6 col-md-4 col-lg-3 justify-content-start">
						<NavLink to={'/mode-new'}>
							<div className="btn-new">
								+
							</div>
						</NavLink>
					</div>
				</div>

				<div>
					<NavLink to={'/washer/' + this.state.washer.id + '/edit'}>
						<Button className="mr-3" variant="outline-success">
							Edit washer
						</Button>
					</NavLink>

					<Button onClick={this.deleteWasher} variant="outline-danger">
						Delete washer
					</Button>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	washer: state.washer.washer,
	modes: state.mode.modes,
});

const mapDispatchToProps = dispatch => ({
	getModes: () => dispatch(actionCreators.getModes()),
	getWashers: () => dispatch(actionCreators.getWashers()),
	getWasher: (id) => dispatch(actionCreators.getWasher(id)),
	deleteWasher: (id) => dispatch(actionCreators.deleteWasher(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WasherPage));
