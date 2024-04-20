import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { GET_DASHBOARD_API } from "../services/api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_accessibility from "highcharts/modules/accessibility";
import randomColor from "randomcolor";
import "../assets/styles/App.css";

HC_accessibility(Highcharts);

const Dashboard = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(GET_DASHBOARD_API, {
        userid: user.email,
      });
      setLoading(false);
      setAllTransaction(res.data.transactions);
      console.log("Get transactions data", res.data.transactions);
    } catch (e) {
      console.error("Unable to get transactions data", e);
    }
  };

  // Preprocess data to aggregate amounts by category
  const aggregatedData = allTransaction.reduce((acc, transaction) => {
    const category =
      transaction.category.charAt(0).toUpperCase() +
      transaction.category.slice(1); // Capitalize first character of category
    if (!acc[category]) {
      acc[category] = parseFloat(transaction.amount);
    } else {
      acc[category] += parseFloat(transaction.amount);
    }
    return acc;
  }, {});

  // Extract categories and amounts from aggregated data
  const categories = Object.keys(aggregatedData);
  const amounts = Object.values(aggregatedData);

  // const categories = allTransaction.map((transaction) => transaction.category);
  // const amounts = allTransaction.map((transaction) =>
  //   parseFloat(transaction.amount)
  // );

  // Generate colors dynamically based on the number of categories
  // const dynamicColorsBar = Highcharts.getOptions().colors.slice(
  //   0,
  //   categories.length
  // );

  // Calculate total income and expense
  const totalIncome = allTransaction.reduce((total, transaction) => {
    return transaction.type === "income" ? total + transaction.amount : total;
  }, 0);

  const totalExpense = allTransaction.reduce((total, transaction) => {
    return transaction.type === "expense" ? total + transaction.amount : total;
  }, 0);

  // Function to generate random HSL color
  const randomHSLColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
    const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation value between 50 and 100
    const lightness = Math.floor(Math.random() * 12) + 70; // Random lightness value between 70 and 90
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const dynamicColorsBar = categories.map(() => randomHSLColor());
  const dynamicColorsPie = categories.map(() => randomHSLColor());
  const dynamicColorsPieChart = categories.map(() => randomHSLColor());

  const barOptions = {
    chart: {
      type: "column",
      height: 500,
      width: 1350,
    },
    title: {
      text: "Transaction Amounts by Category",
      style: {
        fontSize: "20px", // Change the font size of the title
        color: "darkpurple", // Change the color of the title
        margin: "20px 0 10px 0", // Change the margin of the title (top, right, bottom, left)
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts.com link
    },
    xAxis: {
      categories: categories,
      title: {
        text: "Category",
        margin: 20,
        style: {
          fontWeight: "bold", // Make the title bold
          margin: 20, // Adjust the margin top here
        },
        scrollbar: {
          enabled: true, // Enable the scrollbar for x-axis
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount",
        margin: 20,
        style: {
          fontWeight: "bold", // Make the title bold
          margin: 20, // Adjust the margin top here
        },
      },
    },
    series: [
      {
        name: "Amount",
        data: amounts,
        colorByPoint: true, // Color each point individually
        colors: dynamicColorsBar, // Add dynamic colors for each category
      },
    ],
  };

  const pieOptions = {
    chart: {
      type: "pie",
      height: 370,
    },
    
    title: {
      text: "Transaction Distribution",
      style: {
        fontSize: "15px", // Change the font size of the title
        color: "darkpurple", // Change the color of the title
        margin: "20px 0 10px 0", // Change the margin of the title (top, right, bottom, left)
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts.com link
    },
    series: [
      {
        name: "Transaction Type",
        data: categories.map((category, index) => ({
          name: category,
          y: amounts[index],
          color: dynamicColorsPie[index],
        })),
      },
    ],
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      height: 370,
    },
    title: {
      text: "Total Income and Expense amounts",
      style: {
        fontSize: "15px", // Change the font size of the title
        color: "darkpurple", // Change the color of the title
        margin: "20px 0 10px 0", // Change the margin of the title (top, right, bottom, left)
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts.com link
    },
    series: [
      {
        name: "Amount",
        data: [
          {
            name: "Income",
            y: totalIncome,
          },
          {
            name: "Expense",
            y: totalExpense,
          },
        ],
        colors: dynamicColorsPieChart,
        colorByPoint: true,
      },
    ],
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

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

        <Typography
          variant="h5"
          mt={0}
          ml={0}
          p={1}
          sx={{ fontWeight: "bold", color: "darkpurple" }}
        >
          Dashboard
        </Typography>

        <Box className="chart-wrapper" mt={2} p={3}>
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </Box>
        <Box className="chart-wrapper" mt={2} p={3}>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </Box>

        <Box className="chart-wrapper" mt={2} p={5} mb={2}>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </Box>
      </Layout>
    </>
  );
};

export default Dashboard;
