import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import App from './view/App.jsx'
import { ToastProvider } from './contexts/toastContext.jsx';

// scss
import './styles/style';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ToastProvider>
      <App />
    </ToastProvider>
  </HashRouter>,
)


