import './searchBar.css';
import React, {useState,useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Modal,Button } from 'react-bootstrap';
import axios from "axios";
/*
    SearchBar componener is using for searching movies or series from TheMovieDB API 
    it will fetch the list of movies or a specific movie from the TheMovieDB API 
*/
function SearchBar() {
  const [suggestionList, setsuggestionList] = useState([]) //state used for saving search suggestion
  const [searchValue, setsearchValue] = useState("") //state used for saving search input
  const [searchCatg, setsearchCatg] = useState("Movie")
  const [modalShow, setmodalShow] = useState(false);
  const [generList, setgenerList] = useState([]);
  const [year, setyear] = useState(0);
  const [adult, setadult] = useState("");
  const [company, setcompany] = useState("");
  const [gener, setgener] = useState("");
  const [advSearch, setadvSearch] = useState(false);
  const [advSearchOptions, setadvSearchOptions] = useState({});
  const [suggestion, setsuggestion] = useState(false);
  /*
    function for fetch search results from TheMovieDB API
  */
  const searchMovie=()=>{
    const apiOption=(searchCatg==="Movie")? "movie":"person" 
    let params={
        api_key:"ea4f7ec2ab24ce3ee2c9c9daf9695253",
        query:searchValue
      } //parameters for API request
      if(searchCatg==="Movie" && advSearch){
        setAdvSearchParameters()
        params={
          ...params,...advSearchOptions
        }
        
      }
    axios.get('https://api.themoviedb.org/3/search/'+apiOption,{params:params})
        .then(function (response) {
            setsuggestionList(response.data.results) //setting suggestion values for search
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
  }
  /*
    function for save on change value of search input feild 
  */
  const triggerSearchSuggestion=(event)=>{ 
    setsuggestion(true)
    setsearchValue(event.target.value)
    event.preventDefault()
    if(event.target.value===""){
      setsuggestionList([])
    }
    else{
      searchMovie()
    }

  }
  /*
    function for fetch list of geners available
  */
  const getGenerList=()=>{
    const params={
      api_key:"ea4f7ec2ab24ce3ee2c9c9daf9695253"
    }
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=ea4f7ec2ab24ce3ee2c9c9daf9695253&language=en-US',{params:params})
        .then(function (response) {
            setgenerList(response.data.genres) //setting gener options for advance search
            console.log(response.data.genres)
        })
        .catch(function (error) {
            console.log(error);
        })
  }
  const setAdvSearchParameters=()=>{
    let advanceSearch={}
    if(year){
      advanceSearch={...advanceSearch, year}
    }
    if(adult){
      advanceSearch={...advanceSearch, adult}
    }
    if(company){
      advanceSearch={...advanceSearch, company}
    }
    if(gener){
      advanceSearch={...advanceSearch, gener}
    }
    setadvSearchOptions(advanceSearch)
  }
  useEffect(() => {
    getGenerList()
  },[]);

  return (
    <div className="col-md-8 container">
      <div className="col-md-12 slider">
          <button onClick={()=>{setsearchCatg((searchCatg==="Movie")? "Artist":"Movie")}} className="btn btn-outline-success">&lt;</button>
          <div className="col">
            <div>
              <span className="text-success font-italic font-weight-light">Search By</span>
            </div>
            <div>
              <span className="h2 text-success font-weight-bold">{searchCatg}</span>
            </div>
          </div>
          
          <button onClick={()=>{setsearchCatg((searchCatg==="Movie")? "Artist":"Movie")}} className="btn btn-outline-success" >&gt;</button>
      </div>
      <div className="col-md-12 m-3 ">
        
        <div className="col-md-12 search-bar">
          <div className=" row search-input">
            <input onChange={(event)=>{triggerSearchSuggestion(event)}} className="search-input-text" type="text"/>
            <div className="search-icon-div" onClick={()=>{searchMovie()}}>
              {
                (searchCatg==="Movie") &&
                <button className="btn btn-outline-success" onClick={()=>{
                  searchMovie()
                  setsuggestion(false)
                  }} >
                  <SearchIcon className="search-icon"  style={{fill: "white"}}/>
                </button>
              }
              
              
            </div>
          </div>
          {
            suggestion &&
            <div className="search-result">
            {suggestionList.map((item)=>{
              return(
                <div className="search-result-item">
                  {(searchCatg==="Movie")? <p>{item.original_title}</p> : <p>{item.name}</p>}
                  <p>{item.original_title}</p>

                </div>
              )
            })}
            </div>
          }
          
          
        </div>

      </div>
      {
        advSearch &&
        <div>
          {
            Object.keys(advSearchOptions).map((value,index)=>{
              return(
                <span key={index}>{value}:{advSearchOptions[value]}</span>
              )
            })
          }
        </div>

      }
      
      <Button variant="success" onClick={()=>{setmodalShow(true)}}>
        Advance Search
      </Button>

      <Modal
        show={modalShow}
        onHide={()=>{setmodalShow(false)}}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-container"
      >
        <Modal.Header closeButton dialogClassName="modal-header">
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body dialogClassName="modal-body">
          <div className="input-div">
            <label>Year</label>
            <input onChange={(event)=>(setyear(event.target.value))} className="col-md-6" type="number" />
          </div>
          <div className="input-div">
            <label>Adult</label>
            <select onChange={(event)=>(setadult(event.target.value))} className="col-md-6" name="adult" >
              <option value="">--select--</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="input-div">
            <label>Company</label>
            <input onChange={(event)=>(setcompany(event.target.value))} className="col-md-6" type="text" />
          </div>
          <div className="input-div">
            <label>Gener</label>
            <select onChange={(event)=>(setgener(event.target.value))} className="col-md-6" name="gener" >
            <option value="">--select--</option>
              {generList.map((value,index)=>{
                return (
                  <option key={index} value={value.name}>{value.name}</option>
                )
              })}
            </select>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setmodalShow(false)}}>
            Close
          </Button>
          <Button onClick={()=>{setadvSearch(true)
                              setmodalShow(false)
                              setAdvSearchParameters()}} variant="primary">Apply</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    
  );
}

export default SearchBar;
