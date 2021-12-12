import React from 'react';
import {  Box, Grid } from '@chakra-ui/react';
import Products from './Products';

function ProductListing({ db, setDb}) {
  
  return (
    <>
      <Box p="12">
        <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
          {db.allProducts.map(product => (
            <Products
              // setCartItems={setCartItems}
              // cartItems={cartItems}
              productData={product}
              db={db}
              setDb={setDb}
            />
          ))}
        </Grid>
      </Box>

      {}
    </>
  );
}

export default ProductListing;
