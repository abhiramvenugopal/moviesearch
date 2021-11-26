import './navBar.css';
import React, {useState,useEffect} from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function NavBar(props) {
    
  return (
    <nav className="navbar navbar-dark bg-success">
        <span className="navbar-brand mb-0 h1">MovieSearch</span>
        <div>
            { !props.wishlist && 
            <button className="btn-custom" onClick={()=>{props.activeWishlist()}} >
                <span className="wishlist-text">WishList</span>
                <ShoppingBagIcon className="bag-icon" style={{fill: "white"}}/>
                <div className="wishlist-count">
                    <span>5</span>
                </div>
            </button>
            }
            {
              (props.wishlist) &&
              <button className="btn-custom" onClick={()=>{props.activeSearch()}} >
              <span className="wishlist-text">Search</span>
             </button>
            }
            
            
        </div>
        
    </nav>

  );
}

export default NavBar;
