import { Flex, Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

const Routing = () => {
    const HomePage = lazy(() => import('../pages/Home/index'));
    const LoginPage = lazy(() => import('../pages/Login/index'));
    const RegisterPage = lazy(() => import('../pages/Register/index'));
    const AdminPage = lazy(() => import('../pages/admin/Admin'));
    const PartnerPage = lazy(() => import('../pages/partner/index'));
    const MovieDetails = lazy(() => import('../pages/Home/MovieDetail'));
    const BookShow = lazy(() => import('../pages/Home/BookShow'));
    const ProtectedPage = lazy(() => import('../components/protectedRoute/ProtectedRoute'));
    const UserProfile = lazy(() => import('../pages/user/Index'));

    return (
        <>
            <Suspense fallback={
                <Flex className='w-screen h-screen' align='center' justify='center'>
                    <Spin size='large'></Spin>
                </Flex>
            }>
                <Routes>
                    <Route path='/' element={<ProtectedPage><HomePage></HomePage></ProtectedPage>}></Route>
                    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                    <Route path='/user' element={<ProtectedPage><UserProfile></UserProfile></ProtectedPage>}></Route>
                    <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                    <Route path='/admin' element={<ProtectedPage><AdminPage></AdminPage></ProtectedPage>}></Route>
                    <Route path='/partner' element={<ProtectedPage><PartnerPage></PartnerPage></ProtectedPage>}></Route>
                    <Route path='/movie/:movieId' element={<ProtectedPage><MovieDetails></MovieDetails></ProtectedPage>}></Route>
                    <Route path='/book-show/:showId' element={<ProtectedPage><BookShow></BookShow></ProtectedPage>}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default Routing