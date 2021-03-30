import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  TablePagination,
  Modal,
  Button,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Table,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#dc3546",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 30,
    padding: "0 20px",
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
    border: "10px",
    [theme.breakpoints.down("md")]: {
      height: 240,
      minHeight: 240,
    },
  },
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateMetaCategories = () => {
  const classes = useStyles();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  const history = useHistory();
  const [categoryType, setCategoryType] = useState("");
  const [sub_category, setsubcategory] = useState("");
  const [subedit, setsubedit] = useState(false);
  const [newsub, setnewsub] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryNameId, setCategoryNameId] = useState("");
  const [err, seterr] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [newSubCategory, setnewSubCategory] = useState({
    item: {
      category_name: "",
      sub_category: [],
    },
  });

  const EditSubcategories = (val, id, pid) => {
    setOpen(true);
    setsubedit(true);
    setnewsub(val);
    setsubcategory(val);
  };

  const handleNewChange = (e) => {
    seterr(null);
    const { name, value } = e.target;
    setnewSubCategory((prevState) => ({
      item: { ...prevState.item, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryNames([...categoryNames, newSubCategory.item]);
    setnewSubCategory({
      item: {
        category_name: "",
        sub_category: [],
      },
    });
    setEdit(false);
    seterr(null);
  };

  const submit = (e) => {
    e.preventDefault();
    if (categoryNames.length === 0) {
      seterr("please add atleast one category name");
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const createdData = JSON.stringify({
      categoryType: categoryType,
      category_names: categoryNames,
    });
    console.log(createdData);
    axios
      .post("http://192.168.18.71:5007/api/categories/", createdData, config)
      .then(({ data }) => {
        data &&
          history.push(`/e_commerce/meta_categories`, { data: data.message });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const editcategoryName = (val, index) => {
    const filt = categoryNames.filter((val, idx) => idx !== index);
    setCategoryNames(filt);
    setnewSubCategory({
      item: {
        category_name: val.category_name,
        sub_category: val.sub_category,
      },
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (subedit === true) {
      let updatedProducts = [...categoryNames];
      updatedProducts[categoryNameId] = {
        ...categoryNames[categoryNameId],
        sub_category: [
          ...categoryNames[categoryNameId].sub_category.filter(
            (v, i) => v !== sub_category
          ),
          newsub,
        ],
      };
      setCategoryNames(updatedProducts);
    } else {
      let updatedProducts = [...categoryNames];
      updatedProducts[categoryNameId] = {
        ...categoryNames[categoryNameId],
        sub_category: [
          ...categoryNames[categoryNameId].sub_category,
          sub_category,
        ],
      };
      setCategoryNames(updatedProducts);
    }
    setOpen(!open);
    setsubcategory(null);
    setnewsub(null);
  };

  const removesubcategory = (id) => {
    let updatedProducts = [...categoryNames];
    updatedProducts[categoryNameId] = {
      ...categoryNames[categoryNameId],
      sub_category: categoryNames[categoryNameId].sub_category.filter(
        (v, i) => i !== id
      ),
    };
    setCategoryNames(updatedProducts);
    setsubcategory("");
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
                  New Category
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <ThemeProvider theme={mainTheme}>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sub Category</DialogTitle>
            <DialogContent>
              <TextField
                name="sub_category"
                value={subedit ? newsub : sub_category}
                label="Add sub category"
                className="mt-8 mb-16"
                required
                id="sub_category"
                onChange={(e) =>
                  subedit
                    ? setnewsub(e.target.value)
                    : setsubcategory(e.target.value)
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClose={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                size="small"
                style={{ margin: "2px" }}
                className="mr-8 normal-case"
                variant="contained"
                color="secondary"
                disabled={sub_category?.trim().length === 0}
                onClick={handleProductSubmit}
              >
                {" "}
                Add{" "}
              </Button>
            </DialogActions>
          </Dialog>
          <form onSubmit={submit}>
            <div className="p-16 sm:p-24 max-w-2xl">
              <TextField
                className="mt-8 mb-16"
                required
                label="Add Category Type"
                id="categoryType"
                name="categoryType"
                style={{}}
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <div style={{ display: "flex" }}>
                <TextField
                  className="mt-8 mb-16"
                  label="Category name"
                  id="category_name"
                  name="category_name"
                  style={{}}
                  value={newSubCategory.item.category_name}
                  onChange={handleNewChange}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  color="secondary"
                  style={{
                    marginLeft: "5px",
                    marginTop: "18px",
                    height: "50%",
                  }}
                  className="mr-8 normal-case"
                  variant="contained"
                  disabled={
                    newSubCategory.item.category_name.trim().length === 0
                  }
                  onClick={handleSubmit}
                >
                  {edit === true ? "Update" : "Add"}
                </Button>
              </div>
              <br />
              {err && <p style={{ color: "red" }}>{err}</p>}

              <Table className={classes.table} aria-label="simple table">
                {categoryNames.length !== 0 && (
                  <TableHead>
                    <TableRow>
                      <TableCell>Category Name</TableCell>
                      <TableCell>Add Category</TableCell>
                      <TableCell>Edit Category</TableCell>
                      <TableCell>Remove Category</TableCell>
                    </TableRow>
                  </TableHead>
                )}

                {categoryNames.map((v, i) => (
                  <TableBody key={i}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {v.category_name}
                      </TableCell>

                      {/* Add */}
                      <TableCell>
                        {/* Add */}
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setCategoryNameId(i);
                          }}
                          color="secondary"
                          size="small"
                          style={{ margin: "2px" }}
                          className="mr-8 normal-case"
                          variant="contained"
                        >
                          Add subcategory
                        </Button>
                      </TableCell>

                      {/* Edit */}
                      <TableCell>
                        {/* Edit */}
                        <Button
                          color="secondary"
                          size="small"
                          style={{ margin: "2px" }}
                          disabled={edit}
                          className="mr-8 normal-case"
                          variant="contained"
                          onClick={() => {
                            editcategoryName(v, i);
                            setEdit(true);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>

                      {/* Remove */}
                      <TableCell>
                        {/* Remove */}
                        <Button
                          size="small"
                          classes={{
                            root: classes.root,
                          }}
                          style={{ margin: "2px" }}
                          className="mr-8 normal-case"
                          color="primary"
                          onClick={() =>
                            setCategoryNames(
                              categoryNames.filter((val, idx) => idx !== i)
                            )
                          }
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                    {v.sub_category.length !== 0 && (
                      <TableHead>
                        <TableRow>
                          <TableCell>SubCategory Name</TableCell>
                          <TableCell>Edit SubCategory</TableCell>
                          <TableCell>Remove SubCategory</TableCell>
                        </TableRow>
                      </TableHead>
                    )}
                    {v.sub_category?.map((val, idx) => (
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {val}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              style={{ margin: "5px" }}
                              className="mr-8 normal-case"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setCategoryNameId(i);
                                EditSubcategories(val, idx, i);
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              classes={{
                                root: classes.root,
                              }}
                              style={{ margin: "5px" }}
                              className="mr-8 normal-case"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setCategoryNameId(i);
                                removesubcategory(idx);
                              }}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </TableBody>
                ))}
              </Table>

              <Button
                color="secondary"
                type="submit"
                style={{ marginTop: "15px" }}
                className="mr-8 normal-case"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </form>
        </ThemeProvider>
      }
    />
  );
};

export default CreateMetaCategories;
