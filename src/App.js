import react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  Products,
  SingleProduct,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/About" element={<About />} />

        <Route path="/Products" element={<Products />} />

        <Route path="/Cart" element={<Cart />} />

        <Route path="/Products/:id" element={<SingleProduct />} />

        <Route path="/Checkout" element={<Checkout />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
