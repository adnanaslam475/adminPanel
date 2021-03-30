import React, { useState, useEffect, useCallback } from "react";
import {
  makeStyles,
  MenuList,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { ThemeProvider } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { FuseAnimate, FusePageCarded } from "@fuse";
import { useHistory } from "react-router-dom";
import {
  loadCourses,
  loadDepartments,
  loadSections,
  load_meta_products,
} from "app/store/actions";

const useStyles = makeStyles((theme) => ({
  header: {
    height: 600,
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      theme.palette.primary.main +
      " 100%)",
    color: theme.palette.primary.contrastText,
  },
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800]),
  },
}));

function CreateCourseMaterial() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [err, setErr] = useState("");
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [inputValues, setInputValues] = useState({
    product_id: "",
    name: "",
  });

  useEffect(() => {
    dispatch(load_meta_products());
  }, []);

  const { meta_products } = useSelector(({ fuse }) => fuse.cat_pro);

  const handleChange = ({ target: { name, value } }) => {
    setErr(null);
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    if (!inputValues.product_id || !inputValues.name) {
      return setErr("all fields are required");
    }
    const updatedData = JSON.stringify({
      name: inputValues.name,
      product_id: inputValues.product_id,
    });
    axios
      .post(api + "5001/api/crs_mat", updatedData, config)
      .then(({ data }) => {
        data &&
          history.push(`/academics/course_material`, { data: data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <ThemeProvider theme={mainTheme}>
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Add Course Material
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <ThemeProvider theme={mainTheme}>
          <div className="p-8 sm:p-24 max-w-2xl">
            <form onSubmit={submit}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Product
                </InputLabel>
                <Select
                  id="product_id"
                  variant="outlined"
                  type="text"
                  required
                  value={inputValues.product_id}
                  onChange={handleChange}
                  name="product_id"
                  className="mt- mb-16"
                >
                  {meta_products?.map((v, i) => {
                    return (
                      <MenuItem key={v._id} value={v._id}>
                        {v.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                className="mt-8 mb-16"
                required
                label="Name"
                id="name"
                // style={{ marginLeft: "5px" }}
                name="name"
                type="text"
                variant="outlined"
                fullWidth
                value={inputValues.name}
                onChange={handleChange}
              />
              {err && <p style={{ color: "red" }}>{err}</p>}
              <Button
                color="secondary"
                // style={{ margin: "10px" }}
                variant="contained"
                aria-label="Follow"
                type="submit"
                className="mr-8 normal-case"
              >
                Submit
              </Button>
              {/* <Button
                            color="secondary"
                            size='small'
                            type='submit'
                            style={{ margin: "2px" }}
                            className="mr-8 normal-case"
                            variant='contained'>submit</Button> */}
            </form>
          </div>
        </ThemeProvider>
      }
    />
  );
}

export default CreateCourseMaterial;
