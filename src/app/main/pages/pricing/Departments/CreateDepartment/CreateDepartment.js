import React, { useState, useEffect } from "react";
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  Avatar,
  makeStyles,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TablePagination,
  TextField,
  Tooltip,
  Paper,
  TableSortLabel,
  Input,
  IconButton,
  TableHead,
  TableRow,
  Menu,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate, FuseScrollbars } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { ThemeProvider } from "@material-ui/styles";
// import clsx from "clsx";
// import moment from "moment";
import _ from "@lodash";
import { useHistory, useParams } from "react-router-dom";
import { loadTerms } from "app/store/actions";

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

function CreateDepartments() {
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [inputValues, setInputValues] = useState({
    term_id: "",
    name: "",
  });
  useEffect(() => {
    dispatch(loadTerms());
  }, []);

  const { terms_list } = useSelector(({ fuse }) => fuse.academic);
  const handleChange = ({ target: { name, value } }) => {
    setErr(null);
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const updatedData = JSON.stringify({
      name: inputValues.name,
      term_id: inputValues.term_id,
    });
    if (!inputValues.term_id) {
      return setErr("all fields are required");
    }
    axios
      .post(api + "5001/api/dpt", updatedData, config)
      .then(({ data }) => {
        data && history.push(`/academics/departments`, { data: data.message });
        console.log("add dept-----", data);
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
                  New Department
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <ThemeProvider theme={mainTheme}>
          <div className="p-8 sm:p-24 max-w-2xl">
            <form onSubmit={Submit}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Term
                </InputLabel>
                <Select
                  id="term_id"
                  variant="outlined"
                  type="text"
                  value={inputValues.term_id}
                  onChange={handleChange}
                  name="term_id"
                  required
                  className="mt-8 mb-16"
                  label="Age"
                >
                  {terms_list?.map((v, i) => {
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
              {err && (
                <p style={{ color: "red", marginBottom: "5px" }}>{err}</p>
              )}
              <Button
                color="secondary"
                style={{ margin: "10px" }}
                variant="contained"
                aria-label="Follow"
                type="submit"
                style={{ margin: "2px" }}
                className="mr-8 normal-case"
              >
                Submit
              </Button>
              {/* <Button
              color="secondary"
              size='small'
              // disabled={inputValues.term_id.trim()}
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

export default CreateDepartments;
