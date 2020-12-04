import React, { Fragment } from 'react';
import Header from "./Header";
import Footer from "./Footer"

const Layout: React.FC = (props) => (
    <Fragment>
        <div>

        <Header />

            {props.children}


        </div>
    </Fragment>
)

export default Layout;