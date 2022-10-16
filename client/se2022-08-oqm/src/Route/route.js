
import FirstPage from "../Views/FirstPage";
/*import LoginManager from "../Views/LoginManager";
import LoginOfficer from "../Views/LoginOfficer";
import ManagerPage from "../Views/ManagerPage";

    {
        name: "Login Manager",
        component: <LoginManager onLogin={handleLogin} />,
        path: '/manager-login'
    },
    {
        name: "Login Officer",
        component: <LoginOfficer onLogin={handleLogin} />,
        path: '/officer-login'
    },
    {
        name: "Manager page",
        component: <ManagerPage token={token} onLogout={handleLogout} />,
        path: 'manager'
    }
*/


export const routeIndex = [
    {
        name: "Home",
        component: <FirstPage/>,
        path: '/'
    }
]



