import React from 'react';
import Login from '../pages/Authentication/Login/Login';
import Registration from '../pages/Authentication/Registration/Registration';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-'>
            <Outlet></Outlet>         
            
        </div>
    );
};

export default AuthLayout;