import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

//DIALOG BOX
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function BannerList(props) {
  const [EditDailogOpen, setEditDailogOpen] = useState("");

  const [Edittittle, setEdittittle] = useState("");
  const [Editauthor, setEditauthor] = useState("");
  const [Editimage, setEditimage] = useState(null);
  const [Editdate, setEditdate] = useState("");
  const [Editdiscription, setEditdiscription] = useState("");
  const [EditId, setEditId] = useState("");
  const [BlogsDataArry, setBlogsDataArry] = useState([]);
  const [isupdated, setisupdated] = useState(false);

  const [isloading, setisloading] = useState(false);
  const [bannerDataArry, setbannerDataArry] = useState([]);

  const [heading, setheading] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);

  const EditBlogData = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setEdittittle(row.title);
    setEditauthor(row.author_name);
    setEditimage(row.image);
    setEditdate(row.date);
    setEditdiscription(row.description);
    setEditId(row._id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "getBanner";

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data banner:::", res);

          setbannerDataArry(res.data);
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

  ///delete banner Name
  const deletebanner = (row) => {
    let id = row._id;
    setisloading(false);
    let url = getBaseUrl() + `deleteBanner/${id}`;
    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };

  ////update banner

  // const updateBannerData = () => {
  //   try {
  //     setisloading(true);
  //     let url = getBaseUrl() + "editBanner";
  //     setisloading(true);

  //     const fd = new FormData();

  //     fd.append("heading", heading);
  //     fd.append("description", description);

  //     //********* HERE IS THE CHANGE ***********

  //     fd.append("myField", image);

  //     axios
  //       .post(url, fd)
  //       .then(
  //         (res) => {
  //           console.log("data banner:::", res);
  //           showNotificationMsz(res.data.msg, "success");
  //           setisupdated(!isupdated);
  //           setisloading(false);

  //           props.history.push("/bannerList");
  //         },

  //         (error) => {
  //           console.log("data response blogfield:::", error);
  //           setisloading(false);
  //           showNotificationMsz(error, "danger");
  //         }
  //       )
  //       .catch((e) => {
  //         console.log("data response blogfield:::", e);
  //         setisloading(false);
  //         showNotificationMsz(e, "danger");
  //       });
  //   } catch (error) {}
  // };

  //paginaton

  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [titlename, settitlename] = useState("");

  const filterData = bannerDataArry.filter((event) => {
    return event.heading.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Banner</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.push("/addBanner")}
              >
                <i class="fa fa-plus"></i> Create
              </button>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.goBack()}
              >
                <i class="fa fa-arrow-left"></i>Go Back
              </button>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Heading</TableCell>
                    {/* <TableCell>Description</TableCell> */}

                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row) => (
                    <TableRow key={row}>
                      <TableCell>
                        <video width="320" height="240" controls>
                          <source
                            src={getBaseUrl() + `${row.video}`}
                            type="video/mp4"
                          ></source>
                        </video>
                      </TableCell>

                      <TableCell>{row.heading}</TableCell>
                      {/* <TableCell>{row.description}</TableCell> */}

                      <TableCell>
                        <div className="d-flex">
                          {/* <button
                            type="button"
                            class="btn btn-info mr-4"
                            // onClick={() => setEditDailogOpen(!EditDailogOpen)}
                            onClick={() => EditBlogData(row)}
                          >
                            <i class="fa fa-edit"></i>
                          </button> */}
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={() => deletebanner(row)}
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <br />
          <Dialog
            open={EditDailogOpen}
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
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
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button className="button_formatting">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
export default HOC(BannerList);
