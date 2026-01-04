import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Product from './pages/Product';
import Shop from './pages/Shop';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Cart": Cart,
    "Contact": Contact,
    "FAQ": FAQ,
    "Home": Home,
    "HowItWorks": HowItWorks,
    "Product": Product,
    "Shop": Shop,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};