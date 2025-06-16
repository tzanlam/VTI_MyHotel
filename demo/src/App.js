import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import AdminLayout from './layouts/AdminLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setupInterceptors } from './config/axios';

setupInterceptors(store)
function App() {
  return (
    <Provider store={store}>
    <RouterProvider router={router}>
      <AdminLayout />
    </RouterProvider>
    </Provider>
  );
}

export default App;
