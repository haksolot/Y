import React from 'react';
import Home from '@/pages/Public/Home';
import Error from '@/_utils/Error';
import { Routes, Route } from 'react-router-dom';
const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home/>}/>

            <Route path="/*" element={<Error/>}/>
        </Routes>
    );
};

export default PublicRouter;