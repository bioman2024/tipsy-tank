import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Shop": Shop,
    "Product": Product,
    "HowItWorks": HowItWorks,
    "About": About,
    "FAQ": FAQ,
    "Contact": Contact,
    "Cart": Cart,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};