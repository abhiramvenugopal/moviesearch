import './movieList.css';
import React, {useState,useEffect} from 'react';
import { useSelector ,useDispatch } from "react-redux";
import GradeIcon from '@mui/icons-material/Grade';
import { append,remove } from "../../actions";
 /*
    component for listing movies
  */

function MovieList(props) {
    const wishlistredux=useSelector(state =>state.wishlist)
    const dispatch=useDispatch()
    const [movies, setmovies] = useState(props.movies);
    const [wishList, setwishList] = useState({});
    useEffect(() => {
        setmovies(props.movies)
      },[props.movies]);
    const setWishlistStatus=(item)=>{
        if(wishList[item.id]){
            dispatch(remove({id:item.id}))
            setwishList(JSON.parse(JSON.stringify(wishlistredux)))
        }
        else{
            dispatch(append({id:item.id,value:item}))
            setwishList(JSON.parse(JSON.stringify(wishlistredux)))
        }
    }

  return (
      <div>
      <div className="container">
        <div className="row custom-space-between">  
            {
                    movies.map((item,index)=>{
                        return(
                            <div key={index} className="m-2v col-md-6 col-sm-12 col-lg-4">
                                <div className="card custom-card">
                                    <div className="card-title star-icon" onClick={()=>{setWishlistStatus(item)}}>
                                        { wishList[item.id] && <GradeIcon className="grade-icon" key={"gradeicon1"}  style={{fill: "red"}} />}
                                        {!(wishList[item.id]) && <GradeIcon className="grade-icon" key={"gradeicon1"}/>}
                                    </div>
                                    <img id={"cardposter"+index} className="card-img-top custom-img-size" src={"https://image.tmdb.org/t/p/w300"+item.poster_path} alt="Cardimagecap"   onError={(e)=>{e.target.onerror = null; e.target.src="/logo192.png"}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.original_title}</h5>
                                    </div>
                                </div>
                                
                            </div>
                            
                        )
                    })  
                }
        </div>
      </div>
      </div>
    
    
    
  );
}

export default MovieList;
