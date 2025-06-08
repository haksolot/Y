import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '@/components/public/Header';

const Layouts = () => {
    return (
        <div className='Layout'>
            <Header/>

            <Outlet/>
        </div>
    );
};

export default Layouts;