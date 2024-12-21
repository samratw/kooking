import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [cart, setCart] = useState({});
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("user"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
  }, [router]);

  const logout = () => {
    localStorage.removeItem("user")
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
  }

  const logOut = () => {
    localStorage.removeItem("seller")
    setUser({ value: null })
    setKey(Math.random())
    router.push('/seller/login')
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
  }

  const addToCart = (itemCode, price, name, email, qty) => {
    let newCart = {}
    newCart[itemCode] = { price, name, email, qty }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  return <>
    {key && <Navbar key={key} user={user} logout={logout} logOut={logOut} cart={cart} clearCart={clearCart} />}
    <Component addToCart={addToCart} cart={cart} clearCart={clearCart} {...pageProps} />
    {/*<Footer />*/}
  </>
}

export default MyApp