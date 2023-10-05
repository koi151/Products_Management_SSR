module.exports = (paginationObject, query, productsCount) => {
  if (query.page) {
    paginationObject.currentPage = parseInt(query.page);
  }

  paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limitItems;
  paginationObject.totalPage = Math.ceil(productsCount / paginationObject.limitItems);

  return paginationObject;
}