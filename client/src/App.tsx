import { useState } from 'react';
import axios from 'axios'; //new messenger
import './App.css'; 

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const hadnleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //this will stop page from reloading
    setError('');
    setShortUrl('');

    try{
      //backend interaction
      const response = await axios.post(
        'http://localhost:3001/shorten', //backend's API endpoint
        { longUrl: longUrl}
      );

      setShortUrl(response.data.shortUrl); //set the successful short URL
      setLongUrl(''); //Clear the input box
    } catch (err: any) {
      //Catching the error from server
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error);
      } else {
        setError('An unkown error occured');
      }
    }
  };

  return (
    <div className="conatiner">
      <header>
        <h1>URL Shortner</h1>
        <p>Create clean, short links in a snap</p>
      </header>

      <form onSubmit={hadnleSubmit} className="url-form">
        <input
          type = "text"
          placeholder="Enter your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {/* Show the short URL if it exists */}
      {
        shortUrl && (
          <div className="result">
            <p>Your short link:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )
      }

      {/* Show an error if it exists */}
      {
        error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )
      }
    </div>
  );
}

export default App;