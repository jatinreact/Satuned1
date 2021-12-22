import React, { useState, useEffect } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";

const CarmodelCreate = (props) => {
  console.log("props", props);
  let BrandName = props.location.state.BrandName.brandName;
  let brandId = props.location.state.BrandName._id;
  let SeriesName = props.location.state.SeriesName.seriesName;
  let seriesId = props.location.state.SeriesName._id;
  let chasisNumber = props.location.state.chasisId.number;
  let chassisId = props.location.state.chasisId._id;

  // console.log("carmodel", props.location.state.chasisId.number);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  // const [brandId, setbrandId] = useState("");

  // const [seriesId, setseriesId] = useState("");
  // const [chassisId, setchassisId] = useState("");
  const [model, setmodel] = useState("");
  const [BrandDropDownArry, setBrandDropDownArry] = useState([]);
  ///get Brand name dropdown Api
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //add modelno
  const addmodelno = () => {
    let url = getBaseUrl() + "addModel";
    setisloading(true);

    let temp = {
      brandId,
      seriesId,
      chassisId,
      model,
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

  //update series name

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
                      <h5 className="text_filed_heading">Add Car Model</h5>

                      <Grid className="Component_main_grid">
                        <Grid item md={12}>
                          <div className="text_filed_heading">Brand Name</div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={brandId}
                              onChange={(e) => getSeriesdata(e)}
                            >
                              <option value="">---select brand---</option>
                              {BrandDropDownArry.length > 0 ? (
                                BrandDropDownArry.map((row, index) => (
                                  <option value={row._id}>
                                    {row.brandName}
                                  </option>
                                ))
                              ) : (
                                <option value="">No Data</option>
                              )}
                            </select> */}

                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              value={BrandName}
                              disabled
                              // onChange={(e) => {
                              //   setmodel(e.target.value);
                              // }}
                            />
                          </div>

                          <div className="text_filed_heading">Series Name</div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={seriesId}
                              onChange={(e) => getChassisdata(e)}
                            >
                              <option value="">---select Series---</option>
                              {Seriesdropdown.length > 0 ? (
                                Seriesdropdown.map((row, item) => (
                                  <option value={row._id}>
                                    {row.seriesName}
                                  </option>
                                ))
                              ) : (
                                <option value="">No Data</option>
                              )}
                            </select> */}
                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              value={SeriesName}
                              disabled
                              // onChange={(e) => {
                              //   setmodel(e.target.value);
                              // }}
                            />
                          </div>

                          <div className="text_filed_heading">
                            Chassis Number
                          </div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={chassisId}
                              onChange={(e) => setchassisId(e.target.value)}
                            >
                              <option value="">
                                ---select chassis number---
                              </option>
                              {ChassisDataArry.map((row, item) => (
                                <option value={row._id}>{row.number}</option>
                              ))}
                            </select> */}
                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              value={chasisNumber}
                              disabled
                              // onChange={(e) => {
                              //   setmodel(e.target.value);
                              // }}
                            />
                          </div>
                          <div className="text_filed_heading">Add Model</div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Model"
                              autoComplete="off"
                              value={model}
                              onChange={(e) => {
                                setmodel(e.target.value);
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
                        onClick={addmodelno}
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
    </>
  );
};

export default HOC(CarmodelCreate);
