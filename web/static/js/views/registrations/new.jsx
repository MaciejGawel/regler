import React                                  from 'react';
import { connect }                            from 'react-redux';
import { Link }                               from 'react-router';
import { setDocumentTitle, renderErrorsFor }  from '../../utils';
import Actions                                from '../../actions/registrations';

class RegistrationsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign up');
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.passwordConfirmation.value,
    };

    dispatch(Actions.signUp(data));
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="view-container registrations new">
        <main>
          <form id="sign-up-form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="field">
              <input
                ref={(c) => { this.username = c; }} id="username" type="text" placeholder="Username" required="true"
              />
              {renderErrorsFor(errors, 'username')}
            </div>
            <div className="field">
              <input ref={(c) => { this.email = c; }} id="email" type="email" placeholder="Email" required="true" />
              {renderErrorsFor(errors, 'email')}
            </div>
            <div className="field">
              <input
                ref={(c) => { this.password = c; }} id="password" type="password" placeholder="Password" required="true"
              />
              {renderErrorsFor(errors, 'password')}
            </div>
            <div className="field">
              <input
                ref={(c) => { this.passwordConfirmation = c; }} id="password-confirmation" type="password"
                placeholder="Password confirmation" required="true"
              />
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/sign_in">Sign in</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.registration.errors,
});

export default connect(mapStateToProps)(RegistrationsNew);
