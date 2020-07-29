import React, {useEffect, useState}from 'react';
import './favorite.css';
import Axios from 'axios';
import {Popover} from 'antd'

function FavoritePage(){

    const variables={userFrom:localStorage.getItem('userId')}
    const [FavoritedMovies, setFavoritedMovies]=useState([])

    useEffect(()=>{

      Axios.post('/api/favorite/getFavoritedMovies',variables)
      .then(response=>{
          if(response.data.success){
            setFavoritedMovies(response.data.favorites)
          }else {
              alert('failed to get favorite videos')
          }
      })
    }, [])


    const renderTableBody=FavoritedMovies.map((movie,index)=>{
        return(
            <tr>
                <Popover> <td>{movie.movieTime}</td></Popover>
                <td>{movie.movieRunTime}</td>
                <td><button>Remove from favorites</button></td>
            </tr>
        )
    })

    return(
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h3>Favorite Movies By Me</h3>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}
export default FavoritePage;