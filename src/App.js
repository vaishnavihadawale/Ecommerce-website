import "./App.css";
import { Navbar } from "./component/Navbar/navbar";
import { Home } from "./component/home/home";
import { Shop } from "./component/shop/shop";
import { MensWear } from "./component/mens wear/mens-wear";
import { SingleProduct } from "./component/Single-Product/singleProduct";
import { BrowserRouter as router, Route, Routes } from "react-router-dom";
import { ShopForWomen } from "./component/womenswear/shopforwomens";
import { SareeDetail } from "./component/single-product-saree/singleproductforsaree";
import { Cart } from "./component/cart/cart";
import { Register } from "./component/registeruser/register";
import { Login } from "./component/loginuser/login";
import { WomenKurtaSet } from "./component/womens-kurta-set/womenskurtaset";
import { MenkurtaSet } from "./component/menkurtaset/menkurtaset";
import { WomensEthenicWear } from "./component/detail-women-kurta-set/kurta-set";
import { ProductPurchase } from "./component/productpurchase/productpurchase";
import { MyOrder } from "./component/myorder/myorder";
import { CasualShirtInfo } from "./component/casualshirtsingleproduct/casualshirt";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menswear" element={<MensWear />} />
        <Route path="/womenswear" element={<ShopForWomen />} />
        <Route path="/singleProductSaree" element={<SareeDetail />} />

        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopforwomen" element={<WomenKurtaSet />} />
        <Route path="/traditionalformen" element={<MenkurtaSet />} />
        <Route path="/womenethenicwear" element={<WomensEthenicWear />} />
        <Route path="/productpurchase" element={<ProductPurchase />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleshirtdetail" element={<CasualShirtInfo />}/>
        {/* <Route>
          <PrivateRoute
            path="/cart"
            component={Cart}
            auth={false}
          ></PrivateRoute>
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
