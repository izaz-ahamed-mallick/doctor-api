import Login from "./Components/Auth/Login/Login";
import Registration from "./Components/Auth/Registration/Registration";
import DoctorList from "./Components/Pages/DoctorList";
import Home from "./Components/Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateCom from "./Components/Pages/PrivateCom";
import Header from "./Components/Common/Header";
import DoctorDetails from "./Components/Pages/DoctorDetails";
import ContactForm from "./Components/Pages/ContactForm";
import AuthProvider from "./Components/Utils/AuthProvider";
import AppStore from "./Components/Utils/Store/AppStore";
import { Provider } from "react-redux";

import AllBlog from "./Components/Pages/Blog/AllBlog";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./Components/Pages/Profile/UserProfile";
import Footer from "./Components/Common/Footer";
const queryClient = new QueryClient();

const PublicRoute = [
    {
        path: "/login",
        Component: <Login />,
    },
    {
        path: "/reg",
        Component: <Registration />,
    },
    {
        path: "/",
        Component: <Home />,
    },
];

const PrivateComponent = [
    {
        path: "/alldoctor",
        Component: <DoctorList />,
    },
    {
        path: "/doctordetails/:id",
        Component: <DoctorDetails />,
    },
    {
        path: "/contactus",
        Component: <ContactForm />,
    },

    {
        path: "/allblog",
        Component: <AllBlog />,
    },
    {
        path: "/userprofile",
        Component: <UserProfile />,
    },
];

function App() {
    return (
        <Provider store={AppStore}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Router>
                        <Header />
                        <Routes>
                            {PublicRoute.map((page, i) => (
                                <Route
                                    key={i}
                                    path={page.path}
                                    element={page.Component}
                                />
                            ))}

                            {PrivateComponent.map((route, i) => (
                                <Route
                                    key={i}
                                    path={route.path}
                                    element={
                                        <PrivateCom>
                                            {route.Component}
                                        </PrivateCom>
                                    }
                                />
                            ))}
                        </Routes>
                        <Footer />
                    </Router>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
