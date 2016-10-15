import React    from 'react';
import { push } from 'react-router-redux';

export default class EventCard extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(push(`/events/${this.props.id}`));
  }

  render() {
    return (
      <div id={this.props.id} className="event">
        <button href="#" onClick={this.handleClick.bind(this)}>{this.props.name}</button>
      </div>
    );
  }
}

EventCard.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
};
