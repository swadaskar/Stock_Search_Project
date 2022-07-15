import { Outlet, Link } from 'react-router-dom'

function Header () {
  return (
    <>
      <nav
        className='navbar navbar-expand-lg navbar-dark'
        style={{ backgroundColor: '#5D3FD3' }}
      >
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Stock Search
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item px-1'>
                <button type='button' className='btn btn-outline-light'>
                  <Link className='nav-link active p-0' to='/'>
                    Search
                  </Link>
                </button>
              </li>
              <li className='nav-item px-1'>
                <Link className='nav-link active' to='/watchlist'>
                  Watchlist
                </Link>
              </li>
              <li className='nav-item px-1'>
                <Link className='nav-link active' to='/portfolio'>
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default Header
