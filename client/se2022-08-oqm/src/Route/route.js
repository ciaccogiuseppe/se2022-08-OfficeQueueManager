
import FirstPage from "../Views/FirstPage";
import LoginOfficer from "../Views/LoginOfficer";
import LoginManager from "../Views/LoginManager";
import ManagerPage from "../Views/ManagerPage";
import AddCounter from "../Views/AddCounter";
import DefineService from "../Views/DefineService";
import AssignServiceToCounter from "../Views/AssignServiceToCounter";
import TicketPage from "../Views/TicketPage";
import ClientPage from "../Views/ClientPage";


export const routeIndex = [
    {
        name: "Home",
        component: <FirstPage/>,
        path: '/'
    },
    {
        name: "Login Manager",
        component: <LoginManager/>,
        path: '/manager-login'
    },
    {
        name: "Login Officer",
        component: <LoginOfficer/>,
        path: '/officer'
    },
    {
        name: "Manager Page",
        component: <ManagerPage />,
        path: '/manager'
    },
    {
        name: "Add Counter",
        component: <AddCounter/>,
        path: '/manager/addcounter'
    },
    {
        name: "Define Service",
        component: <DefineService/>,
        path: '/manager/defineservice'
    },
    {
        name: "Assign services to a counter",
        component: <AssignServiceToCounter/>,
        path: '/manager/assign'
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



