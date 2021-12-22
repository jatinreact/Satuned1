import React, { useState, useEffect } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";

const CreateChassisno = (props) => {
  let SeriesName = props.location.state.data.data.seriesName;
  let seriesId = props.location.state.data.data._id;
  let BrandName = props.location.state.data.item.brandName;
  let brandId = props.location.state.data.item._id;

  // console.log("grant", props.location.state.data.item.brandName);

  const [BrandDeopdownArry, setBrandDeopdownArry] = useState([]);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [Seriesnamedropdown, setSeriesnamedropdown] = useState([]);

  // const [brandId, setbrandId] = useState("");
  // const [seriesId, setseriesId] = useState("");
  const [number, setnumber] = useState("");

  ///get Brand name dropdown Api
  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "getBrand";

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data Brand:::", res);

          setBrandDeopdownArry(res.data);
        },

        (error) => {
          setisloading(false);
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        setisloading(false);
        console.log("data response error:::", e);
      });
  }, [isupdated]);

  const getSeriesdata = (e) => {
    let brandId = e.target.value;
    if (brandId === "") {
      // setbrandId("");
      return;
    }
    // setbrandId(brandId);
    let url = getBaseUrl() + `getSeriesByBrand/${brandId}`;

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data dropdownseries:::", res);

          setSeriesnamedropdown(res.data);
        },

        (error) => {
          setisloading(false);
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        setisloading(false);
        console.log("data response error:::", e);
      });
  };

  //add Chassisno
  const addChassisno = () => {
    let url = getBaseUrl() + "addChassisNumber";
    setisloading(true);

    let temp = {
      brandId,
      seriesId,
      number,
    };
    axios
      .post(url, temp)
      .then(
        (res) => {
          console.log("data seriese:::", res);
          setisloading(false);
          props.history.goBack();
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
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="home_padding">
          <div className="content_padding">
            <Grid className="Component_main_grid p-2 "></Grid>

            <div>
              <Card className=" mb-2 Card_shadow p-3">
                <div className="card_admissiondetails_height">
                  <div className="textfiled_margin">
                    <div className="card_content_instition">
                      <h5 className="text_filed_heading">Add Chassis No</h5>

                      <Grid className="Component_main_grid">
                        <Grid item md={12}>
                          <div className="text_filed_heading">Brand Name</div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={brandId}
                              onChange={(e) => {
                                getSeriesdata(e);
                              }}
                            >
                              <option>---select brand---</option>
                              {BrandDeopdownArry.map((row, index) => (
                                <option value={row._id}>{row.brandName}</option>
                              ))}
                            </select> */}
                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              disabled
                              value={BrandName}
                              // onChange={(e) => {
                              //   setseriesId(e.target.value);
                              // }}
                            />
                          </div>

                          <div className="text_filed_heading">Series Name</div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={seriesId}
                              onChange={(e) => {
                                setseriesId(e.target.value);
                              }}
                            >
                              <option>---select Series---</option>
                              {Seriesnamedropdown.map((row, index) => (
                                <option value={row._id}>
                                  {row.seriesName}
                                </option>
                              ))}
                            </select> */}
                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              disabled
                              value={SeriesName}
                              // onChange={(e) => {
                              //   setseriesId(e.target.value);
                              // }}
                            />
                          </div>

                          <div className="text_filed_heading">
                            Add Chassis No
                          </div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Chassis No"
                              autoComplete="off"
                              value={number}
                              onChange={(e) => {
                                setnumber(e.target.value);
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="mt-2 pb-3 ">
                      <Button
                        variant="contained"
                        className="button_formatting"
                        onClick={addChassisno}
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
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(CreateChassisno);
