import React, { useState, useEffect } from "react";
import {
  FormLabel,
  TextField,
  Typography,
  Input,
  Button,
  Icon,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate } from "@fuse";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import S3 from "aws-s3";
import _ from "@lodash";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../../../../S3Configuration/s3";
import { loadmeta_categories } from "app/store/actions";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
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
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateMetaProducts = () => {
  const ReactS3Client = new S3(config);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [uploaderror, setuploadError] = useState(null)
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const [inputValues, setInputValues] = useState({
    categoryType: '',
    category_name: '',
    description: '',
    price: '',
    name: '',
    logo: '',
  })

  const [imageUrls, setImageUrls] = useState([])


  const handleChange = ({ target: { name, value } }) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(loadmeta_categories());
  }, []);

  const { meta_categories } = useSelector(({ fuse }) => fuse.cat_pro);

  const sumbit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const updatedData = JSON.stringify({
      category_name: inputValues.categoryType,
      description: inputValues.description,
      price: inputValues.price,
      name: inputValues.name,
      images: imageUrls,
    });
    console.log(updatedData);

    axios
      .post("http://192.168.18.71:5007/api/product/", updatedData, config)
      .then(({ data }) => {
        data &&
          history.push(`/e_commerce/meta_products`, { data: data.message });
        console.log("submit sucefully", data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const imagesHandler = (e) => {
    e.persist();
    var arr = [];
    let arr2 = [...imageUrls];
    Object.values(e.target.files).forEach((e) => {
      ReactS3Client.uploadFile(e, e.name)
        .then(({ location }) => {
          arr = [...arr, location];
        })
        .catch((err) => {
          console.log("error to upload", err);
          setuploadError("error in uploading");
        })
        .finally(() => {
          setImageUrls(arr2.concat(arr));
        });
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
                  New Product
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        </ThemeProvider>
      }
      content={
        <ThemeProvider theme={mainTheme}>
          <div className="p-8 sm:p-24 max-w-2xl">
            <form onSubmit={sumbit}>
              <div>
                <input
                  id="logo"
                  name="logo"
                  multiple
                  title="Upload image"
                  placeholder="images"
                  required={imageUrls.length === 0}
                  type="file"
                  // style={{ margin: "5px", backgroundColor: "red" }}
                  onChange={imagesHandler}
                />
                {imageUrls.map((v, i) => {
                  return (
                    <div
                      style={{ display: "inline-block" }}
                      className="flex justify-center sm:justify-start flex-wrap"
                      key={v}
                    >
                      {uploaderror ? (
                        <p>{uploaderror}</p>
                      ) : (
                        <div style={{ display: "flex", marginLeft: "5px" }}>
                          <div
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            <Icon
                              style={
                                {
                                  // marginLeft: "10%",
                                }
                              }
                              fontSize="small"
                              onClick={() => {
                                const filt = imageUrls.filter(
                                  (val, i) => val !== v
                                );
                                setImageUrls(filt);
                              }}
                            >
                              clear
                            </Icon>
                            <Avatar
                              src={v}
                              style={{
                                width: "100px",
                                height: "100px",
                                // marginLeft: "5%",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  variant="outlined"
                  type="text"
                  value={inputValues.categoryType}
                  onChange={handleChange}
                  name="categoryType"
                  className="mt- mb-16"
                >
                  {meta_categories?.map((v, i) => {
                    return (
                      <MenuItem key={i} value={v.category_name}>
                        {v.category_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                className="mt-8 mb-16"
                required
                label="Title"
                id="name"
                style={{ marginLeft: "5px" }}
                name="name"
                type="text"
                variant="outlined"
                fullWidth
                required
                value={inputValues.name}
                onChange={handleChange}
              />
              <TextField
                name="description"
                id="description"
                type="text"
                label="Description"
                style={{ marginLeft: "5px" }}
                required
                variant="outlined"
                fullWidth
                className="mt-8 mb-16"
                value={inputValues.description}
                onChange={handleChange}
              />
              <TextField
                name="price"
                required
                type="number"
                required
                label="Price"
                style={{ marginLeft: "5px" }}
                variant="outlined"
                fullWidth
                className="mt-8 mb-16"
                value={inputValues.price}
                onChange={handleChange}
              />
              <Button
                color="secondary"
                size="small"
                type="submit"
                style={{ margin: "2px" }}
                className="mr-8 normal-case"
                variant="contained"
              >
                submit
              </Button>
            </form>
          </div>
        </ThemeProvider>
      }
    />
  );
};
export default CreateMetaProducts;
