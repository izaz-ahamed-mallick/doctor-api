import React, { Suspense } from "react";
import Header from "./Component/Layout/Header/Header";
import { Provider } from "react-redux";
import AppStore from "./Store/AppStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Footer from "./Component/Layout/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

import { lazy } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./customQueryHooks/globalHooks/globalHooks";

import ErrorPage from "./Utils/Errorpage/ErrorPage";
import PrivateComponent from "./Component/Middleware/PrivateComponent";

//Lazy load import

const Login = lazy(() => import("./Component/Auth/Login/Login"));
const Registration = lazy(() =>
    import("./Component/Auth/Registration/Registration")
);
const DoctorHome = lazy(() => import("./Component/Doctor/DoctorHome"));
const Departments = lazy(() =>
    import("./Component/Doctor/Departments/Departments")
);
const BlogList = lazy(() => import("./Component/Blog/BlogList"));
const SingleBlog = lazy(() => import("./Component/Blog/SingleBlog"));
const Doctorlist = lazy(() => import("./Component/Doctor/Doctorlist"));
const DoctorDetails = lazy(() => import("./Component/Doctor/DoctorDetails"));
const UserDashboard = lazy(() => import("./Component/User/UserDashboard"));

//Lazy load import

const publicComponents = [
    { path: "/login", component: <Login /> },
    { path: "/registration", component: <Registration /> },
    { path: "/", component: <Home /> },
];

const privateComponents = [
    { path: "/doctorhome", component: <DoctorHome /> },
    { path: "/departments", component: <Departments /> },
    { path: "/bloglist", component: <BlogList /> },
    { path: "/bloglist/:id", component: <SingleBlog /> },
    { path: "/doctor/:deptName/:id", component: <Doctorlist /> },
    { path: "/doctor/doctorDetails/:drId", component: <DoctorDetails /> },
    { path: "/userdashboard", component: <UserDashboard /> },
];

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Suspense fallback=<h1>Loading...</h1>>
                    <QueryClientProvider client={queryClient}>
                        <Provider store={AppStore}>
                            <Header />
                            <Routes>
                                {publicComponents.map((com, i) => (
                                    <Route
                                        key={i}
                                        path={com.path}
                                        element={com.component}
                                    />
                                ))}
                                {privateComponents.map((com, i) => (
                                    <Route
                                        key={i}
                                        path={com.path}
                                        element={
                                            <PrivateComponent>
                                                {com.component}
                                            </PrivateComponent>
                                        }
                                    />
                                ))}
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                            <Footer />
                        </Provider>
                    </QueryClientProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
};

export default App;
