import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import ForgetPassword from './pages/Auth/ForgetPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Products from './pages/Admin/Products'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categorise from './pages/Categorise'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='/categories' element={<Categorise />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/dashboard' element={ <PrivateRoute/>}>
            <Route path='user' element={<Dashboard />} />
            <Route path='user/orders' element={<Orders />} />
            <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={ <AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-categories' element={<CreateCategory/>} />
            <Route path='admin/create-product' element={<CreateProduct />} />
            <Route path='admin/product/:slug' element={<UpdateProduct />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;