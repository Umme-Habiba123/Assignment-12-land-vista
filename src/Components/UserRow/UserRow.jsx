import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const UserRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const makeAdmin = async () => {
    await axiosSecure.patch(`/users/make-admin/${user._id}`);
    Swal.fire('Success', 'User promoted to Admin', 'success');
    refetch();
  };

  const makeAgent = async () => {
    await axiosSecure.patch(`/users/make-agent/${user._id}`);
    Swal.fire('Success', 'User promoted to Agent', 'success');
    refetch();
  };

  const markFraud = async () => {
    const confirm = await Swal.fire({
      title: 'Mark as Fraud?',
      text: "Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });
    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/users/mark-fraud/${user._id}`);
      Swal.fire('Marked as Fraud', '', 'success');
      refetch();
    }
  };

  const deleteUser = async () => {
    const confirm = await Swal.fire({
      title: 'Delete user?',
      text: "This will delete from both DB and Firebase!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${user._id}`);
      Swal.fire('Deleted!', '', 'success');
      refetch();
    }
  };

  return (
    <tr>
      <td><img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" /></td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="capitalize">{user.role}</td>
      <td className="space-x-2">
        {user.role === 'fraud' ? (
          <span className="text-red-500 font-semibold">Fraud</span>
        ) : (
          <>
            {user.role !== 'admin' && (
              <button onClick={makeAdmin} className="btn btn-sm btn-info">Make Admin</button>
            )}
            {user.role === 'user' && (
              <button onClick={makeAgent} className="btn btn-sm btn-success">Make Agent</button>
            )}
            {user.role === 'agent' && (
              <button onClick={markFraud} className="btn btn-sm btn-warning">Mark as Fraud</button>
            )}
          </>
        )}
        <button onClick={deleteUser} className="btn btn-sm btn-error">Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
