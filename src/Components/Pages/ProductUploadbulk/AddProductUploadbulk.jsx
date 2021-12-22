import React from "react";
import { Grid, Card, Button } from "@material-ui/core";
import HOC from "../../../Common/Hoc";

const AddProductUploadbulk = () => {
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
                    <h5 className="text_filed_heading">Bulk Product Upload</h5>

                    <Grid className="Component_main_grid">
                      <Grid item md={12}>
                        <div className="text_filed_heading">Select File</div>
                        <div className=" mt-1 mr-2">
                          <input
                            type="file"
                            multiple
                            className="form-control "
                            placeholder="Enter"
                            autoComplete="off"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="mt-2 pb-3 ">
                    <Button variant="contained" className="button_formatting">
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(AddProductUploadbulk);
