import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, facebookLoginUrl, githubLoginUrl } from '../../reducers/auth/actions';
import { pathTo } from '../../routes';
import { commitAddLog } from '../../reducers/logs/actions';
import { Link, navigate } from 'gatsby';
import { faSignInAlt, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dispatch' does not exist on type 'Readon... Remove this comment to see the full error message
    this.props.dispatch(login(this.state.username, this.state.password)).then(() => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      if (this.props.auth.isAuthenticated) {
        return navigate(pathTo('feed'));
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dispatch' does not exist on type 'Readon... Remove this comment to see the full error message
        return this.props.dispatch(commitAddLog(this.props.auth.statusText));
      }
    });
  };

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { auth, env } = this.props;
    const { username, password } = this.state;

    return (
      <section className="section container-fluid">
        <h3>Login</h3>
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card mb-3">
              <article className="card-body">
                <form>
                  <div className="row mb-3">
                    <div className="input-group">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <input
                        className="form-control"
                        id="username{{ _uid }}"
                        type="text"
                        value={username || ''}
                        onChange={this.onChangeUsername}
                        placeholder="Email or Username"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="input-group">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faKey} />
                      </div>
                      <input
                        className="form-control"
                        id="password{{ _uid }}"
                        type="password"
                        value={password || ''}
                        onChange={this.onChangePassword}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={auth.isAuthenticating}
                          onClick={this.onSubmit}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {env.facebookAppId && (
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="d-grid">
                        <a
                          href={facebookLoginUrl(env.facebookAppId)}
                          className="btn btn-social btn-facebook"
                        >
                          <FontAwesomeIcon icon={faFacebookF} /> Login with Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {env.githubAppId && (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-grid">
                        <a
                          href={githubLoginUrl(env.githubAppId)}
                          className="btn btn-social btn-github"
                        >
                          <FontAwesomeIcon icon={faGithub} /> Login with Github
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
            <p>
              <Link to={pathTo('register')}>
                <span className="glyphicon glyphicon-log-in register" aria-hidden="true" />{' '}
                <FontAwesomeIcon icon={faSignInAlt} /> Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default connect((state) => {
  return {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'auth' does not exist on type 'DefaultRoo... Remove this comment to see the full error message
    auth: state.auth,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'env' does not exist on type 'DefaultRoot... Remove this comment to see the full error message
    env: state.env,
  };
})(Login);