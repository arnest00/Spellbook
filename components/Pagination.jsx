const Pagination = ({ count, currentPage, searchParams }) => {
  const numPages = Math.ceil(count / 50);
  const linksText = Array.from({ length: numPages }, (_, idx) => idx + 1);
  const prevPage = (currentPage - 1 > 0) ? currentPage - 1 : 0;
  const nextPage = (currentPage + 1 <= numPages) ? currentPage + 1 : 0;
  const searchParamsWithoutPage = Object.keys(searchParams)
    .reduce((acc, key) => {
      if (key !== 'page') {
        acc[key] = searchParams[key];
      } return acc;
    }, {});
  const queryStr = Object.keys(searchParamsWithoutPage)
    .map((key) => {
      return '' + key + '=' + searchParamsWithoutPage[key];
    })
    .join('&');

  return (
    <ul className="cmp-pagination">
      {Boolean(prevPage) && (
        <li>
          <a
            href={`/search?${queryStr}&page=${prevPage}`}
            className="cmp-pagination__action">
            Previous
          </a>
        </li>
      )}
      {linksText.map((linkText) => (
        <li key={`page-${linkText}`}>
          {(currentPage === linkText) 
            ? <span
                href={`/search?${queryStr}&page=${linkText}`}
                className="cmp-pagination__link cmp-pagination__link--current">
                {linkText}
              </span>
            : <a
                href={`/search?${queryStr}&page=${linkText}`}
                className="cmp-pagination__link">
                {linkText}
              </a>
          }
        </li>
      ))}
      {Boolean(nextPage) && (
        <li>
          <a
            href={`/search?${queryStr}&page=${nextPage}`}
            className="cmp-pagination__action">
            Next
          </a>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
