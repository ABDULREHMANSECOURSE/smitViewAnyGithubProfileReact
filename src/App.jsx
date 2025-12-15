import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [username, setUsername] = useState('abdulrehmansecourse');
  const [displayName, setDisplayName] = useState('');
  const inputRef = useRef(null);
  const [accountLink, setAccountLink] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDisplayName(data.name);
      setAccountLink(data.html_url);
      setAvatarUrl(data.avatar_url);
      setUsername(data.login);
      setEmail(data.email);
    });
  }, [username]);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => setUsername(inputRef.current.value)}>Find</button>
      <h1>{displayName}</h1>
      <h2>{username}</h2>
      <h3>Email: {email ? `Email: ${email}` : 'No email provided'}</h3>
      <a href={accountLink}>{accountLink}</a>
      <img src={avatarUrl} alt="" />
    </div>
  );
}

export default App;
