import { Box, Image, Button, Badge, Center, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
function Products({ productData, db, setDb }) {
  const [productInCart, setproductInCart] = useState(false);
  const [isFavItem, setIsFavItem] = useState(false);

  useEffect(() => {
    let isFav = false;
    let isItemInCart = false;
    db.favItems.forEach(item => {
      if (item.id === productData.id) {
        // console.log('item', item);
        isFav = true;
      }
      
    });

    db.itemsInCart.forEach(item => {
      if (item.id === productData.id) {
        // console.log('item', item);
        isItemInCart = true;
      }
      
    });
    // console.log('isFav', isFav);
    setIsFavItem(isFav);
    setproductInCart(isItemInCart);
  // eslint-disable-next-line
  }, [db]);

  const addItemToFav = id => {

    // eslint-disable-next-line
    let newArr = db.allProducts.filter(item => {
      if (item.id === id) {
        return item;
      }
    });

    let newFavItems = db['favItems'];
    newFavItems.push(newArr[0]);
    setDb({ ...db, favItems: newFavItems });
  };

  const removeFromFav = id => {

    // eslint-disable-next-line
    var newRes = db['favItems'].filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    // console.log('newRes', newRes);
    setDb({ ...db, favItems: newRes });
  };

  const addItemToCart = id => {
    // let arr = cartItems.filter(item => item === productData.id);
    // if (arr) {
    //   setproductInCart(true);
    // }
    // setCartItems([...cartItems, productData.id]);

    // eslint-disable-next-line
    let newArr = db.allProducts.filter(item => {
      if (item.id === id) {
        return item;
      }
    });

    if (newArr[0].quantity) {
      newArr[0].quantity += 1;
    } else {
      newArr[0].quantity = 1;
    }
    // console.log('newArr', newArr[0]);
    // console.log('newArrfromDb', db['itemsInCart']);
    let newItemsInCart = db['itemsInCart'];
    newItemsInCart.push(newArr[0]);
    setDb({ ...db, itemsInCart: newItemsInCart });
  };

  
  const removeFromCart = id => {
    // var res = removeItem(cartItems, id);
    // console.log("db['itemsInCart']", db['itemsInCart']);

    // setCartItems(res);
    // setproductInCart(false);

    // eslint-disable-next-line
    var newRes = db['itemsInCart'].filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    // console.log('newRes', newRes);
    setDb({ ...db, itemsInCart: newRes });
  };
  return (
    <>
      <Box
        borderRadius="lg"
        boxShadow="md"
        _hover={{
          boxShadow: '2xl',
        }}
        p="3"
      >
        <Box>
          {isFavItem ? (
            <Box cursor="pointer">
              <AiFillHeart
                color="red"
                onClick={() => removeFromFav(productData.id)}
              />
            </Box>
          ) : (
            <Box cursor="pointer">
              <AiOutlineHeart
                cusrsor="pointer"
                onClick={() => addItemToFav(productData.id)}
              />
            </Box>
          )}
        </Box>
        <Center>
          <Image src={productData.image} w="150px" h="180px" />
        </Center>
        <Box d="flex" flexDirection="column">
          <Text
            color="gray"
            fontWeight="bold"
            casing="uppercase"
            fontSize="md"
            textAlign="left"
          >
            {productData.brand}
          </Text>

          <Text textAlign="left" fontWeight="semibold" fontSize="lg">
            {productData.title}
          </Text>

          <Box d="flex" justifyContent="space-between" alignItems="center">
            <Text textAlign="left" as="b">
              ₹{productData.price}
            </Text>
            <Text fontSize="lg">Ratings: {productData.rating.rate}</Text>
          </Box>
          <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            my="2"
          >
            <Text textAlign="left" fontSize="md">
              Size: &nbsp;&nbsp;
              {productData.size.map(sizes => (
                <Text as="span">{sizes} </Text>
              ))}
            </Text>

            <Badge p="1" colorScheme="green">
              {productData.discount}%
            </Badge>
          </Box>
        </Box>

        {productInCart ? (
          <Button onClick={() => removeFromCart(productData.id)} my="5">
            Remove
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => addItemToCart(productData.id)}
            my="5"
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </>
  );
}

export default Products;
