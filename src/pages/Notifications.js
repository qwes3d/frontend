import { useEffect, useState } from 'react';
import API from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get('/notifications')
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Notifications</h2>
      <ul>
        {notifications.map((note) => (
          <li key={note._id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
