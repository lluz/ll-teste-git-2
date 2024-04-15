'use client'

import { useState, useEffect } from "react";

//import hljs from 'highlight.js';
//import 'highlight.js/styles/atom-one-dark.css';

type ApiError = {
    message: string;
}

export default function Page() {

  

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [data, setData] = useState(null);
  const [error, setError] = useState<ApiError | null>(null); // Store API error

  const fetchData = async (): Promise<any> => {

    setIsLoading(true);

    try {

      // const bngAPI_URL = 'https://jsonplaceholder.typicode.com/posts';
      // const bngAPI_KEY = '';
      // const bngData = {
      //   ids: ['20'],
      //   parts: ['All'],
      //   extra: ['Body']
      // };

      
      // let xhr  = new XMLHttpRequest();
      // xhr.withCredentials = false;
      // xhr.open("POST", 'https://connect.newsgen.com/api/xyz/content/get'); 
      // xhr.setRequestHeader('ngx-api-access-token', 'zupLJ3zVLKghwaHATIePrgnyGwOlE0ITGiBHudtcBW/9WYtPFag03XkntDL3Mu8E');
      // xhr.setRequestHeader("Content-Type", "text/plain");
      // xhr.onload = function(data) { console.log('uau !!!!!!!!!!!!!!!!!', data.target.response); };
      // xhr.onerror = function() { console.log('---error----');};
      // xhr.send("{ids: ['20'], parts: ['All'], extra: ['Body']}");


      // const response = await fetch(bngAPI_URL, {
      //   method: 'POST',
      //   credentials: 'omit',
      //   headers: {
      //     'ngx-api-access-token': bngAPI_KEY,
      //   },
      //   body: JSON.stringify(bngData),
      // });


      // const response = await fetch('https://dummyjson.com/quotes', {
      //   method: 'GET',
      // });


      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
      });

  
      if (!response.ok) {
        throw new Error(`LL API request failed with status: ${response.status}`);
      }

      const respData = await response.json();
      return respData;

    } catch (errorMsg: ApiError | any) {
      console.warn('LL Error fetching info / ', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
    
  };

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <h1>BNG API 1</h1>
      <div>
        {error ? (
          <p>Error: {error.message}</p>
        ) : data ? (
          <div style={{
            background: '#111',
            borderRadius: '10px',
            margin: '30px',
            padding: '10px',
          }}>
            <p style={{
              background: '#333',
              borderRadius: '10px',
              marginBottom: '10px',
              padding: '10px',
            }}>Data fetched successfully!</p>

            <div className="json-container">
              <pre>
                <code 
                  className="json-data" 

                  // dá erro RegExp  no build / start
                  // dangerouslySetInnerHTML={{ __html: hljs.highlightAuto( JSON.stringify(data, null, 2) ).value }} 
                  
                  style={{
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            </div>
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}