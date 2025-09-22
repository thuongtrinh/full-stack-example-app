export const pagingRequestDTO = (boby) => ({
  exchangeId: "",
  createdBy: "",
  createdDate: new Date(),
  pageIndex: boby.pageIndex,
  sizePage: boby.sizePage,
  orders: boby.orders,
  sort: boby.sort,
  data: boby.data,
});
