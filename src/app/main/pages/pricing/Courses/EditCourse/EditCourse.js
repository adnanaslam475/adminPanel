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
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { api } from "../../../../../../utils/Constant";

import { loadDepartments, loadTerms } from "app/store/actions";

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

function EditCourses() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [err, setErr] = useState("");
  const { id } = useParams();
  const [departments, setDepartments] = useState(null);
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [inputValues, setInputValues] = useState({
    depart_id: "",
    course_name: "",
    course_no: "",
  });

  useEffect(() => {
    dispatch(loadDepartments());
    dispatch(loadTerms());
  }, []);

  var { departments_list, terms_list } = useSelector(
    ({ fuse }) => fuse.academic
  );

  useEffect(() => {
    axios
      .get(api + "5001/api/crs/" + id)
      .then(({ data }) => {
        setInputValues({
          course_name: data.course[0].course_name,
          depart_id: data.course[0].depart_id,
          course_no: data.course[0].course_no,
        });
      })
      .catch((e) => {
        console.log("cath console.error");
      });
  }, [departments_list, terms_list]);

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
    if (!inputValues.depart_id) {
      return setErr("all fields are required");
    }
    const updatedData = JSON.stringify({
      course_name: inputValues.course_name,
      course_no: inputValues.course_no,
      depart_id: inputValues.depart_id,
    });
    axios
      .post(api + "5001/api/crs_update/" + id, updatedData, config)
      .then(({ data }) => {
        console.log("add course----", data);
        data && history.push(`/academics/courses`, { data: data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(inputValues.depart_id);
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
                  Edit Course
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
                  Select Department
                </InputLabel>
                <Select
                  id="depart_id"
                  variant="outlined"
                  required
                  type="text"
                  value={inputValues.depart_id}
                  onChange={handleChange}
                  name="depart_id"
                  className="mt- mb-16"
                >
                  {departments_list?.map((v, i) => {
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
                id="course_name"
                // style={{ marginLeft: "5px" }}
                name="course_name"
                type="text"
                variant="outlined"
                fullWidth
                value={inputValues.course_name}
                onChange={handleChange}
              />
              <TextField
                className="mt-8 mb-16"
                required
                label="Course No."
                id="course_no"
                // style={{ marginLeft: "5px" }}
                name="course_no"
                type="number"
                variant="outlined"
                fullWidth
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
                value={inputValues.course_no}
                onChange={handleChange}
              />
              {err && <p style={{ color: "red" }}>{err}</p>}
              <Button
                color="secondary"
                // style={{ margin: "10px" }}
                onClick={submit}
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

export default EditCourses;
