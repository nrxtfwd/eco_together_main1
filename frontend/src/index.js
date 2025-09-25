// client/src/index.js
import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast';
import bg from './bg.jpeg'

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <p className='tooltip'>
      Tooltip
    </p>
    <App />
    <Toaster />
  </BrowserRouter>
)