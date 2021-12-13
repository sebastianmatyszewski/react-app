import "./App.css";
import axios from "axios";
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      quotations: [],
      quote: { quote: '', author: "" },
      previousQuote: [],
    };
    this.getQuote= this.getQuote.bind(this);
    this.getPreviousQuote= this.getPreviousQuote.bind(this);
  }

  getData = async () => {
    try {
      const data = await axios.get(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
      );
      this.setState({quotations: data.data}); 
    } catch (e) {
      console.error(e);
    }
    this.getQuote();
  };

  getQuote(){
    if(this.state.quote.quote !== "")
      this.setState({previousQuote: this.state.previousQuote.concat(this.state.quote)});
    this.setState({quote: this.state.quotations[Math.floor(Math.random()*this.state.quotations.length)]})
  }

   getPreviousQuote(){
    this.setState({previousQuote: this.state.previousQuote.concat(this.state.quote)});
    this.setState({quote: this.state.previousQuote[this.state.previousQuote.length-1]})
    this.setState({previousQuote: this.state.previousQuote.filter(item => item !== this.state.previousQuote[this.state.previousQuote.length-1])});   
  }

  componentDidMount(){ 
    this.getData(); 
  }

  render(){
    return (
      <div className="container">
          <div className="content-container">
            <div className="quote-container">
              <div className="quote">
              {this.state.quote.quote}
              </div>
              
              <div className="author">
                -{this.state.quote.author}
              </div>
            </div>
            <div className="buttons-container">
              <button onClick={this.getPreviousQuote} disabled={this.state.previousQuote.length===0}>Previous quote</button>
              <button onClick={this.getQuote}>Generate next quote</button>
            </div>
          </div>
      </div>
    );
  }
};
export default App;