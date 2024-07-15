import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
      </header>
      <main className={styles.userInfo}>
        <h2>User Information</h2>
        <div className={styles.infoItem}>
          <strong>Name:</strong> {userInfo.user_data[0].user_firstname} {userInfo.user_data[0].user_lastname}
        </div>
        <div className={styles.infoItem}>
          <strong>Email:</strong> {userInfo.user_data[0].user_email}
        </div>
        <div className={styles.infoItem}>
          <strong>Phone:</strong> {userInfo.user_data[0].user_phone}
        </div>
        <div className={styles.infoItem}>
          <strong>City:</strong> {userInfo.user_data[0].user_city}
        </div>
        <div className={styles.infoItem}>
          <strong>Zipcode:</strong> {userInfo.user_data[0].user_zipcode}
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
      </main>
    </div>
  );
}

export default Dashboard;