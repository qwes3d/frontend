import { useEffect, useState } from 'react';
import API from '../api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/auth/profile').then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      {profile ? (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default ProfilePage;
