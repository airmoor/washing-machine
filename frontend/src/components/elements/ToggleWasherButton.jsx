import React from 'react';

export default class ToggleWasherButton extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isWorking: this.props.isWorking,
		};

		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		this.setState({
			duration: e.target.value
		});
	}

	render() {
		return (
			<div onClick={this.props.action}>
				<div className="power" >
					<input type="checkbox" onChange={this.onChange} checked={this.props.isWorking} />
						<div>
							<svg viewBox="0 0 44 44">
								<path
									d="M22,6 C31,6 38,13 38,22 C38,31 31,38 22,38 C13,38 6,31 6,22 C6,13 13,6 22,6 L22,28"
									id="path">
								</path>
							</svg>
						</div>
				</div>
			</div>
		)
	}
}
