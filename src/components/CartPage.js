import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';


function CartPage( {db, setDb }) {

  const [price, setprice] = useState('');
  const [discount, setdiscount] = useState('');
  const [total, setTotal] = useState('');
  useEffect(() => {
    calculate();
    
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    calculate();

    // eslint-disable-next-line
  }, [db]);

  const calculate = () => {
    // let prodArr = [];
    // db.itemsInCart.forEach(item => {
    //   db.allProducts.forEach(product => {
    //     if (product.id === item) {
    //       prodArr.push(product);
    //     }
    //   });
    // });
    let allPrice = 0;
    let allDiscount = 0;

    db.itemsInCart.forEach(product => {
      allPrice += product.price * product.quantity;
      allDiscount += (product.price * product.discount) / 100;
      allDiscount *= product.quantity;
    });

    setprice(allPrice.toString());
    setdiscount(allDiscount.toString());
    setdiscount(allDiscount);
    setTotal(allPrice - allDiscount);
  };

  const saveForLater = id => {
    
    // eslint-disable-next-line
    let itemForLater = db.itemsInCart.filter(item => {
      if (item.id === id) return item;
    });

    let arrayToset = db['savedForLater'];
    arrayToset.push(itemForLater[0]);
    setDb({ ...db, savedForLater: arrayToset });
  };
  const removeFromCart = id => {

    // eslint-disable-next-line
    var newRes = db['itemsInCart'].filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    // console.log('newRes', newRes);
    setDb({ ...db, itemsInCart: newRes,quantity: 0 });
    calculate();
    
  };

  const increaseQuantity = id => {

    // eslint-disable-next-line
    let itemToChange = db['itemsInCart'].filter(item => {
      if (item.id === id) {
        // console.log("increaseQuantity",item);
        item.quantity += 1;
        return item;
      }
    });

    // eslint-disable-next-line
    let itemNotToChange = db['itemsInCart'].filter(item => {
      if (item.id === !id) {
        return item;
      }
    });
    let updatedCartItems = itemToChange.concat(itemNotToChange);
    setDb({ ...db, itemsInCart: updatedCartItems });
  };
  const decreaseQuantity = id => {

    // eslint-disable-next-line
    let itemToChange = db['itemsInCart'].filter(item => {
      if (item.id === id) {
        // console.log("increaseQuantity",item);
        if (item.quantity > 1) {
          item.quantity -= 1;
          return item;
        } else {
          removeFromCart(id);
        }
      }
    });

    // eslint-disable-next-line
    let itemNotToChange = db['itemsInCart'].filter(item => {
      if (item.id === !id) {
        return item;
      }
    });
    let updatedCartItems = itemToChange.concat(itemNotToChange);
    setDb({ ...db, itemsInCart: updatedCartItems });
  };
  const removeFromLater = id => {

    // eslint-disable-next-line
    var newRes = db['savedForLater'].filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    // console.log('newRes', newRes);
    setDb({ ...db, savedForLater: newRes });
  };
  return (
    <>
      <Box d="flex" p="8">
        <Box w="70vw" bg="white" p="8" mx="2">
          <Text textAlign="left">
            My Cart ({db.itemsInCart.length > 0 ? db.itemsInCart.length : 0})
          </Text>
          {db.itemsInCart.length > 0 ? (
            db.itemsInCart.map(product => (
              <>
                <Box
                  d="flex"
                  justifyContent="space-between"
                  borderRadius="md"
                  boxShadow="lg"
                  p="10"
                >
                  <Box w="40%">
                    <Image src={product.image} w="150px" h="180px" />
                  </Box>
                  <Box w="60%">
                    <Text textAlign="left">{product.title}</Text>
                    <Text textAlign="left" color="green">
                      {product.discount}% off
                    </Text>
                    <Text textAlign="left">₹{product.price}</Text>
                    <Box d="flex" justifyContent="space-between" my="5">
                      <Box d="flex" alignItems="center">
                        <Button
                          borderRadius="50%"
                          mx="2"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </Button>
                        <Box
                          px="5"
                          border="0.5px solid black"
                          borderRadius="md"
                        >
                          {product.quantity}
                        </Box>
                        <Button
                          borderRadius="50%"
                          mx="2"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </Button>
                      </Box>
                      <Box>
                        <Button onClick={() => saveForLater(product.id)}>
                          Save For Later
                        </Button>
                      </Box>
                      <Box>
                        <Button onClick={() => removeFromCart(product.id)}>
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ))
          ) : (
            <>
              <Text>No item in cart </Text>
            </>
          )}

          <hr></hr>

          {db.savedForLater.length > 0 && (
            <>
              <Box my="4" border="1px solid black" minW="90%"></Box>
              <Text my="2">Items for later</Text>
              {db.savedForLater.map(product => (
                <Box
                  d="flex"
                  justifyContent="space-between"
                  borderRadius="md"
                  boxShadow="lg"
                  p="10"
                >
                  <Box w="40%">
                    <Image src={product.image} w="150px" h="180px" />
                  </Box>
                  <Box w="60%">
                    <Text textAlign="left">{product.title}</Text>
                    <Text textAlign="left" color="green">
                      {product.discount}% off
                    </Text>
                    <Text textAlign="left">₹{product.price}</Text>
                    <Button onClick={() => removeFromLater(product.id)}>
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box w="30vw" bg="white" p="8">
          <Text
            textAlign="left"
            color="gray"
            casing="uppercase"
            fontWeight="bolder"
          >
            Price Details
          </Text>
          <Box my="4">
            <Box d="flex" justifyContent="space-between">
              <Text>
                Price ({db.itemsInCart.length > 0 ? db.itemsInCart.length : 0}{' '}
                items)
              </Text>
              <Text>₹{parseInt(price).toPrecision(3)}</Text>
            </Box>
            <Box d="flex" justifyContent="space-between">
              <Text>Discount</Text>
              <Text color="green"> -₹{parseInt(discount).toPrecision(3)}</Text>
            </Box>
            <hr></hr>
            <Box d="flex" justifyContent="space-between">
              <Text>Total</Text>
              <Text fontSize="2xl">₹{parseInt(total).toPrecision(3)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CartPage;
