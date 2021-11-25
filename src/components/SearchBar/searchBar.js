import './searchBar.css';
import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
function SearchBar() {
  const [suggestionList, setsuggestionList] = useState([])
  const [searchValue, setsearchValue] = useState("")
  const searchMovie=()=>{
    const params={
        api_key:"ea4f7ec2ab24ce3ee2c9c9daf9695253",
        query:searchValue
      }
    axios.get('https://api.themoviedb.org/3/search/movie',{params:params})
        .then(function (response) {
            // this.setState({posts:response.data.posts.reverse()})
            setsuggestionList(response.data.results)
            console.log(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
  }
  const triggerSearchSuggestion=(event)=>{
    setsearchValue(event.target.value)
    event.preventDefault()
    if(event.target.value===""){
      setsuggestionList([])
    }
    else{
      searchMovie()
    }

  }
  return (
    <div className="container">
      <div className="col-md-8 search-bar">
        <div className=" row search-input">
          <input onChange={(event)=>{triggerSearchSuggestion(event)}} className="search-input-text" type="text"/>
          <div className="search-icon-div" onClick={()=>{searchMovie()}}>
            <SearchIcon className="search-icon"  style={{fill: "white"}}/>
          </div>
        </div>
        <div className="search-result">
          {suggestionList.map((item)=>{
            return(
              <div className="search-result-item">
                <p>{item.original_title}</p>

              </div>
            )
          })}
        </div>
        
      </div>

    </div>
    
  );
}

export default SearchBar;
