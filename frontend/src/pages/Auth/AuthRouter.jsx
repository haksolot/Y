import React from 'react';
import Login from '@/pages/Auth/Login';
import Error from '@/_utils/Error';
import { Routes, Route } from 'react-router-dom';
const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default AuthRouter;