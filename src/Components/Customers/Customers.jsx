import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../Common/Hoc";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Customers(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [adddata, setadddata] = useState([
    {
      id: 1,
      name: "Miss Justine Reichert V",
      email: "huel.tressie@example.org",
      Created: "2021-10-17",
      show: false,
    },
    {
      id: 2,
      name: "Joana Kassulke",
      email: "rlesch@example.com",
      Created: "2021-10-17",
      show: false,
    },
    {
      id: 3,
      name: "Miss Justine Reichert V",
      email: "huel.tressie@example.org",
      Created: "2021-10-17",
      show: false,
    },
  ]);

  ///customer active

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

  const filterData = adddata.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Total customer</h3>
              <button type="button" class="btn btn-info mr-4">
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
              <div className="d-flex mt-3">
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Customers</TableCell>

                    <TableCell>Created At</TableCell>
                    <TableCell>Status</TableCell>

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
                  ).map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>

                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.Created}</TableCell>

                      <TableCell>
                        {row.show === false ? (
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={() => {
                              adddata[index].show = true;
                              setadddata([...adddata]);
                              console.log("setdata value", adddata);
                            }}
                          >
                            Activated
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              adddata[index].show = false;
                              setadddata([...adddata]);
                            }}
                          >
                            Disable
                          </button>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="d-flex">
                          <button type="button" class="btn btn-info mr-4">
                            <i class="fa fa-edit"></i>
                          </button>
                          <button type="button" class="btn btn-info">
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
        </div>
      </div>
    </>
  );
}
export default HOC(Customers);
