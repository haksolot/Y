import React from 'react';
import ALayout from '@/pages/Admin/ALayout';
import { Routes, Route } from 'react-router-dom';
const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<ALayout/>}/>
        </Routes>
    );
};

export default AdminRouter;