import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import Products from "./components/Product/Products";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import store from "./store/store";

const App = ()=> {
  return (
    <Provider store={store}>  
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Products />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>

        {/* Footer */}
        <footer className="text-center text-lg-start text-muted bg-primary mt-3">
          {/* Section: Links */}
          <section>
            <div className="container text-center text-md-start pt-4 pb-4">
              <div className="row mt-3">
                <div className="col-12 col-lg-3 col-sm-12 mb-2"  style={{width:"100%"}}>
                  <p className="mt-1 text-white" style={{textAlign:"center"}}>© 2023 Copyright: Ecommerce</p>
                </div>
              </div>
            </div>
          </section>
        </footer>
      </Router>
    </Provider>
  );
}

export default App;
