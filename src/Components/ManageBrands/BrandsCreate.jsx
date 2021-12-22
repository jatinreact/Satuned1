import React, { useState, useEffect } from "react";
import HOC from "../../Common/Hoc";
import { Grid, Button, Card } from "@material-ui/core";
import axios from "axios";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import { blankValidator, showNotificationMsz } from "../utils/Validation";

const BrandsCreate = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isloading, setisloading] = useState(false);
  const [brandName, setbrandName] = useState("");

  //error
  const [ErrorbrandName, setErrorbrandName] = useState(false);

  const AddBrand = () => {
    try {
      if (!blankValidator(brandName)) {
        setErrorbrandName(true);
        return;
      }
      let url = getBaseUrl() + "addBrand";
      setisloading(true);

      let temp = {
        brandName: brandName,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data response:::", res);
            setisloading(false);
            props.history.push("/brand-list");
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            setisloading(false);
            console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          setisloading(false);
          console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
        });
    } catch (error) {}
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid p-2 "></Grid>

          <div>
            <Card className=" mb-2 Card_shadow p-3">
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
                    <h5 className="text_filed_heading">Add Brands</h5>

                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading">Brands</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Brand"
                            autoComplete="off"
                            value={brandName}
                            onChange={(e) => {
                              setErrorbrandName(false);
                              setbrandName(e.target.value);
                            }}
                          />
                          {ErrorbrandName && (
                            <span className="text-danger">
                              Enter Brand Name
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="mt-2 pb-3 ">
                    <Button
                      variant="contained"
                      className="button_formatting"
                      onClick={AddBrand}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Loder loading={isloading} />
    </div>
  );
};

export default HOC(BrandsCreate);
