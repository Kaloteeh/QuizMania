import './Admin.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveIcon from '@mui/icons-material/Remove';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Admin () {


    const [admins, setAdmins] = useState([]); // Initialize state to store fetched data

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(2);
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const records = admins.slice(firstIndex, lastIndex);
    const npage= Math.ceil(admins.length / usersPerPage);
    const pageNumbers = [...Array(npage+1).keys()].slice(1);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/admins');
          setAdmins(response.data); // Update the state with the fetched data
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData(); // Call the fetchData function when the component mounts
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts



    const [selectedRows, setSelectedRows] = useState([]);
    
    const handleSelectedRow = (id) => {
      if (selectedRows.includes(id)) { 
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
        
      }
    };

    const [selectedUserIdToAdmin, setSelectedUserIdToAdmin] = useState(null);
    const [userName,setUserName] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteDialog = (userId,userName) => {
      setUserName(userName);
      setSelectedUserIdToAdmin(userId);
      setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
      await axios.delete(`http://localhost:3001/api/users/${selectedUserIdToAdmin}`);
      setIsDialogOpen(false);
      window.location.reload();
    };
    
    const handleCancelDelete = () => {
      setSelectedUserIdToAdmin(null); // Clear the selected user ID
      setIsDialogOpen(false);
    }

    const [selectedUserNameToDemote,setSelectedUserNameToDemote] = useState(null);
    const [amdinDialogOpen, setAmdinDialogOpen] = useState(false);
    const [selectedAdminToDemote, setSelectedAdminToDemote] = useState(null);

    const handleDemoteAdminDialog = (userId,userName) => {
      setSelectedUserNameToDemote(userName);
      setSelectedAdminToDemote(userId);
      setAmdinDialogOpen(true);
    };

    const handleDemoteAdmin = async () => {
      await axios.post(`http://localhost:3001/api/demote/${selectedAdminToDemote}`);
      setAmdinDialogOpen(false);
      window.location.reload();
    }
    
    const hanldeDemoteCancel = () => {
      setAmdinDialogOpen(false);
    }


    return (
        <>
        <div className='mainAdminDiv'>
        <table className='table'>
          <thead className='tableHead'>
              <tr className='tableIndex'>
                <th className='th'><Button>Edit Users</Button></th>
                  <th className='th'>ID</th>
                  <th className='th'>FullName</th>
                  <th className='th'>Email</th>
                  <th className='th'>Joined</th>
              </tr>
           </thead>
          <tbody className='tbody'>
            {records.map((admin,id) => (
              <tr key={id} className={`user-item ${(id % 2==0) ? 'gray' : '' }`} id={`${selectedRows.includes(admin.id) ? 'selected-row' : ''}`}>
                <td className='td first-column'>

                {/* DELETE BUTTONS */}
                  {selectedRows.includes(admin.id) ? (
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: '1rem',
                      background: 'rgb(255,5,5,1)',
                      width: '35px',
                      ':hover': { background: 'rgb(220, 24, 24, 1)' },
                    }}
                    onClick={() => handleDeleteDialog(admin.id, admin.fullname)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                ) : (
                  <Button 
                  sx={
                    {
                      marginLeft: '1rem'
                    }
                  }disabled variant="contained">
                    <DeleteForeverIcon />
                  </Button>
                )}

              {/* DELETE BUTTONS */}

                  {/* THE DEMOTE BUTTON */}
                  {!selectedRows.includes(admin.id) ? (
                  <Fab size="small" 
                      disabled 
                      aria-label="add"
                      sx={{marginLeft:'1rem'}}>
                        <RemoveIcon />
                      </Fab>
                        ) : (<Fab size="small" 
                        sx={{background:'rgb(255,255,0,1)',
                        ':hover':{background : 'rgb(236,236,25,1)'},
                        marginLeft:'1rem'}} 
                        aria-label="add"
                        onClick={()=>handleDemoteAdminDialog(admin.id,admin.fullname)}>
                    <RemoveIcon />
                  </Fab>)}
                    {/* THE DEMOTE BUTTON */}

                    {/* THE EDIT BUTTON */}
                    <Fab size="small" 
                    color="primary"
                      aria-label="add"
                      onClick={()=>handleSelectedRow(admin.id)}
                      sx={{marginLeft:'20px',height:'35px',width:'35px',}}>
                      <EditIcon />
                    
                    </Fab>
                    {/* THE EDIT BUTTON */}
               </td>
                <td className='td'>{admin.id}</td>
                <td className='td'>{admin.fullname}</td>
                <td className='td'>{admin.email}</td>
                <td className='td'>{admin.joined}</td>
              </tr>
                        
              ))}
          </tbody>
      </table>
      <Dialog
              open={isDialogOpen}
              onClose={handleCancelDelete}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
              Are you sure you want to DELETE admin :<br/>
              <b>ID</b> - {selectedUserIdToAdmin}<br/>
              <b>Fullname </b> - {userName}
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete} sx={{background:'rgb(75,118,218)',color:'white',":hover":{background : 'rgb(123,150,213,1)'}}}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} sx={{background:'red',color:'white',":hover":{background : 'rgb(240,114,114,1)'}}} autoFocus>
                  DELETE
              </Button>
            </DialogActions>
      </Dialog>

      <Dialog
          open={amdinDialogOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Confirm Action</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
              Are you sure you want demote this ADMIN to a normal user :<br/>
              <b>ID</b> - {selectedAdminToDemote}<br/>
              <b>Fullname </b> - {selectedUserNameToDemote}
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={hanldeDemoteCancel} sx={{background:'rgb(75,118,218)',color:'white',":hover":{background : 'rgb(123,150,213,1)'}}}>
                  Cancel
                </Button>
                <Button onClick={handleDemoteAdmin} sx={{background:'rgb(98,198,72)',color:'white',":hover":{background : 'rgb(137,205,121,1)'}}} autoFocus>
                  Demote
              </Button>
            </DialogActions>
      </Dialog>
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
            <a className='page-link' href='#' onClick={prePage}>Previous</a>
        </li>
            {pageNumbers.map((number, i) => (
                <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={i}>
                <a
                    className='page-link'
                    href='#'
                    onClick={() => {

                    changePage(number);
                    }}
                >
                    {number}
                </a>
                </li>
            ))}
            <li className='page-item'>
                <a className='page-link' href='#' onClick={nextPage}>Next</a>
            </li>
        </ul>
      </nav>
</div>
        </>
    )

    function prePage() {
        if(currentPage !== 1){
           setCurrentPage(currentPage - 1);
    
        }
    }
    
    function changePage(id) {
      setCurrentPage(id);
    }
    
    function nextPage() {
      if(currentPage !== npage){ ;
        setCurrentPage(currentPage + 1);
      }
    }

}




