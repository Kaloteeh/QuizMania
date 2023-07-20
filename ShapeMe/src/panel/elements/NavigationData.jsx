import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

export const NavigationData = [

    {
        title : "Admin",
        icon : <AdminPanelSettingsIcon/>,
        link : "/panel/admin"
    },

    {
        title: "Users",
        icon : <PeopleAltIcon/>,
        link : "/panel/users"

    },

    {
        title : "Dashboard",
        icon : <TroubleshootIcon/>,
        link : "/panel/dashboard"
    }


]
