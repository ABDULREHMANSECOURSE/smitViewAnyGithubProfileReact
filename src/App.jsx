import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState();
  
  function findAccount(inputValue) {
    if (!inputValue) {
      setError('Please enter a username');
      return;
    } else {
      callApi()
    }
    function callApi() {
      fetch(`https://api.github.com/users/${inputValue}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.message) {
            setError(data.message,data.status);
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
      <button onClick={() => findAccount(inputRef.current.value.trim())}>Find</button>
      <h1>{error}</h1>
      <h1>{userData.name}</h1>
      <h2>{userData.login}</h2>
      {error === null ? <h3>Email: {userData.email ? `Email: ${userData.email}` : 'No email provided'}</h3> : null}
      <a href={userData.html_url}>{userData.html_url}</a>
      <img src={userData.avatar_url} alt="" />
    </div>
  );
}

export default App;
