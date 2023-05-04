import Image from '../assets/undraw_no_data_re_kwbl (1).svg'

const SearchError = ({ searchTerm }) => {
  console.log(searchTerm)
  return (
    <div className="search-container search-error">
      <h2>There's  no blog with  <span>'{searchTerm}' search term</span></h2>
      <div className="error-image">
        <img src={Image} alt="clipboard" />
      </div>
    </div>
  )
}

export default SearchError