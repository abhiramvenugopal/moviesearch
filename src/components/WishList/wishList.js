import './wishList.css';
import React, {useState,useEffect} from 'react';
import { useSelector ,useDispatch } from "react-redux";
import { append,remove } from "../../actions";
import MovieList from "../MovieList/movieList";
 /*
    component for listing wishlist items
  */
function WishList(props) {
    const wishlistredux=useSelector(state =>state.wishlist)
    const [wishList, setwishList] = useState(wishlistredux);
    const [movieList, setmovieList] = useState([]);
    const dispatch=useDispatch()
    useEffect(() => {
        let temp=[]
        for( let key of Object.keys(wishList)){
            temp.push(wishList[key])
        }
        setmovieList(temp)
        console.log("temp",temp)
    }, [wishList])
  return (
      <div>
          {/* reusing movie list componenet for listing wishlist items */}

          <MovieList movies={movieList}/>

      </div>
      
    
    
    
  );
}

export default WishList;
