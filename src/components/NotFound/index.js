import './index.css'

const NotFound = () => (
  <div className="notfound_container">
    <img
      className="failure_img"
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
    />
    <h1 className="notfound_title">Page Not Found</h1>
    <p className="notfound_para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
