import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

export const NavigationData = [

    {
        id : 1,
        title : "Admin",
        name : 'admin',
        icon : <AdminPanelSettingsIcon/>,
        link : "/panel/admin",
        
    },

    {
        id : 2,
        title: "Users",
        name : 'users',
        icon : <PeopleAltIcon/>,
        link : "/panel/users",
        
    },

    {
        id : 3,
        title : "Dashboard",
        name : 'dashboard',
        icon : <TroubleshootIcon/>,
        link : "/panel/dashboard" ,
        
    }


]
