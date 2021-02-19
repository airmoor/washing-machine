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
import SubmitModal from "./elements/SubmitModal";
import {timeFormat} from "../services/utils";

class WasherPage extends React.Component {

	constructor(props) {
		super(props);

		this.onChangeSearch = this.onChangeSearch.bind(this);
		this.deleteWasher = this.deleteWasher.bind(this);
		this.startWashingMachine = this.startWashingMachine.bind(this);
		this.openModalWashingMachine = this.openModalWashingMachine.bind(this)
		this.setModalShow = this.setModalShow.bind(this);

		this.state = {
			washer: this.props.washer,
			selectedMode: {
				id: null
			},
			modalShow:false,
			modalData: {},
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

	setModalShow(val) {
		this.setState({
			modalShow: val
		});
	}

	openModalWashingMachine() {
		this.setModalShow(true);
		if (this.props.washer.isWorking) {
			this.setState({
				modalData: {
					modalText: 'This washing machine is already working!',
					withSubmit:false
				}
			});
		}
		else if (this.state.selectedMode.id)
			this.setState({
				modalData: {
					mode: this.state.selectedMode,
					modalText: 'Are you sure you are going to start the washing machine?',
					withSubmit:true
				}
			});
		else {
			this.setState({
				modalData: {
					modalText: 'You need to select the mode before starting the washing machine.',
					withSubmit:false
				}
			});
		}
	}
	startWashingMachine() {
		this.setModalShow(false);
		const id = this.props.washer.id;
		const now = new Date();

		const data = {
			...this.props.washer,
			isWorking: true,
			lastWorkingTime: now,
			lastModeId: this.state.selectedMode.id
		};

		this.props.updateWasher(id, data).then(()=> {
			this.props.getWasher(id)
		})
	}

	onChangeSearch(e) {
		const text = e.target.value;
		this.setState({
			searchText: text
		});
	}

	selectMode(mode) {
		console.log(mode);
		this.setState({
			selectedMode: mode
		});
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
					<h4 className="text-center mb-4">{washer.model}</h4>
					<h2 className="text-center mb-4">
						{washer.isWorking ?
							<div> on </div> : <div> off </div>
						}
					</h2>
				</div>

				<div className="d-flex mt-3 mb-5 align-items-center">
					<ToggleWasherButton isWorking={washer.isWorking}
					                    action={this.openModalWashingMachine}/>
					<h2 className="ml-5"> Wash modes </h2>
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
											{timeFormat(mode.duration)}
										</div>
										<EditButton goTo={`/mode/${mode.id}/edit`}/>
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

				<div className={'mt-3'}>
					<NavLink to={'/washer/' + this.state.washer.id + '/edit'}>
						<Button className="mr-3" variant="outline-success">
							Edit washer
						</Button>
					</NavLink>

					<Button onClick={this.deleteWasher} variant="outline-danger">
						Delete washer
					</Button>
				</div>

				<SubmitModal show={this.state.modalShow}
				             modalData={this.state.modalData}
				             onSubmit={this.startWashingMachine}
				             onHide={() => this.setModalShow(false)}/>
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
	updateWasher: (id, data) => dispatch(actionCreators.updateWasher(id, data)),
	deleteWasher: (id) => dispatch(actionCreators.deleteWasher(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WasherPage));
