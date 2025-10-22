 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './component/usecontext.jsx'

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <ContextProvider>
           <App />
    </ContextProvider>
    </BrowserRouter>
 
)
