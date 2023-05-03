import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
// import { RootState } from 'path/to/root/state';
import { updateUser } from '@/store/slices/user.slice';

interface UserPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  surname: string;
  phone: string;
  activated: boolean;
  removed: boolean;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  selectedUser: UserPayload
}

export function EditUserDialog({ open, onClose, selectedUser }: EditUserDialogProps) {
  const dispatch = useDispatch();
//   const selectedUser = useSelector((state: RootState) => state.users.selectedUser);

  const [username, setUsername] = useState(selectedUser?.username);
  const [email, setEmail] = useState(selectedUser?.email);
  const [role, setRole] = useState(selectedUser?.role);
  const [name, setName] = useState(selectedUser?.name);
  const [surname, setSurname] = useState(selectedUser?.surname);
  const [phone, setPhone] = useState(selectedUser?.phone);
  const [activated, setActivated] = useState(selectedUser?.activated);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleActivatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivated(event.target.checked);
  };

  const handleEditConfirm = () => {
    const updatedUser: UserPayload = {
      ...selectedUser,
      username,
      email,
      role,
      name,
      surname,
      phone,
      activated,
    };
	console.log(updateUser)
    // dispatch(updateUser(updatedUser));
    onClose();
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField label="Username" value={username} onChange={handleUsernameChange} />
        <TextField label="Email" value={email} onChange={handleEmailChange} />
        <TextField label="Role" value={role} onChange={handleRoleChange} />
        <TextField label="Name" value={name} onChange={handleNameChange} />
        <TextField label="Surname" value={surname} onChange={handleSurnameChange} />
        <TextField label="Phone" value={phone} onChange={handlePhoneChange} />
        <div>
          <label htmlFor="activated-checkbox">Activated</label>
          <input
            id="activated-checkbox"
            type="checkbox"
            checked={activated}
            onChange={handleActivatedChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
		<Button onClick={handleEditConfirm} color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>
);
}