import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee } from '../interfaces';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteEmployee } from '../employeeSlice';

export function EmployeeTableAction({ data }: EmployeeTableActionProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        size="small"
        onClick={() => navigate(`/employee/edit/${data.id}`)}>
        Edit
      </Button>

      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        size="small"
        onClick={() => setShowDeleteConfirmation(true)}>
        Delete
      </Button>

      <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}>
          <Box>
            <Typography variant="h6" component="h2">
              Confirm Delete
            </Typography>
            <Typography mt={2}>
              Are you sure you want to delete {data.firstName} {data.lastName}?
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => dispatch(deleteEmployee(data.id))}>
              OK
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}

export type EmployeeTableActionProps = {
  data: Employee;
};
