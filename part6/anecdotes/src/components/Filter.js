import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
      const filterValue = e.target.value
      dispatch(filterChange(filterValue))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange}/>
      </div>
    )
  }
  
  export default Filter