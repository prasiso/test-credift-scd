export const pagination_helper = (
  page: any,
  limit: any,
  count: any,
  data: any,
) => {
  const total_page = Math.ceil(count / limit)
  return {
    results: data,
    totalDocs: count,
    page,
    totalPage: total_page,
    hasNext: page !== total_page,
    hasPrev: page !== 1
  };
};
