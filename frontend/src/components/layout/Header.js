import React, {Fragment} from 'react'
import '../../App.css';
import Search from './Search';
import { Route, Routes, useNavigate } from 'react-router-dom';
const Header = () => {
    const history = useNavigate();

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                    <img src="/images/ecom_logo.png" />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    {/* <Routes> */}
                         <Search history={history} />                  
                    {/* </Routes>                     */}
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <button className="btn" id="login_btn">Login</button>

                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </Fragment>
    )

}

export default Header;