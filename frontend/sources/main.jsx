import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import App from './view/App.jsx'

// scss
import './styles/style';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
