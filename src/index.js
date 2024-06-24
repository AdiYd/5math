import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './pages/App.css';
import './assets/style/media.css';
import './assets/style/style.css';
import './assets/style/variables.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { MathJaxContext } from "better-react-mathjax";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


// Example usage of environment variables

const MathJaxSrc = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'//'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'; //https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js
const GglClientID = '1032984137880-aa1mhd4l96nlrmha42cjshsail7odfe2.apps.googleusercontent.com';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({

})
export const User = createContext({
  name: 'John Doe',
  google: false,
  subscribe: false,
  isAuth: false,
  email: 'JohnDoe@5math.co.il',
  picture: null,
  darkMode: false,
  jwt: null
})

root.render(
  <React.StrictMode>
    <BrowserRouter>

      {/* <div className='background'></div> */}
      <div className='bg bg1'></div>
      <div className='mathLayout'></div>
      <MathJaxContext
        hideUntilTypeset='every'
        // onStartup={(val) => { console.log('This is my startup: ', val) }}
        // onError={(val) => console.log('This is my error: ', val)}
        // onLoad={(val) => console.log('This is my load: ', val)}
        // typesettingOptions={{}}
        version={3}
        // renderMode='post'
        config={{
          loader: { load: ["[tex]/html"] },
          tex: {
            packages: { "[+]": ["html"] },
            inlineMath: [["$", "$"]],
            displayMath: [["$$", "$$"]]
          },
          tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)'], ['$$', '$$'], ['\\\(', '\\\)'], ['\\\\(', '\\\\)']],
            displayMath: [["$$", "$$"]]
          },
          tex3jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)'], ['$$', '$$'], ['\\\(', '\\\)'], ['\\\\(', '\\\\)']],
            displayMath: [["$$", "$$"]]
          }
        }}
        src={MathJaxSrc}
      >
        <GoogleOAuthProvider clientId={GglClientID}>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </CookiesProvider>
        </GoogleOAuthProvider>
      </MathJaxContext>
    </BrowserRouter>
  </React.StrictMode>
);
