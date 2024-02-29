"use client"

import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../GlobalRedux/Features/productSlice';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const typeOptions = {
  title: "Arten von Medikamenten",
  is3D: false,
};

// Function to count the occurrences of each product type
const countProductTypes = (products) => {
  const productCounts = {};

  // Iterate over each product
  products.forEach(product => {
    const { type } = product;

    // Increment the count for this product type or initialize it to 1 if it's the first occurrence
    productCounts[type] = (productCounts[type] || 0) + 1;
  });

  // Convert the object into an array of arrays
  const countsArray = Object.entries(productCounts);
  countsArray.unshift(["Medikament", "Anzahl"]);

  return countsArray;
};

export const illnessOptions = {
  title: "Medikamente gegen Krankheit",
  pieHole: 0.2,
  is3D: true,
};

const countProductIllness = (products) => {
  const productCounts = {};

  // Iterate over each product
  products.forEach(product => {
    const { illness } = product;

    // Increment the count for this product type or initialize it to 1 if it's the first occurrence
    productCounts[illness] = (productCounts[illness] || 0) + 1;
  });

  // Convert the object into an array of arrays
  const countsArray = Object.entries(productCounts);
  countsArray.unshift(["Medikament", "Anzahl"]);

  return countsArray;
};

const priceProduct = (products) => {
  const productsArray = [];

  // Push the header array ["Name", "Preis"] as the first element
  productsArray.push(["Name", "Preis"]);

  // Iterate over each product to extract name and price
  products.forEach(product => {
    const { name, price } = product;
    // Push an array containing name and price of each product
    productsArray.push([name, price]);
  });

  return productsArray;
};

const findHighestAndLowestPrices = (products) => {
  if (products.length === 0) {
    return { highest: null, lowest: null };
  }

  let highestPrice = products[0].price;
  let lowestPrice = products[0].price;

  for (let i = 1; i < products.length; i++) {
    const price = products[i].price;
    if (price > highestPrice) {
      highestPrice = price;
    }
    if (price < lowestPrice) {
      lowestPrice = price;
    }
  }

  return { highest: highestPrice, lowest: lowestPrice };
};

const Page = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(getProducts())
      .then(() => {
        setIsLoading(false); // Set loading to false when products are fetched
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [dispatch]);

  // Call the function passing your array of products
  const typeCountsArray = countProductTypes(products);
  const illnessCountArray = countProductIllness(products);
  const priceArray = priceProduct(products);
  // console.log(products)
  const { highest, lowest } = findHighestAndLowestPrices(products);

  const priceOptions = {
    hAxis: { minValue: lowest, maxValue: highest },
    chartArea: { top: 0, right: 0, bottom: 0 },
  };


  return (
    <Box sx={{marginLeft:"200px"}} >
      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "80vw", height: "50vh" }} >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{display:"flex", flexDirection:"column-reverse", justifyContent:"center"}} >
          <Box sx={{display:"flex", flexDirection:"row-reverse", marginTop:"100px"}}>
            <Chart
              chartType="PieChart"
              data={typeCountsArray}
              options={typeOptions}
              width={"100%"}
              height={"500px"}
            />
            <Chart
              chartType="PieChart"
              width="100%"
              height="500px"
              data={illnessCountArray}
              options={illnessOptions}
            />
          </Box>
         <Box sx={{ display:"flex", flexDirection:"row", justifyContent:"center",}}> 
          <Chart
            chartType="BarChart"
            width="80%"
            height="300px"
            data={priceArray}
            options={priceOptions}
            chartPackages={["corechart", "controls"]}
            controls={[
              {
                controlType: "NumberRangeFilter",
                options: {
                  filterColumnIndex: 1,
                  minValue: 0,
                  maxValue: 60,
                },
              },
            ]}
          />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Page;
