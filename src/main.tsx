import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="364486711811-ef7tl0t1fova1a43phsjn8253tojmk8g.apps.googleusercontent.com">
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
)
