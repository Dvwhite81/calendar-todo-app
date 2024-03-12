import { UserType } from '../utils/types';

interface ProfileProps {
  loggedInUser: UserType
}

const Profile = ({ loggedInUser }: ProfileProps) => {
  const { username } = loggedInUser;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
    </div>
  );
};

export default Profile;
