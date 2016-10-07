import React                from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { setDocumentTitle } from '../../utils';
import Actions              from '../../actions/sessions';

class SessionsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign in');
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(Actions.signIn(this.email.value, this.password.value));
  }

  renderError() {
    let { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
    return (
      <div className="view-container sessions new">
        <main>
          <form id="sign-in-form" onSubmit={this.handleSubmit.bind(this)}>
            {(this.renderError.bind(this))()}
            <div className="field">
              <input
                ref={(c) => { this.email = c; }} type="email" id="user-email" placeholder="Email" required="true"
              />
            </div>
            <div className="field">
              <input
                ref={(c) => { this.password = c; }} type="password" id="user-password" placeholder="Password"
                required="true"
              />
            </div>
            <button type="submit">Sign in</button>
          </form>
          <Link to="/sign_up">Crate new account</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => (
  state.session
);

export default connect(mapStateToProps)(SessionsNew);
