import React from 'react';
import './App.css';

// A component must only contain a single element
// We can use a 'fragment' instead of div, i.e. empty <></>

// const Layout = props => (
//   <>
//     <header>My Header</header>
//     <main>{props.children}</main>
//     <footer>My Footer</footer>
//   </>
// );

// When using a class, we have to use render() to output to the page

class App extends React.Component {

  constructor() {
    super();
  
    this.state = {
      joke: null,
      isFetchingJoke: false
    };

    this.onTellJoke = this.onTellJoke.bind(this);
  }

  fetchJoke() {
    this.setState({isFetchingJoke : true});
    fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ 
          joke: json.joke,
          isFetchingJoke: false
         });
      });
  };

  componentDidMount() {
    this.fetchJoke();
  };

  onTellJoke() {
    this.fetchJoke();
  };
  
  render() {
    console.log('--- RENDER ---');

    return (
      <div>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell me a joke</button>
        <p>{this.state.isFetchingJoke ? 'Loading Joke...' : this.state.joke}</p>
      </div>
    );
  }
}

export default App;

