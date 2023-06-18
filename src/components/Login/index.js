import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  onUserId = e => {
    this.setState({userId: e.target.value})
  }

  onPin = e => {
    this.setState({pin: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_bg_container">
        <div className="login_container">
          <div className="logo_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login_image"
            />
          </div>
          <form className="form_container" onSubmit={this.onSubmitForm}>
            <h1 className="form_title">Welcome Back!</h1>
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="input"
              placeholder="Enter User ID"
              onChange={this.onUserId}
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              className="input"
              placeholder="Enter PIN"
              onChange={this.onPin}
            />
            <button className="login_btn" type="submit">
              Login
            </button>
            {showError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
