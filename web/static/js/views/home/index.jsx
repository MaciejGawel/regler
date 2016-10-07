import React                from 'react';
import { connect }          from 'react-redux';
import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/sessions';

class HomeIndex extends React.Component {
  componentDidMount() {
    setDocumentTitle('Home');
  }

  handleSignOut(e) {
    e.preventDefault();

    this.props.dispatch(Actions.signOut());
  }

  render() {
    return (
      <div>
        Restricted Regler view
        <button onClick={this.handleSignOut.bind(this)}>Sign out</button>
      </div>
    );
  }
}

export default connect(null)(HomeIndex);
