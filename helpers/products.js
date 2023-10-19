module.exports.productsNewPrice = (products) => {
  const newProducts = products.map(item => {
    item.newPrice = (item.price * ((100 - item.discountPercentage) / 100)).toFixed();
    return item;
  })

  return newProducts;
}

module.exports.productNewPrice = (product) => {
  const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
  return priceNew;
}