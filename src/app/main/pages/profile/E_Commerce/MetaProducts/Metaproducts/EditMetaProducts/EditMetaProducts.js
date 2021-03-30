import React, { useState, useEffect } from 'react'
import {
    Typography, Avatar, Icon, TextField, makeStyles, Select,
    FormControl, MenuItem, Modal, Button, InputLabel
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { ThemeProvider } from "@material-ui/styles";
import { loadmeta_categories, } from "app/store/actions";

import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import { config } from '../../../../../S3Configuration/s3'
import S3 from "aws-s3";


// product image, category name , tiele, descriptoopin, price
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
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const EditMetaProducts = ({ match }) => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const history = useHistory();
    const ReactS3Client = new S3(config);
    const [imageUrls, setImageUrls] = useState(null)
    const classes = useStyles();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [uploadError, setuploadError] = useState('');


    const [product, setProduct] = useState(null);
    const [inputValues, setInputValues] = useState({
        categoryType: '',
        description: '',
        price: '',
        name: ''
    })


    useEffect(() => {
        dispatch(loadmeta_categories())
        axios.get('http://192.168.18.71:5007/api/product/' + id)
            .then(({ data }) => {
                setInputValues({
                    categoryType: data.prods[0].categoryType,
                    category: data.prods[0].category_name,
                    description: data.prods[0].description,
                    price: data.prods[0].price,
                    name: data.prods[0].name,
                })
                setImageUrls(data.prods[0].images)
                setProduct(data);
            }).catch(err => {
                console.log(err)
            })
    }, [])
    const { meta_categories } = useSelector(({ fuse }) => fuse.cat_pro);







    const handleChange = ({ target: { name, value } }) => {
        console.log(name, value);
        setInputValues({
            ...inputValues,
            [name]: value,
        })
    }

    const submit = e => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }
        const updatedData = JSON.stringify({
            ...inputValues,
            images: imageUrls
        })
        console.log(updatedData)
        // 7
        axios.post('http://192.168.18.71:5007/api/update_product/' + id, updatedData, config)
            .then(({ data }) => {
                data && history.push(`/e_commerce/meta_products`, { data: data.message });
                console.log('submit sucefully', data)
            }).catch(err => {
                console.log('error', err)
            })
    }


    const imagesHandler = e => {
        e.persist();
        var arr = [];
        let arr2 = [...imageUrls]
        Object.values(e.target.files).forEach(e => {
            ReactS3Client.uploadFile(e, e.name)
                .then(({ location }) => {
                    arr = [...arr, location]
                })
                .catch(err => {
                    setuploadError('error in uploading')
                }).finally(() => {
                    setImageUrls(arr2.concat(arr))
                }
                )
        })
    }

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
                                    Edit Product
                  </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                </ThemeProvider>
            }
            content={<ThemeProvider theme={mainTheme}>
                <form onSubmit={submit} >
                    <div className="p-16 sm:p-24 max-w-2xl">

                        <input
                            id="logo"
                            name="logo"
                            multiple
                            title='upload image'
                            placeholder='imagess'
                            required={imageUrls?.length === 0}
                            type="file"
                            style={{ margin: '5px' }}
                            onChange={imagesHandler}
                        />
                        <p> {uploadError}</p>
                        {imageUrls?.map((v, i) => (
                            <div className="flex justify-center sm:justify-start flex-wrap" key={i} >
                                <Avatar
                                    src={v}
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <Icon fontSize="small" onClick={() => {
                                    const filt = imageUrls.filter(val => val !== v);
                                    setImageUrls(filt)
                                }}>
                                    clear
                         </Icon>
                            </div>
                        ))}
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Select category</InputLabel>
                            <Select
                                id='categoryType'
                                variant="outlined"
                                type="text"
                                value={inputValues.categoryType}
                                onChange={handleChange}
                                name='categoryType'
                                className="mt- mb-16"
                                label="Age" >
                                {meta_categories?.map((v, i) => {
                                    return (<MenuItem
                                        key={i}
                                        value={v.category_name} >
                                        {v.category_name}
                                    </MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Category name"
                            id="category"
                            name="category"
                            style={{ marginLeft: '5px' }}
                            value={inputValues.category}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField className="mt-8 mb-16"
                            required
                            label="Title"
                            id="name"
                            style={{ marginLeft: '5px' }}
                            name='name'
                            type='text'
                            variant="outlined"
                            fullWidth
                            value={inputValues.name}
                            onChange={handleChange} />
                        <div style={{ display: "flex" }}
                            className="w-100">
                            <TextField
                                name='description'
                                id='description'
                                type='text'
                                label="Description"
                                style={{ marginLeft: '5px' }}
                                required
                                variant="outlined"
                                fullWidth
                                className="mt-8 mb-16"
                                value={inputValues.description}
                                onChange={handleChange} />
                        </div>

                        <Button
                            color="secondary"
                            style={{ margin: "2px", alignSelf: 'right' }}
                            className="mr-8 normal-case"
                            variant='contained'
                            type='submit'
                        >
                            Update
                </Button>
                    </div>
                </form>
            </ThemeProvider >}
        />
    )
}

export default EditMetaProducts;