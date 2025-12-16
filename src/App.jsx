import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState(null);
  
  function findAccount() {
    if (!inputRef.current.value) {
      setError('Please enter a username');
      return;
    } else {
      setError(null);
      callApi()
    }
    function callApi() {
      fetch(`https://api.github.com/users/${inputRef.current.value}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.message) {
            setError(data.message);
            setUserData({});
            return;
          }
          setError(null);
          setUserDetail(data);
        });
    }
  }
  useEffect(() => {
    if (userDetail) {
      setUserData(userDetail);
    }
  }, [userDetail]);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => findAccount()}>Find</button>
      <h1>{error}</h1>
      <h1>{userData.name}</h1>
      <h2>{userData.login}</h2>
      <h3>Email: {userData.email ? `Email: ${userData.email}` : 'No email provided'}</h3>
      <a href={userData.html_url}>{userData.html_url}</a>
      <img src={userData.avatar_url} alt="" />
    </div>
  );
}

export default App;
