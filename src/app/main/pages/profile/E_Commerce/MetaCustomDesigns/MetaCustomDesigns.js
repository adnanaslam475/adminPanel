import React, { useState, useEffect } from "react";
import {
    Icon,
    Table,
    TableBody,
    TableCell,
    makeStyles,
    MenuList,
    MenuItem,
    TablePagination,
    ListItemIcon,
    ListItemText,
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
    Avatar,
    Button,
} from "@material-ui/core";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { useHistory, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import _ from "@lodash";
import { ThemeProvider } from "@material-ui/styles";

const MetaCustomDesigns = () => {
    const history = useHistory();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const [searchText, setSearch] = useState("");
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
            }}
            innerScroll
            header={
                <ThemeProvider theme={mainTheme}>
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <ToastContainer autoClose={2000} />
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">
                                    Custom design
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

                                    aria-label="Follow"
                                >
                                    Create new section
        </Button>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            }
            content={
                <div className="w-full flex flex-col">

                </div>
            }
        />
    );
}

export default MetaCustomDesigns
