
import React from 'react';
import { Box, Text, Input ,Badge} from '@chakra-ui/react';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';

function Header({setPage,db}) {
  return (
    <>
      <Box bg="#2874F0" p={5} d="flex" justifyContent="space-evenly" color="white">
        <Text color="white">Flipkart</Text>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        
          <Input placeholder="search here" w="60vw" />
          <Text cursor="pointer" onClick={()=> setPage("product")} >Home</Text>
          <Text cursor="pointer" onClick={()=> setPage("cart")}>Cart <Badge bg="white" p={2}  borderRadius="50%">{db.itemsInCart.length>0 ?db.itemsInCart.length:0}</Badge></Text>
        
      </Box>
    </>
  );
}

export default Header;