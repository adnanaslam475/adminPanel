import React, { useState, useEffect } from "react";
import {
    Icon,
    Table,
    TableBody,
    TableCell,
    makeStyles,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    TablePagination,
    Avatar,
    Tooltip,
    Paper,
    TableSortLabel,
    Input,
    IconButton,
    TableHead,
    TableRow,
    Menu,
    Checkbox,
    Typography,
    Button,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';

import { FuseAnimate, FuseScrollbars, FusePageCarded } from "@fuse";
import { useSelector } from "react-redux";

import axios from "axios";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import moment from "moment";
import _ from "@lodash";
import { useHistory } from "react-router-dom";


const rows = [
    {
        id: "category_name",
        align: "left",
        disablePadding: false,
        label: "Name",
        sort: true,
    },
    {
        id: "is_active",
        align: "left",
        disablePadding: false,
        label: "Status",
        sort: true,
    },
    {
        id: "modified_on",
        align: "right",
        disablePadding: false,
        label: "Last Updated",
        sort: true,
    },
];

const useStyles = makeStyles((theme) => ({
    layoutHeader: {
        height: 320,
        minHeight: 320,
        [theme.breakpoints.down("md")]: {
            height: 240,
            minHeight: 240,
        },
    },
}));

function CategoriesPage(props) {
    const [selected, setSelected] = useState([]);
    const [searchText, setSearch] = useState("");
    const history = useHistory();
    const [page, setPage] = useState(0);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const classes = useStyles();
    const [Categories, setCategories] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: "asc",
        id: null
    });
    const [data, setData] = useState(Categories);

    const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);


    function handleChangePage(event, page) {
        setPage(page);
    }

    useEffect(() => {
        history.location.state?.data && toast(history.location.state?.data);
        axios.get(`http://192.168.18.71:5007/api/categories?page=1&limit=${rowsPerPage}`)
            .then(({ data }) => {
                console.log(data);
                setCategories(data.data || data.result?.results)
            })
            .catch((err) => { console.log("error to fetch", err); });
    }, [rowsPerPage]);


    const handleRequestSort = property => {
        const id = property;
        let direction = "desc";
        if (order.id === property && order.direction === "desc") {
            direction = "asc";
        }
        setOrder({
            direction,
            id,
        });
    };



    function openSelectedProductsMenu(event) {
        setSelectedProductsMenu(event.currentTarget);
    }

    function handleCheck(eve, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    }



    useEffect(() => {
        setData(
            searchText.length === 0
                ? Categories
                : _.filter(Categories, (item) => {
                    return item.category_name?.toLowerCase().includes(searchText.toLowerCase())
                }
                )
        );
    }, [Categories, searchText]);


    const handleSelectAllClick = e => {
        setSelected(Categories.map(n => n._id));
    }


    const deleteHandler = id => {
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        selected.forEach(i => {
            axios.post(`http://192.168.18.71:5007/api/categories/` + id, config)
                .then(() => {
                    axios.get('http://192.168.18.71:5007/api/categories')
                        .then(() => {
                            const categories = Categories.filter((v, id) => {
                                return id !== i;
                            });
                            setCategories(categories);
                        })
                        .catch((err) => {
                            console.log("err to delete");
                        });
                })
        })
    };

    function closeSelectedProductsMenu() {
        setSelectedProductsMenu(null);
    }


    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
            }}
            innerScroll
            header={
                <ThemeProvider theme={mainTheme}><ToastContainer autoClose={2000} />
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Avatar
                                    className="w-96 h-96"
                                    src="assets/images/download.jpg"
                                />
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">
                                    Categories
                            </Typography>
                            </FuseAnimate>
                            <div className="flex flex-1 items-center justify-center pr-0 pl-12 sm:px-12">
                                <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                    <Paper
                                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
                                        elevation={1}
                                    >
                                        <Icon className="mr-8" color="action">
                                            search
                                </Icon>
                                        <Input
                                            placeholder="Search"
                                            className="flex flex-1"
                                            disableUnderline
                                            fullWidth
                                            inputProps={{
                                                "aria-label": "Search",
                                            }}
                                            value={searchText}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </Paper>
                                </FuseAnimate>
                            </div>
                            <div className="flex items-center justify-end">
                                {" "}
                                <Button
                                    className="mr-8 normal-case"
                                    variant="contained"
                                    onClick={() => {
                                        props.history.push("/e_commerce/meta_categories_create");
                                    }}
                                    aria-label="Follow"
                                >
                                    Create new Category
                          </Button>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            }
            content={
                <div className="w-full flex flex-col">
                    <FuseScrollbars className="flex-grow overflow-x-auto">
                        <Table
                            className="min-w-xl"
                            style={{ width: "80%", }}
                            aria-labelledby="tableTitle"
                        >
                            <TableHead>
                                <TableRow className="h-64">
                                    <TableCell
                                        padding="checkbox"
                                        className="relative pl-4 sm:pl-12"
                                    >
                                        <Checkbox
                                            indeterminate={
                                                selected?.length > 0 &&
                                                selected?.length < Categories.length
                                            }
                                            checked={selected?.length === Categories?.length}
                                            onChange={handleSelectAllClick}
                                        />
                                        {selected.length > 0 && (
                                            <div
                                                className={clsx(
                                                    "flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10",
                                                    classes.actionsButtonWrapper
                                                )}
                                            >
                                                <IconButton
                                                    aria-owns={
                                                        selectedProductsMenu
                                                            ? "selectedProductsMenu"
                                                            : null
                                                    }
                                                    aria-haspopup="true"
                                                    onClick={openSelectedProductsMenu}
                                                >
                                                    <Icon>more_horiz</Icon>
                                                </IconButton>
                                                <Menu
                                                    id="selectedProductsMenu"
                                                    anchorEl={selectedProductsMenu}
                                                    open={Boolean(selectedProductsMenu)}
                                                    onClose={closeSelectedProductsMenu}
                                                >
                                                    <MenuList>
                                                        <MenuItem
                                                            onClick={() => {
                                                                deleteHandler();
                                                                closeSelectedProductsMenu();
                                                            }}
                                                        >
                                                            <ListItemIcon className="min-w-40">
                                                                <Icon>delete</Icon>
                                                            </ListItemIcon>
                                                            <ListItemText primary="Remove" />
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </div>
                                        )}
                                    </TableCell>

                                    {rows.map((row) => {
                                        return (
                                            <TableCell

                                                key={row.id}
                                                align={row.align}
                                                padding={row.disablePadding ? "none" : "default"}
                                                sortDirection={
                                                    order.id === row.id ? order.direction : false
                                                }
                                            >
                                                {row.sort && (
                                                    <Tooltip
                                                        title="Sort"
                                                        placement={
                                                            row.align === "right"
                                                                ? "bottom-end"
                                                                : "bottom-start"
                                                        }
                                                        enterDelay={300}
                                                    >
                                                        <TableSortLabel
                                                            active={order.id === row.id}
                                                            direction={order.direction}
                                                            onClick={() => {
                                                                handleRequestSort(row.id);
                                                            }}
                                                        >
                                                            {row.label}
                                                        </TableSortLabel>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        );
                                    }, this)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_.orderBy(
                                    data,
                                    [
                                        (o) => {
                                            switch (order.id) {
                                                default: {
                                                    return o[order.id];
                                                }
                                            }
                                        },
                                    ],
                                    [order.direction]
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((n, i) => {
                                        const isSelected = selected.indexOf(n._id) !== -1;
                                        return (
                                            <TableRow
                                                onClick={() => history.push(`/e_commerce/meta_categories/edit/${n._id}`)}
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                // onChange={() => handleCheck(n._id)}
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={i}
                                                selected={isSelected}
                                            >
                                                <TableCell
                                                    className="w-48 px-4 sm:px-12"
                                                    padding="checkbox"
                                                >
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={(event) => event.stopPropagation()}
                                                        onChange={(event) => {
                                                            handleCheck(event, n._id);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {n.categoryType}
                                                </TableCell>

                                                <TableCell
                                                    className="truncate"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {n.is_active === 1 ?
                                                        "active" : "In active"}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="right">
                                                    {moment(n.modified_on).format("DD-MM-YYYY")}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                    <TablePagination
                        component="div"
                        rowsPerPage={rowsPerPage}
                        page={page}
                        count={data?.length}
                        backIconButtonProps={{
                            "aria-label": "Previous Page",
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page",
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
                    />
                </div>
            }
        />
    );
}

export default CategoriesPage;
