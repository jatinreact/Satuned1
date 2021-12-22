import React, { useEffect, useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import HOC from "../../../Common/Hoc";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const CreateBlog = (props) => {
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);

  const [tittle, settittle] = useState("");
  const [author, setauthor] = useState("");
  const [image, setimage] = useState(null);
  const [date, setdate] = useState("");
  const [discription, setdiscription] = useState("");

  ///Error
  const [Errortittle, setErrortittle] = useState(false);
  const [Errorauthor, setErrorauthor] = useState(false);

  const [Errordate, setErrordate] = useState(false);
  const [Errordiscription, setErrordiscription] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addBlogData = () => {
    try {
      if (image === null || image === "") {
        alert("Choose the image");
        return;
      }
      if (!blankValidator(tittle)) {
        setErrortittle(true);
        return;
      }
      if (!blankValidator(author)) {
        setErrorauthor(true);
        return;
      }
      if (!blankValidator(date)) {
        setErrordate(true);
        return;
      }
      if (!blankValidator(discription)) {
        setErrordiscription(true);
        return;
      }

      setisloading(true);
      let url = getBaseUrl() + "addBlog";
      setisloading(true);

      const fd = new FormData();

      fd.append("title", tittle);
      fd.append("author_name", author);
      fd.append("date", date);
      fd.append("description", discription);

      //********* HERE IS THE CHANGE ***********

      fd.append("myField", image);

      axios
        .post(url, fd)
        .then(
          (res) => {
            console.log("data blogfield:::", res);
            showNotificationMsz(res.data.msg, "success");
            setisupdated(!isupdated);
            setisloading(false);
            settittle("");
            setauthor("");
            setimage(null);
            setdate("");
            setdiscription("");
            props.history.push("/addblog");
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
                    <h5 className="text_filed_heading">Add Blog</h5>

                    <Grid className="Component_main_grid">
                      <Grid item md={6}>
                        <div className="text_filed_heading">Title</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Title"
                            autoComplete="off"
                            value={tittle}
                            onChange={(e) => {
                              setErrortittle(false);
                              settittle(e.target.value);
                            }}
                          />
                          {Errortittle && (
                            <span className="text-danger">Enter Title</span>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="text_filed_heading">Author Name</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Authorname"
                            autoComplete="off"
                            value={author}
                            onChange={(e) => {
                              setErrorauthor(false);
                              setauthor(e.target.value);
                            }}
                          />
                          {Errorauthor && (
                            <span className="text-danger">
                              Enter Authorname
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>

                    <Grid className="Component_main_grid">
                      <Grid item md={6}>
                        <div className="text_filed_heading mt-3 mb-2">
                          Add Blog Image
                        </div>
                        <div className="mr-2 mt-1">
                          <input
                            type="file"
                            class="form-control"
                            onChange={(e) => setimage(e.target.files[0])}
                          />
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="text_filed_heading mt-3 mb-2">
                          Add Date
                        </div>
                        <div className="mr-2 mt-1">
                          <input
                            type="date"
                            class="form-control"
                            value={date}
                            onChange={(e) => {
                              setErrordate(false);
                              setdate(e.target.value);
                            }}
                          />
                          {Errordate && (
                            <span className="text-danger">Select Date</span>
                          )}
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
                            value={discription}
                            onChange={(e) => {
                              setErrordiscription(false);
                              setdiscription(e.target.value);
                            }}
                          />{" "}
                          {Errordiscription && (
                            <span className="text-danger">
                              Enter Description
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
                      onClick={addBlogData}
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

export default HOC(CreateBlog);
