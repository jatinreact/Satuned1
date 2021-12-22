import React, { useEffect, useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import HOC from "../../../Common/Hoc";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const AddBanner = (props) => {
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [heading, setheading] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);

  ///Error

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addBannerData = () => {
    try {
      setisloading(true);
      let url = getBaseUrl() + "addBanner";
      setisloading(true);

      const fd = new FormData();

      fd.append("heading", heading);
      fd.append("description", description);

      //********* HERE IS THE CHANGE ***********

      fd.append("myField", image);

      axios
        .post(url, fd)
        .then(
          (res) => {
            console.log("data banner:::", res);
            showNotificationMsz(res.data.msg, "success");
            setisupdated(!isupdated);
            setisloading(false);

            props.history.push("/bannerList");
          },

          (error) => {
            console.log("data response blogfield:::", error);
            setisloading(false);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          console.log("data response blogfield:::", e);
          setisloading(false);
          showNotificationMsz(e, "danger");
        });
    } catch (error) {}
  };

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid p-2 "></Grid>

          <div>
            <Card className=" mb-2 Card_shadow p-3">
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
                    <h5 className="text_filed_heading">Add Banner</h5>

                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading">Heading</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Title"
                            autoComplete="off"
                            value={heading}
                            onChange={(e) => {
                              setheading(e.target.value);
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading mt-3 mb-2">
                          Add Blog Image
                        </div>
                        <div className="mr-2 mt-1">
                          <input
                            type="file"
                            accept="video/*"
                            class="form-control"
                            onChange={(e) => setimage(e.target.files[0])}
                          />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading">Description</div>
                        <div className=" mt-1 mr-2">
                          <textarea
                            rows="3"
                            type="text"
                            className="form-control "
                            placeholder=" Description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => {
                              setdescription(e.target.value);
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
                      onClick={addBannerData}
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
    </>
  );
};

export default HOC(AddBanner);
