import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  Button,
  FormControl,
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate, FuseScrollbars } from "@fuse";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

function EditDepartments() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const classes = useStyles();
  const [inputValues, setInputValues] = useState({
    term_id: "",
    name: "",
  });

  useEffect(() => {
    dispatch(loadTerms());
  }, []);

  var { terms_list } = useSelector(({ fuse }) => fuse.academic);
  useEffect(() => {
    axios
      .get(api + "5001/api/dpt/" + id)
      .then(({ data }) => {
        console.log(data);
        setInputValues({
          name: data.depart[0].name,
          term_id: data.depart[0].term_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [terms_list]);

  const handleChange = ({ target: { name, value } }) => {
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
    console.log("gya data", updatedData);
    axios
      .post(api + "5001/api/dpt_update/" + id, updatedData, config)
      .then(({ data }) => {
        data && history.push(`/academics/departments`, { data: data.message });
        console.log("upadte sucefully", data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        // header: classes.layoutHeader,
        // toolbar: "px-16 sm:px-24",
      }}
      header={
        <ThemeProvider theme={mainTheme}>
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <ToastContainer autoClose={2000} />
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Edit Department
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
              <Button
                className="mr-8 normal-case"
                color="secondary"
                aria-label="Follow"
                type="submit"
                style={{ margin: "2px" }}
                className="mr-8 normal-case"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </div>
        </ThemeProvider>
      }
    />
  );
}

export default EditDepartments;
