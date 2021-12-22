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
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";

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

function CarModelList(props) {
  let BrandName = props.location.state.item.brandName;
  let BrandId = props.location.state.item._id;
  let SeriesName = props.location.state.dataa.data.seriesName;
  let SerieId = props.location.state.dataa.data._id;
  let chasisNumber = props.location.state.data.number;

  // console.log("modellist", props.location.state.data.number);

  let ChassisId = props.location.state.data._id;
  const [modelDataArry, setmodelDataArry] = useState([]);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [EditCarModelData, setEditCarModelData] = useState("");
  const [EditId, setEditId] = useState("");
  const EditCarModel = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setEditCarModelData(row.model);
    setEditId(row._id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ///get carmodel no  Api
  useEffect(() => {
    let url = getBaseUrl() + `getModelByChassis/${ChassisId}`;

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data carmodel no:::", res);

          setmodelDataArry(res.data);
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

  //deletecarmodel no ---

  const deleteCarmodelno = (row) => {
    let id = row._id;
    setisloading(false);
    let url = getBaseUrl() + `deleteModel/${id}`;
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

  //update Car Model name

  const UpdateCarModel = (ID) => {
    let id = ID;
    setisloading(true);
    let url = getBaseUrl() + `updateModel/${id}`;
    let temp = {
      model: EditCarModelData,
    };

    axios
      .patch(url, temp)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
          setEditDailogOpen(!EditDailogOpen);
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

  const filterData = modelDataArry.filter((event) => {
    return event.model.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Car Model</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() =>
                  props.history.push("/carmodel", {
                    BrandName: props.location.state.item,

                    SeriesName: props.location.state.dataa.data,
                    chasisId: props.location.state.data,
                  })
                }
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
                    <TableCell>Car Model Name</TableCell>{" "}
                    <TableCell>Operations</TableCell>
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
                    <TableRow key={row.name}>
                      <TableCell>{row.model}</TableCell>

                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => EditCarModel(row)}
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteCarmodelno(row)}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
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
              Add Car Model
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
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

                        <div className="text_filed_heading">Chassis Number</div>
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
                          />
                        </div>
                        <div className="text_filed_heading">Add Model</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Enter Model"
                            autoComplete="off"
                            value={EditCarModelData}
                            onChange={(e) => {
                              setEditCarModelData(e.target.value);
                            }}
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
              <Button
                className="button_formatting"
                onClick={() => UpdateCarModel(EditId)}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
export default HOC(CarModelList);
