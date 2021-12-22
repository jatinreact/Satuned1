import React from "react";
import HOC from "../../Common/Hoc";

import { Card, Grid } from "@material-ui/core";

const Dashboard = (props) => {
  //local array
  const home = [
    { show: "Add Product", link: "#" },
    { show: "Add Parts", link: "#" },
    { show: "Blog Section", link: "#" },
  ];
  return (
    <div className="">
      <div className="main_div ">
        <div className="container">
          <div className="row">
            {home.map((item, index) => (
              <div className="col-md-4  col-lg-4">
                <Card
                  className="main_card Card_shadow "
                  onClick={() => props.history.push(`${item.link}`)}
                >
                  <div className="main_content ">
                    <p>
                      <span className="">
                        <i class="fa fa-plus pr-1" aria-hidden="true"></i>
                      </span>
                      {item.show}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Dashboard);
