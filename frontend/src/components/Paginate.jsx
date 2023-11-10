import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, dashBoard = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        <LinkContainer
          to={
            !isAdmin ? `/page/${page - 1}` : `/admin/${dashBoard}/${page - 1}`
          }
        >
          <Pagination.Prev disabled={page === 1}></Pagination.Prev>
        </LinkContainer>

        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin ? `/page/${x + 1}` : `/admin/${dashBoard}/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}

        <LinkContainer
          to={
            !isAdmin ? `/page/${page + 1}` : `/admin/${dashBoard}/${page + 1}`
          }
        >
          <Pagination.Next disabled={page === pages}></Pagination.Next>
        </LinkContainer>
      </Pagination>
    )
  );
};

export default Paginate;
