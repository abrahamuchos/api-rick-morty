import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from "./img/9OiY-rmlogo.png";

import CharacterCard from "./components/CharacterCard.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: 1,
      loanding: true,
      error: null,
      data: {
        results: []
      }
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loanding: true, error: null });

    try {
      const response = await fetch(
        `http://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        nextPage: this.state.nextPage + 1,
        loanding: false,
        error: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        }
      });
    } catch (err) {
      this.setState({ loanding: false, error: err });
    }
  };

  render() {
    if (this.state.error) {
      return `Error ${this.state.error.message}`;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3 mb-md-4">
            <img src={Logo} alt="Logo Rick and Morty" className="img-fluid" />
          </div>
        </div>

        <ul className="row">
          {this.state.data.results.map(character => (
            <li className="col-12 col-md-4 col-lg-3 mb-4" key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>

        {this.state.loanding && (
          <div className="loader">
            <h1>cargando</h1>
          </div>
        )}

        <div className="row justify-content-center mb-5">
          {!this.state.loanding && (
            <button
              onClick={() => this.fetchCharacters()}
              className="btn btn-primary col-12 col-md-6"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
