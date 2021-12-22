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

function Orders(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [addOrder, setaddOrder] = useState([
    {
      id: 111111111,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add1",
      categories: "categories",
      features: "features",
      addtype: "Professional",
      primium: "Free Ads",
      show: false,
    },
    {
      id: 22222222,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add2",
      categories: "categories",
      features: "features",
      addtype: "Private",
      primium: "Primium Ads",
      show: false,
    },
    {
      id: 22222222,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add2",
      categories: "categories",
      features: "features",
      addtype: "Private",
      primium: "Primium Ads",
      show: false,
    },
    {
      id: 22222222,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add2",
      categories: "categories",
      features: "features",
      addtype: "Private",
      primium: "Primium Ads",
      show: false,
    },
    {
      id: 22222222,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add2",
      categories: "categories",
      features: "features",
      addtype: "Private",
      primium: "Primium Ads",
      show: false,
    },
    {
      id: 22222222,
      image:
        "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg",
      title: "Add2",
      categories: "categories",
      features: "features",
      addtype: "Private",
      primium: "Primium Ads",
      show: false,
    },
  ]);

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

  const filterData = addOrder.filter((event) => {
    return event.title.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <div className="total_orders d-flex">
                <h3 className="mb-2 mr-3">Total Orders</h3>
                <button
                  type="button"
                  class="btn btn-info mr-4"
                  onClick={() => props.history.goBack()}
                >
                  <i class="fa fa-arrow-left"></i>Go Back
                </button>
              </div>
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
                    placeholder="Search by Title Name"
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
                    <TableCell>IMAGE</TableCell>
                    <TableCell>TITLE</TableCell>

                    <TableCell>CATEGORIES</TableCell>
                    <TableCell>FEATURES</TableCell>

                    <TableCell>AD TYPE</TableCell>
                    <TableCell>AD PREMIUM</TableCell>
                    <TableCell>ACTIVE</TableCell>
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
                      <TableCell className="">
                        <img
                          style={{ height: "30px", width: "50px" }}
                          src={row.image}
                        />
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.categories}</TableCell>
                      <TableCell>{row.features}</TableCell>
                      <TableCell>{row.addtype}</TableCell>
                      <TableCell>{row.primium}</TableCell>
                      <TableCell>
                        {row.show === false ? (
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={() => {
                              addOrder[index].show = true;
                              setaddOrder([...addOrder]);
                              console.log("setdata value", addOrder);
                            }}
                          >
                            Activated
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              addOrder[index].show = false;
                              setaddOrder([...addOrder]);
                            }}
                          >
                            Disable
                          </button>
                        )}
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
export default HOC(Orders);
