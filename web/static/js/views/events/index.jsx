import React                from 'react';
import { connect }          from 'react-redux';
import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/events';
import EventCard            from '../../components/events/card';

class EventsIndex extends React.Component {
  componentDidMount() {
    setDocumentTitle('Events');
    this.props.dispatch(Actions.fetchEvents());
  }

  componentWillUnmount() {
    this.props.dispatch(Actions.reset());
  }

  renderOwnedEvents() {
    const { fetching } = this.props;
    let content = false;

    if (!fetching) {
      content = (
        <div className="events-wrapper">
          {(this.renderEvents.bind(this))(this.props.ownedEvents)}
        </div>
      );
    }

    return (
      <section>
        <header className="view-header">
          <h3>My events</h3>
        </header>
        {content}
      </section>
    );
  }

  renderEvents(events) {
    return events.map(event =>
      <EventCard key={event.id} dispatch={this.props.dispatch} {...event} />
    );
  }

  render() {
    return (
      <div className="view-container events index">
        {(this.renderOwnedEvents.bind(this))()}
      </div>
    );
  }
}

EventsIndex.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool.isRequired,
  ownedEvents: React.PropTypes.array,
};

const mapStateToProps = state => (
  state.events
);

export default connect(mapStateToProps)(EventsIndex);
