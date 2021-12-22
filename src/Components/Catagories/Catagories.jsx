import React, { useEffect } from "react";
import { Button, Grid, Card } from "@material-ui/core";
import HOC from "../../Common/Hoc";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Catagories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const rows = [
    createData(
      "Kaitlyn L. Harper ",
      "KaitlynLHarper@jourrapide.com",
      4436881503
    ),
  ];

  const classes = useStyles();
  return (
    <div>
      <div className="content_padding">
        <div className="container">
          <Grid className="Component_main_grid p-2 mt-5"></Grid>

          <div>
            <Card className=" mb-2 Card_shadow p-3">
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <div className="card_content_instition">
                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading pl-1">
                          Add Catagories
                        </div>
                        <div className=" mt-1">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Catagories"
                            autoComplete="off"
                          />
                        </div>
                      </Grid>

                      <Grid item md={12}>
                        <div className="text_filed_heading mt-3 mb-2">
                          Add Product Image
                        </div>
                        <div className="mr-2 mt-1">
                          <input type="file" class="form-control" />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="mt-3 pb-3 ">
                    <Button variant="contained" className="button_formatting">
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="table_data">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Categries</TableCell>
                    <TableCell>Sub Categries</TableCell>
                    <TableCell>Edit </TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Add Sub Categories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.calories}</TableCell>
                      <TableCell>
                        <span>
                          <i class="fa fa-edit"></i>
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>
                          <i class="fa fa-trash"></i>
                        </span>
                      </TableCell>
                      <TableCell className="">Add Sub Categories</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Catagories);
