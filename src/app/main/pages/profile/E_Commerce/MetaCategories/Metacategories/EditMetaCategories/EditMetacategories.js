import React, { useState, useEffect } from 'react'
import {
    Typography, TextField, makeStyles, FormControl,
    InputLabel, Button, Select, MenuItem, Dialog, DialogActions,
    DialogContent, TableRow, TableCell, TableBody, TableHead, Table, DialogTitle
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { ThemeProvider } from "@material-ui/styles";

import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadmeta_categories, loadmeta_categoriesforcategories } from 'app/store/actions';




const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const EditMetaCategories = ({ match }) => {
    const dispatch = useDispatch()
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);


    const [subCategories, setSubCategories] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [subedit, setsubedit] = useState(false);
    const [newsub, setnewsub] = useState("");

    const [categoryNames, setCategoryNames] = useState([]);
    const [categoryNameId, setCategoryNameId] = useState('');
    const [sub_category, setsubcategory] = useState('');
    const [err, seterr] = useState('');
    const [inputValues, setInputValues] = useState({
        categoryType: "",
        category_names: []
    });
    const [newSubCategory, setnewSubCategory] = useState({
        item: {
            category_name: '',
            sub_category: []
        },
    });

    const handleChange = ({ target: { name, value } }) => {
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };


    useEffect(() => {
        dispatch(loadmeta_categoriesforcategories())
    }, [])
    const { meta_categories } = useSelector(({ fuse }) => fuse.cat_pro);

    useEffect(() => {
        // dispatch(loadmeta_categories())
        axios.get('http://192.168.18.71:5007/api/categories/' + id)
            .then(({ data }) => {
                console.log('data.cat.categoryType,--->', data.cat);
                setInputValues({
                    // category_name: data.cat.category_names,
                    categoryType: data.cat.categoryType,
                });
                setCategoryNames(data.cat.category_names)
                setSubCategories(data.cat.sub_categories);
                setCategories(data)
            }).catch(err => {
                console.log(err);
            })
    }, [meta_categories])

    console.log('meta_categories', inputValues.categoryType)

    const handleNewChange = e => {
        const { name, value } = e.target;
        setnewSubCategory(prevState => ({
            item: { ...prevState.item, [name]: value },
        }))
    };



    const handleSubmit = e => {
        e.preventDefault();
        setCategoryNames([...categoryNames, newSubCategory.item]);
        setnewSubCategory({
            item: {
                category_name: '',
                sub_category: []
            },
        })
        setEdit(false);
        seterr(null)
    }

    const sumbit = e => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            },
        };
        const updatedData = JSON.stringify({
            categoryType: inputValues.categoryType,
            category_names: inputValues.category_names,
        });
        axios.post("http://192.168.18.71:5007/api/update_categories/" + id, updatedData, config)
            .then(({ data }) => {
                data && history.push(`/e_commerce/meta_categories`, { data: data.message });
                console.log("submit sucefully", data);
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

    const removesubcategory = id => {
        let updatedProducts = [...categoryNames];
        updatedProducts[categoryNameId] = {
            ...categoryNames[categoryNameId],
            sub_category: categoryNames[categoryNameId].sub_category.filter((v, i) => i !== id)
        }
        setCategoryNames(updatedProducts)
        setsubcategory('')
    }


    const EditSubcategories = (val, id, pid) => {
        setOpen(true);
        setsubedit(true);
        setnewsub(val);
        setsubcategory(val);
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
                                    Edit Category
                  </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                </ThemeProvider>
            }
            content={<ThemeProvider theme={mainTheme}>
                <Dialog open={open}
                    onClose={() => { setOpen(false); setsubedit(false); setsubcategory('') }}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">sub category</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="sub_category"
                            value={subedit ? newsub : sub_category}
                            label="Add sub category"
                            className="mt-8 mb-16"
                            required
                            id="sub_category"
                            onChange={e => subedit ? setnewsub(e.target.value) : setsubcategory(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClose={() => setOpen(false)}
                            color="primary">
                            Cancel
                        </Button>
                        <Button size='small'
                            style={{ margin: "2px" }}
                            className="mr-8 normal-case"
                            variant='contained'
                            color="secondary"
                            disabled={sub_category?.trim().length === 0}
                            onClick={handleProductSubmit} >  Add </Button>
                    </DialogActions>
                </Dialog>
                <div className="p-16 sm:p-24 max-w-2xl">
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Select category</InputLabel>
                        <Select
                            name="categoryType"
                            type="text"
                            onChange={handleChange}
                            required
                            fullWidth
                            className="mt-8 mb-16"
                            id="categoryType"
                            variant="outlined"
                            value={inputValues.categoryType} >
                            {meta_categories?.map((v, i) => {
                                return (<MenuItem
                                    key={i}
                                    value={v.categoryType} >
                                    {v.categoryType}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            className="mt-8 mb-16"
                            label="Category name"
                            id="category_name"
                            name="category_name"
                            style={{ marginLeft: '5px' }}
                            value={newSubCategory.item.category_name}
                            onChange={handleNewChange}
                            variant="outlined"
                            fullWidth
                        />
                        <Button color="secondary"
                            size='small'
                            style={{ margin: "2px" }}
                            className="mr-8 normal-case"
                            variant='contained'
                            disabled={newSubCategory.item.category_name.trim().length === 0}
                            onClick={handleSubmit}
                        >
                            {edit === true ? 'Update' : 'Adds'}
                        </Button>
                    </div>
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
                                    <TableCell>
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
                            style={{ margin: "2px", alignSelf: 'right' }}
                            className="mr-8 normal-case"
                            variant='contained'
                            onClick={sumbit}
                        >
                            Update
                </Button>
                </div>
            </ThemeProvider >}
        />
    )
}

export default EditMetaCategories;