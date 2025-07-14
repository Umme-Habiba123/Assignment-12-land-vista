import useAuth from "../../../../hooks/useAuth";


const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      <img src={user.photoURL} alt="admin" className="w-32 rounded-full" />
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.role !== 'user' && <p><strong>Role:</strong> {user.role}</p>}
    </div>
  );
};

export default AdminProfile;
