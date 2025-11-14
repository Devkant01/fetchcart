import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import { store } from './app/store.js';
import axios from 'axios';
import Startup from './utils/Startup.jsx';


const baseUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = baseUrl;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Startup />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </Provider>
)
