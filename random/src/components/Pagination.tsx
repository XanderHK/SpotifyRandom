import { ReactNode, useState } from 'react'

type P<T> = {
  items: T[]
  amount: number
  render: (item: T) => ReactNode
}

function Pagination<T>(props: P<T>) {
  const itemsPerPage = props.amount
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const renderedItems = props.items.map(props.render)
  const currentItems = renderedItems.slice(startIndex, endIndex)

  const totalPages = Math.ceil(props.items.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <>
      <div className="row">
        {currentItems.map((item, index) => (
          <div className="col-md-4" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="row justify-content-center">
        <nav>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn spotify-green btn-circle btn-xl"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn spotify-green btn-circle btn-xl"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </nav>
      </div>
    </>
  )
}

export default Pagination
