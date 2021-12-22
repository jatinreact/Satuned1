import React, { useState, useEffect } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import { Row } from "react-bootstrap";

const CreateSeries = (props) => {
  console.log("brand data", props.location.state.data);
  //barad name
  let brandName = props.location.state.data.brandName;

  //brand Id
  let brandId = props.location.state.data._id;

  const [series, setseries] = useState("");
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [DropdownArry, setDropdownArry] = useState([]);

  //add series
  const addSeries = () => {
    let url = getBaseUrl() + "addSeries";
    setisloading(true);

    let temp = {
      seriesName: series,
      brandId: brandId,
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

  ///get Brand Api with dropdown series
  useEffect(() => {
    let url = getBaseUrl() + "getBrand";

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data Brand:::", res);

          setDropdownArry(res.data);
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
                      <h5 className="text_filed_heading">Add Series</h5>

                      <Grid className="Component_main_grid">
                        <Grid item md={12}>
                          <div className="text_filed_heading">Brand Name</div>
                          <div className=" mt-1 mr-2">
                            {/* <select
                              class="form-control"
                              value={brandId}
                              onChange={(e) => {
                                setbrandId(e.target.value);
                              }}
                            >
                              <option>---select brand---</option>
                              {DropdownArry.map((item, index) => (
                                <option value={item._id}>
                                  {item.brandName}
                                </option>
                              ))}
                            </select> */}

                            <input
                              type="text"
                              className="form-control "
                              autoComplete="off"
                              value={brandName}
                              disabled
                            />
                          </div>

                          <div className="text_filed_heading">Add Series</div>
                          <div className=" mt-1 mr-2">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Series"
                              autoComplete="off"
                              value={series}
                              onChange={(e) => {
                                setseries(e.target.value);
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
                        onClick={addSeries}
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

export default HOC(CreateSeries);
