import React from "react";

import "./styles/CharacterCard.css";

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <img src={this.props.character.image} alt="" className="img-card-top" />
        <div className="card-body text-cut">{this.props.character.name}</div>
      </div>
    );
  }
}

export default CharacterCard;
