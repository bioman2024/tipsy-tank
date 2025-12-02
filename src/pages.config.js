import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Shop": Shop,
    "Product": Product,
    "HowItWorks": HowItWorks,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};