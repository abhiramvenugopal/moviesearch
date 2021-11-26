import './movieList.css';
import React, {useState,useEffect} from 'react';
import GradeIcon from '@mui/icons-material/Grade';

function MovieList(props) {
    useEffect(() => {
        console.log("props",props.movies)
      },[]);

  return (
      <div className="container">
        <div className="row custom-space-between">
          
            {
                    props.movies.map((item,index)=>{
                        return(
                            <div className="m-2v col-md-6 col-sm-12 col-lg-4">
                                <div className="card custom-card">
                                    <div className="card-title star-icon">
                                        <GradeIcon className="grade-icon" />
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
    
    
    
  );
}

export default MovieList;
