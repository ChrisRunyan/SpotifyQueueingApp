import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ id, votes, changeVote }) => {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={() => changeVote(id, -1)}> - </button>
      <span className="counter-votes">{ votes }</span>
      <button className="counter-action increment" onClick={() => changeVote(id, 1)}> + </button>
    </div>
  );
}

Counter.propTypes = {
  id: PropTypes.number,
  votes: PropTypes.number,
  changeVote: PropTypes.func  
};

export default Counter;