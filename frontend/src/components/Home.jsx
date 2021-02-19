import React from 'react';
import {Button} from 'react-bootstrap';
import {NavLink, withRouter} from "react-router-dom";
import * as actionCreators from './../store/actions';
import { connect } from 'react-redux';
import WasherCard from "./elements/WasherCard";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	componentDidMount() {
		const { getWashers } = this.props;
		getWashers();
	}

	render() {
		const { washers } = this.props;

		return (
			<div>
				<div className="d-flex justify-content-between mb-4">
					{
						washers.length ?
							<h1 className="text-left">
								Your washers
							</h1>
							:
							<h1 className="text-left">
								You have not added any washing machines yet
							</h1>
					}

				</div>

				<div className="row">
					{
						washers.map((washer) =>
							<div key={'washer'+washer.id}
							     className="col-12 col-sm-6 col-md-4 col-lg-3">
								<WasherCard washer={washer}/>
							</div>)
					}
					<div className="mb-3 col-12 col-sm-6 col-md-4 col-lg-3" >
						<NavLink to={'/washer-new'}>
							<div className="btn-new" >
								+
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	modes: state.mode.modes,
	washers: state.washer.washers,
});

const mapDispatchToProps = dispatch => ({
	getModes: () => dispatch(actionCreators.getModes()),
	getWashers: () => dispatch(actionCreators.getWashers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
