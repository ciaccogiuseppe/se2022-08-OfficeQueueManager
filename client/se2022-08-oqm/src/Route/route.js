
import FirstPage from "../Views/FirstPage";
import LoginManager from "../Views/LoginManager";
import LoginOfficer from "../Views/LoginOfficer";
import ManagerPage from "../Views/ManagerPage";


export const routeIndex = [
    {
        name: "Home",
        component: <FirstPage/>,
        path: '/'
    },
    {
        name: "Login Manager",
        component: <LoginManager/>,
        path: '/manager'
    },
    {
        name: "Login Officer",
        component: <LoginOfficer/>,
        path: '/officer'
    },
    {
        name: "Manager page",
        component: <ManagerPage/>,
        path: '/manager'
    }
]



