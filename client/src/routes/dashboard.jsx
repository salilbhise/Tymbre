import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
import About from "../views/About/About";

// import Typography from "../views/Typography/Typography";
// import Icons from "../views/Icons/Icons";
// import Maps from "../views/Maps/Maps";
// import Notifications from "../views/Notifications/Notifications";
import Upgrade from "../views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/table",
    name: "Following",
    icon: "pe-7s-note2",
    component: TableList
  },
  // {
  //   path: "/trends",
  //   name: "Trends",
  //   icon: "pe-7s-note2",
  //   component: Trends
  // },
  {
    path: "/about",
    name: "About",
    icon: "pe-7s-coffee",
    component: About
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Send Feedback",
    icon: "pe-7s-mail",
    component: Upgrade
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
