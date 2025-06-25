import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setIsAuth } = useContext(CartContext)

  useEffect(()=>{
    const isAuthenticated = localStorage.getItem('isAuth') === 'true'
    const savedUser = localStorage.getItem('user')
    
    if(isAuthenticated && savedUser){
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuth(true)
      
      // Redirigir según el rol
      if(userData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    }
  },[])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'credenciales invalidas' });
      } else {
        if (foundUser && foundUser.password === password) {
          // Extraer nombre del email (parte antes del @)
          const userName = foundUser.email.split('@')[0];
          const userData = {
            ...foundUser,
            name: userName
          };
          
          setUser(userData);
          setIsAuth(true);
          localStorage.setItem('isAuth', true);
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Redirigir según el rol
          if(foundUser.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    navigate('/');
  };
 

  return (
    <AuthContext.Provider value={{
      email, 
      setEmail,
      password, 
      setPassword, 
      handleSubmit,
      errors,
      user,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
