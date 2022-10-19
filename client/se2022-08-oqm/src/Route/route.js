
import ClientPage from "../Views/ClientPage";
import FirstPage from "../Views/FirstPage";
import LoginManager from "../Views/LoginManager";
import LoginOfficer from "../Views/LoginOfficer";
import ManagerPage from "../Views/ManagerPage";
import TicketPage from "../Views/TicketPage";


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
    },

    {
        name: "Client Page",
        component: <ClientPage/>,
        path: '/client'
    },
    {
        name: "Ticket Page",
        component: <TicketPage/>,
        path: '/client/ticket'
    }
]



