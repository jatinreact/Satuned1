import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "../src/Components/Home/Home";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import EmailVerify from "./Components/AdminLogin/EmailVerify";
import Resetpassword from "./Components/AdminLogin/Resetpassword";
import UserData from "./Components/UserData/UserData";
import Catagories from "./Components/Catagories/Catagories";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import AddProduct from "./Components/AddProduct/AddProduct";
import Product from "./Components/AddProduct/Product";
import Customers from "./Components/Customers/Customers";
import BrandList from "./Components/ManageBrands/BrandList";
import CarModelList from "./Components/Pages/ManageModel/CarModelList";
import BrandsCreate from "./Components/ManageBrands/BrandsCreate";
import CarmodelCreate from "./Components/Pages/ManageModel/CarmodelCreate";
import SeriesList from "./Components/Pages/Series/SeriesList";
import CreateSeries from "./Components/Pages/Series/CreateSeries";
import ChassisNumberList from "./Components/Pages/ChassisNumber/ChassisNumberList";
import CreateChassisno from "./Components/Pages/ChassisNumber/CreateChassisno";
import AddCategory from "./Components/Pages/AddCategory/AddCategory";
import CreateCategory from "./Components/Pages/AddCategory/CreateCategory";
import AddBlog from "./Components/Pages/Blog/AddBlog";
import CreateBlog from "./Components/Pages/Blog/CreateBlog";
import Exhaust from "./Components/Pages/Exhaust/Exhaust";
import AddExhaust from "./Components/Pages/Exhaust/AddExhaust";
//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ProtectedRoute from "./Components/utils/ProtectedRoute";
import BannerList from "./Components/Pages/Banner/BannerList";
import AddBanner from "./Components/Pages/Banner/AddBanner";
import AddProductUploadbulk from "./Components/Pages/ProductUploadbulk/AddProductUploadbulk";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/emailverify" component={EmailVerify} />
        <Route exact path="/resetpassword" component={Resetpassword} />
        <Route exact path="/data" component={UserData} />
        <Route exact path="/catagories" component={Catagories} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/addProduct" component={AddProduct} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/brand-list" component={BrandList} />
        <Route exact path="/car-model-list" component={CarModelList} />
        <Route exact path="/brandsCreate" component={BrandsCreate} />
        <Route exact path="/carmodel" component={CarmodelCreate} />
        <Route exact path="/series-list" component={SeriesList} />
        <Route exact path="/createSeries" component={CreateSeries} />

        <Route
          exact
          path="/chassis-number-list"
          component={ChassisNumberList}
        />
        <Route exact path="/chassisno" component={CreateChassisno} />
        <Route exact path="/addCategory" component={AddCategory} />
        <Route exact path="/createCategory" component={CreateCategory} />
        <Route exact path="/addblog" component={AddBlog} />
        <Route exact path="/CreateBlog" component={CreateBlog} />
        <Route exact path="/Exhaust" component={Exhaust} />
        <Route exact path="/AddExhaust" component={AddExhaust} />
        <Route exact path="/bannerList" component={BannerList} />
        <Route exact path="/addBanner" component={AddBanner} />
        <Route exact path="/productupload" component={AddProductUploadbulk} />
      </Switch>
    </>
  );
}

export default App;
