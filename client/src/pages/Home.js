import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../assets/styles/index.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  ADD_TRANSACTION_API,
  GET_TRANSACTION_API,
  EDIT_TRANSACTION_API,
  DELETE_TRANSACTION_API,
} from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import moment from "moment";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Select,
} from "@mui/material";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const Home = () => {
  const [data, setData] = useState({
    amount: "",
    type: "",
    category: "",
    reference: "",
    description: "",
    date: "",
    userid: "",
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => {
        return <span>{moment(text).format("YYYY-MM-DD")}</span>;
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Type",
      dataIndex: "type",
    },

    {
      title: "Category",
      dataIndex: "category",
    },

    {
      title: "Reference",
      dataIndex: "reference",
    },

    {
      title: "Actions",
    },
  ];

  const [allTransaction, setAllTransaction] = useState([]);

  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [page, setPage] = useState(0); //  State for current page
  const [rowsPerPage, setRowsPerPage] = useState(5); //  State for rows per page
  const [totalRows, setTotalRows] = useState(0); //  State for total rows
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [editable, setEditable] = useState(null);

  const modalOpen = () => {
    setAdd(true);
  };

  const modalClose = () => {
    setData({
      amount: "",
      type: "",
      category: "",
      reference: "",
      description: "",
      date: "",
      userid: "",
    });
    setAdd(false);
    setEditable(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);

      setLoading(true);
      if (editable) {
        const transdata = await axios.post(EDIT_TRANSACTION_API, {
          payload: {
            ...data,
            userid: user.email,
          },
          transactionId: editable._id,
        });
        console.log("Trans data", transdata);
        getAllTransaction();
        setLoading(false);
        setShowSuccessAlert(true);
      } else {
        const transdata = await axios.post(ADD_TRANSACTION_API, {
          ...data,
          userid: user.email,
        });
        console.log("Trans data", transdata);
        getAllTransaction();
        setLoading(false);
        setShowSuccessAlert(true);
      }
      setAdd(false);
      setEditable(null);
    } catch (e) {
      setLoading(false);
      setShowFailureAlert(true);
      console.log("Error occured", e);
    }
  };

  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(GET_TRANSACTION_API, {
        userid: user.email,
        frequency,
        selectedDate,
        type,
      });
      setLoading(false);
      setAllTransaction(res.data.transactions);
      setTotalRows(res.data.transactions.length); // Update totalRows with the total number of transactions
      console.log("Get transactions data", res.data.transactions);
    } catch (e) {
      console.error("Unable to get transactions data", e);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
    setShowFailureAlert(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (row) => {
    try {
      setLoading(true);
      await axios.post(DELETE_TRANSACTION_API, {
        transactionId: row._id,
      });
      getAllTransaction();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const MomentTableCell = ({ date }) => {
    const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";

    return (
      <TableCell>
        <span>{formattedDate}</span>
      </TableCell>
    );
  };

  useEffect(() => {
    if (editable) {
      const formattedDate = moment(editable.date).format("YYYY-MM-DD");
      setData({ ...editable, date: formattedDate }); // Update data state if editable is not null
    } else {
      setData({
        amount: "",
        type: "",
        category: "",
        reference: "",
        description: "",
        date: "",
        userid: "",
      });
    }
  }, [editable]);

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(GET_TRANSACTION_API, {
          userid: user.email,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransaction(res.data.transactions);
        setTotalRows(res.data.transactions.length);
        console.log("Get transactions data", res.data.transactions);
      } catch (e) {
        console.error("Unable to get transactions data", e);
      }
    };

    getAllTransaction();
  }, [frequency, selectedDate, type]);

  return (
    <>
      <Layout>
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999, // Make sure it's above other elements
            }}
          >
            <CircularProgress disableShrink />
          </Box>
        )}
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          sx={{ mb: 60, mt: 20 }}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            Details entered successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showFailureAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          sx={{ mb: 60, mt: 20 }}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Details are incorrect!
          </Alert>
        </Snackbar>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className="homeCards"
          sx={{ width: "30%", backgroundColor: "None", mt: 0, p: 1 }}
        >
          <Box
            message="Select Frequency"
            sx={{ backgroundColor: "None", color: "black", flexGrow: 1 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              Select Frequency
            </Typography>
            <Select
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              displayEmpty
              sx={{ width: 100, maxHeight: 40 }}
            >
              <MenuItem value="7">Daily</MenuItem>
              <MenuItem value="30">Weekly</MenuItem>
              <MenuItem value="365">Monthly</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
                style={{ marginTop: 4 }}
              />
            )}{" "}
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              Select Type
            </Typography>
            <Select
              value={type}
              onChange={(event) => setType(event.target.value)}
              displayEmpty
              sx={{ width: 100, maxHeight: 40 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </Box>
          <Box>
            <Button
              color="secondary"
              size="small"
              sx={{
                backgroundColor: "darkpurple",
                color: "black",
                "&:hover": { backgroundColor: "lightgrey" },
                fontWeight: "bold",
                ml: 10,
                mt: 5,
              }}
              onClick={modalOpen}
            >
              Add New
            </Button>
          </Box>
        </Stack>
        <TableContainer component={Paper} sx={{ mt: 15, maxHeight: 430 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.title} sx={{ fontWeight: "bold" }}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflow: "auto" }}>
              {(rowsPerPage > 0
                ? allTransaction.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : allTransaction
              ).map((row, index) => (
                <TableRow key={index}>
                  <MomentTableCell date={row.date} />
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.reference}</TableCell>
                  <TableCell>
                    <EditOutlinedIcon
                      sx={{
                        mr: 2,
                        "&:hover": {
                          cursor: "pointer",
                          color: "grey",
                        },
                      }}
                      onClick={() => {
                        setEditable(row);
                        console.log("Edit value", row);
                        modalOpen();
                      }}
                    />
                    <DeleteOutlinedIcon
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          color: "red",
                        },
                      }}
                      onClick={() => {
                        handleDelete(row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination // Step 5: Pagination component
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ position: "sticky", bottom: 0 }}
          />
        </TableContainer>
        <Modal open={add} onClose={modalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              overflow: "auto",
              bgcolor: "background.paper",
              border: "2px solid #cccccc",
              borderRadius: 1,
              boxShadow: 24,
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {editable ? "Edit Transaction" : "Add Transaction"}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                onChange={handleChange}
                value={data.amount}
                autoComplete="amount"
                autoFocus
              />
              <Box sx={{ mb: 2, mt: 1 }}>
                <Select
                  required
                  fullWidth
                  id="type"
                  label="Type"
                  name="type"
                  onChange={handleChange}
                  value={data.type}
                  autoComplete="type"
                  autoFocus
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Select Type *</em>
                  </MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </Box>
              <Select
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                onChange={handleChange}
                value={data.category}
                autoComplete="category"
                autoFocus
                displayEmpty
              >
                <MenuItem disabled value="">
                  <em>Select Category *</em>
                </MenuItem>
                {data.type === "income" && [
                  <MenuItem key="salary" value="salary">
                    Salary
                  </MenuItem>,
                  <MenuItem key="tip" value="tip">
                    Tip
                  </MenuItem>,
                  <MenuItem key="project" value="project">
                    Project
                  </MenuItem>,
                ]}
                {data.type === "expense" && [
                  <MenuItem key="food" value="food">
                    Food
                  </MenuItem>,
                  <MenuItem key="movie" value="movie">
                    Movie
                  </MenuItem>,
                  <MenuItem key="bills" value="bills">
                    Bills
                  </MenuItem>,
                  <MenuItem key="medical" value="medical">
                    Medical
                  </MenuItem>,
                  <MenuItem key="fee" value="fee">
                    Fee
                  </MenuItem>,
                  <MenuItem key="tax" value="tax">
                    Tax
                  </MenuItem>,
                ]}
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
                onChange={handleChange}
                value={data.reference}
                autoComplete="reference"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
                autoComplete="description"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="date"
                id="date"
                name="date"
                onChange={handleChange}
                value={data.date}
                autoComplete="date"
                autoFocus
              />
              <Box sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3 }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Layout>
    </>
  );
};

export default Home;
