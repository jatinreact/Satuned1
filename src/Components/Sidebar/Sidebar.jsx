import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = (props) => {
  return (
    <div>
      <div className="proslider_mobile prosideclass">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>Dashboard</MenuItem>
            <MenuItem onClick={() => props.history.push("/home")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/orders")}>
              Orders
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/addProduct")}>
              Products
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/customers")}>
              Customers
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/brand-list")}>
              Add Car Brands
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/addCategory")}>
              Add Category
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/addblog")}>
              Add Blog
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/Exhaust")}>
              Add Exhaust
            </MenuItem>

            {/* <SubMenu title="Components-4">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-5">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-6">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-7">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-8">
              <MenuItem>Component 1</MenuItem>
            </SubMenu> */}
          </Menu>
        </ProSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
