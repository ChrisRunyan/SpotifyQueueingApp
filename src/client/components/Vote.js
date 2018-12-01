import React from 'react';
import { Glyphicon } from 'react-bootstrap';

class Vote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasVoted: false,
		};
	}

	vote = () => {
		if (!this.state.hasVoted) {
			this.props.vote();
			this.setState({
				hasVoted: true,
			});
		}
	};

	render() {
		const hasVotedIcon = <Glyphicon glyph="heart" />;
		const notVotedIcon = <Glyphicon glyph="heart-empty" />;
		return (
			<div>
				<span onClick={this.vote}>
					{this.state.hasVoted ? hasVotedIcon : notVotedIcon}
				</span>
				<p>{this.props.votes}</p>
			</div>
		);
	}
}

export default Vote;
