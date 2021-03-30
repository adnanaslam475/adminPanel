import React, { useState, useEffect } from "react";
import {
  makeStyles,
  MenuList,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
// import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { loadCourses } from "app/store/actions";

import {
  FusePageSimple,
  FusePageCarded,
  FuseAnimate,
  FuseScrollbars,
} from "@fuse";
import { useHistory, useParams } from "react-router-dom";

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

function EditSections() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [err, setErr] = useState("");
  const { id } = useParams();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [inputValues, setInputValues] = useState({
    course_id: "",
    name: "",
  });

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const { courses_list } = useSelector(({ fuse }) => fuse.academic);

  useEffect(() => {
    axios
      .get(api + "5001/api/sec/" + id)
      .then(({ data }) => {
        setInputValues({
          name: data.section[0].name,
          course_id: data.section[0]?.course_id,
        });
      })
      .catch((e) => {
        console.log("catch .error");
      });
  }, [courses_list]);

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
    if (!inputValues.course_id) {
      return setErr("all fields are required");
    }
    const updatedData = JSON.stringify({
      name: inputValues.name,
      course_id: inputValues.course_id,
    });
    axios
      .post(api + "5001/api/sec_update/" + id, updatedData, config)
      .then(({ data }) => {
        console.log(`data`, data);
        data && history.push(`/academics/sections`, { data: data.message });
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
                  Edit Section
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
                style={{ marginTop: 10 }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Course
                </InputLabel>
                <Select
                  id="course_id"
                  variant="outlined"
                  required
                  type="text"
                  value={inputValues.course_id}
                  onChange={handleChange}
                  name="course_id"
                  className="mt-8 mb-16"
                  style={{ marginLeft: "5px" }}
                >
                  {courses_list?.map((v, i) => {
                    return (
                      <MenuItem key={v._id} value={v._id}>
                        {v.course_name}
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
                className="mr-8 normal-case"
                // style={{ margin: "10px" }}
                type="submit"
                onClick={submit}
                disabled={inputValues.name?.trim().length === 0}
                variant="contained"
                aria-label="Follow"
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

export default EditSections;
