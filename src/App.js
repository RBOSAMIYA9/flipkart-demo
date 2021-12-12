import React, { useState } from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Header from './components/Header';
import CartPage from './components/CartPage';
import ProductPage from './components/ProductListing';
import productJson from './data.json';

function App() {
  var allProducts = JSON.parse(JSON.stringify(productJson));

  let demoDb = {
    allProducts: allProducts,
    itemsInCart: [],
    favItems: [],
    savedForLater: [],
  };

  const [db, setDb] = useState(demoDb);
  const [page, setPage] = useState('product');
 

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="#F1F3F6">
        <Header setPage={setPage} db={db} />
        <Box minH="88.5vh">
          {page === 'product' ? (
            <ProductPage
              
              db={db}
              setDb={setDb}
            />
          ) : (
            <CartPage
              
              db={db}
              setDb={setDb}
            />
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
