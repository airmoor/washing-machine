import React from 'react';
import Card from 'react-bootstrap/Card';
import {withRouter} from "react-router";

class BackButton extends React.Component {

	constructor(props) {
		super(props);
		this.redirectTo = this.redirectTo.bind(this)
	}

	redirectTo() {
		if (this.props.backTo) {
			this.props.history.push(this.props.backTo);
		}
		else this.props.history.goBack();
	}

	render() {
		return (
			<div className="d-flex align-items-center btn-back"  onClick={this.redirectTo}>
				<Card className="card--small">
					<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>arrow-back</title>
						<g id="icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<path
								d="M13.9606078,15.9520912 C13.9606078,18.1507843 12.1773264,19.9330332 9.97636466,19.9330332 C7.77746168,19.9330332 5.99212155,18.14777 5.99212155,15.9520912 L5.99212155,13.4586382 C5.99212155,12.908529 5.54616995,12.4625774 4.99606078,12.4625774 C4.4459516,12.4625774 4,12.908529 4,13.4586382 L4,15.9520912 C4,19.2480076 6.67726254,21.9251548 9.97636466,21.9251548 C13.2772865,21.9251548 15.9527293,19.251261 15.9527293,15.9520912 L15.9527293,6.40076421 L18.2365903,8.68462521 C18.6255762,9.07361114 19.256247,9.07361114 19.645233,8.68462521 C20.0342189,8.29563928 20.0342189,7.66496848 19.645233,7.27598255 L15.6609899,3.29173945 C15.2720039,2.90275352 14.6413331,2.90275352 14.2523472,3.29173945 L10.2681041,7.27598255 C9.87911818,7.66496848 9.87911818,8.29563928 10.2681041,8.68462521 C10.65709,9.07361114 11.2877608,9.07361114 11.6767468,8.68462521 L13.9606078,6.40076421 L13.9606078,15.9520912 Z"
								id="arrowback" fill="#455362"
								transform="translate(11.968486, 12.462577) rotate(-90.000000) translate(-11.968486, -12.462577) "></path>
						</g>
					</svg>
				</Card>
				<h3 className="ml-3 link">
					{this.props.name}
				</h3>
			</div>
		)
	}
}


export default withRouter(BackButton);