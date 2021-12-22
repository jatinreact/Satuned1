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

function ChassisNumberList(props) {
  let BrandName = props.location.state.item.brandName;
  let BrandId = props.location.state.item._id;
  // console.log("data item", props.location.state.item._id);
  //brand
  // let Branddata = props.location.state;
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);

  const [EditChassisno, setEditChassisno] = useState("");
  const [EditId, setEditId] = useState("");

  const UpdateChassisno = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setEditChassisno(row.number);
    setEditId(row._id);
  };

  //paginaton

  const [EditDailogOpen, setEditDailogOpen] = useState("");

  const [ChassisNoDataArry, setChassisNoDataArry] = useState([]);

  let SeriesId = props.location.state.data._id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ///get Chassis no  Api
  useEffect(() => {
    let url = getBaseUrl() + `getChassisNumberBySeries/${SeriesId}`;

    axios
      .get(url)
      .then(
        (res) => {
          console.log("data Chassis no:::", res);

          setChassisNoDataArry(res.data);
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

  //delete Chassis no ---

  const deleteChassisno = (row) => {
    let id = row._id;
    setisloading(false);
    let url = getBaseUrl() + `deleteChassisNumber/${id}`;
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

  //update chassisno name

  const UpdateChasisdata = (ID) => {
    let id = ID;
    setisloading(true);
    let url = getBaseUrl() + `updategetChassisNumber/${id}`;
    let temp = {
      number: EditChassisno,
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

  const filterData = ChassisNoDataArry.filter((event) => {
    return event.number.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Chassis No.</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() =>
                  props.history.push("/chassisno", {
                    data: props.location.state,
                    item: props.location.state.item,
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
                    <TableCell>Chassis No.</TableCell>{" "}
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
                      <TableCell>{row.number}</TableCell>

                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => UpdateChassisno(row)}
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteChassisno(row)}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                        <span
                          className="text-info ml-3 status_manage"
                          onClick={() =>
                            props.history.push("/car-model-list", {
                              data: row,
                              dataa: props.location.state,
                              item: props.location.state.item,
                            })
                          }
                        >
                          Add Model
                        </span>
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
              Add Chassis No
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label"></label>
                <div class=" col-md-12">
                  <label for="inputPassword4">Add Chassis No</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Chassis No"
                    value={EditChassisno}
                    onChange={(e) => {
                      setEditChassisno(e.target.value);
                    }}
                  />
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
                onClick={() => UpdateChasisdata(EditId)}
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
export default HOC(ChassisNumberList);
