import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  const [username, setUsername] = useState('abdulrehmansecourse');
  const [displayName, setDisplayName] = useState('');
  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDisplayName(data.name);
    });
  }, [username]);
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => setUsername(inputRef.current.value)}>Find</button>
      <h1>{displayName}</h1>
    </div>
  );
}

export default App;
