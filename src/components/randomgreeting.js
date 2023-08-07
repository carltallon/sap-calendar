import React, { Component } from 'react';

class Randomgreeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomIndex: 0,
    };
  }

  componentDidMount() {
    this.setRandomIndex();
  }

  setRandomIndex = () => {
    const { children } = this.props;
    const randomIndex = Math.floor(Math.random() * React.Children.count(children));
    this.setState({ randomIndex });
  };

  render() {
    const { children } = this.props;
    const { randomIndex } = this.state;

    return (
      <div>
        {React.Children.map(children, (child, index) => (
          <div style={{ display: index === randomIndex ? 'block' : 'none' }}>
            {child}
          </div>
        ))}
      </div>
    );
  }
}

export default Randomgreeting;
