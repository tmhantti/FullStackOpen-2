// eriytetty komponentti: suodatus (input-kenttä)
const Filter= (props) => {
    return(
      <div>
      filter shown with: <input 
      value={props.searchString} 
      onChange={props.handleSearchStringChange}
      />
    </div>
    )
  }
  export default Filter