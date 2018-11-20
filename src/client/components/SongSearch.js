import React from 'react';
import SocketContext from '../socket-context'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';


class SongSearch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ value: e.target.value });
    console.log(this.getValidationState())
    console.log(this.props.socket)
    this.props.socket.on("addSong", data => console.log(data));
    // this.props.socket.on("addSong", data => this.setState( prevState => {
    //   return {
    //     songs: [
    //       ...prevState.songs,
    //       {
    //         data
    //       }
    //     ]
    //   }
    // } ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          {/* <ControlLabel>Working example with validation</ControlLabel> */}
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Search..."
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
        </FormGroup>
      </form>
    );
  }
}

// render(<FormExample />);
export default SongSearch