import $ from 'jquery';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      response: ''
    };
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleMessage(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var currentName = this.state.name;
    var currentMessage = this.state.message;

    var data = {
      name: currentName,
      message: currentMessage
    };

    $.ajax({
      url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: (data) => {
        this.setState({response: data});
        console.log('Success');
      },
      error: () => {
        console.log('Error')
      }
      });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Server Response: {this.state.response}</h2>
        </div>
        <form onChange={this.handleSubmit.bind(this)}>
          <label>Name:
            <input type='text' value={this.state.name} onChange={this.handleName.bind(this)}></input>
          </label>
          <label>Message:
            <input type='text' value={this.state.message} onChange={this.handleMessage.bind(this)}></input>
          </label>
          <input type='submit' value='submit'></input>
        </form>
      </div>
    );
  }
}

export default App;