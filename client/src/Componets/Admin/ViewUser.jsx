import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  margin: '40px',
  [theme.breakpoints.down('sm')]: {
    margin: '20px',
    padding: theme.spacing(2),
  },
}));

function ViewUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:7000/user/getAll");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pt: 10 }}>
      <Typography variant="h3" sx={{ 
        fontWeight: 800, 
        ml: 5,
        mb: 2,
        background: 'linear-gradient(45deg, #aa3bff, #ff3b8f)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        User Management
      </Typography>
      
      <GlassPaper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#aa3bff' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#aa3bff' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#aa3bff' }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassPaper>
    </Box>
  );
}

export default ViewUser;
