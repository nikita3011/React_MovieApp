import React,{useEffect,useState} from 'react';
import {API_URL,API_KEY, IMAGE_URL} from '../../Config';
import MainImage from '../LandingPage/sections/MainImage';
import GridCard from '../LandingPage/sections/GridCard';
import { Descriptions,Button ,Row} from 'antd';

function MovieDeatilPage (props){

   const [Movie, setMovie]=useState([])
   const [Crews, setCrews]=useState([])
   const [ActorToggle, setActorToggle]=useState(false)

    useEffect(()=>{

        const movieId=props.match.params.movieId
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response=>response.json())
        .then(response=>{
            //console.log('data',response)
            setMovie(response)
            
        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
        .then(response=>response.json())
        .then(response=>{
            console.log('crew',response)
            setCrews(response.cast)
        })  
        })
    }, [])



   const handleClick=()=>{
     setActorToggle(!ActorToggle)
    }


    return(
        <div>
            {/**Main Image */}
             {
                 Movie &&(
                  <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                  title={Movie.original_title} 
                  text={Movie.overview}/>
           )
              }

              {/**Body */}
            <div style={{width:'85%',margin:'1rem auto'}}>
             <div style={{display:'flex', justifyContent:'flex-end'}}>
              <Button>Add to Favorite</Button>
             </div>

              {/**Movie table info */}
              <Descriptions title='Movie Info' bordered>
              <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
              <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
              <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
              <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
              <Descriptions.Item label="vote_geavera" span={2}>{Movie.vote_average}</Descriptions.Item>
              <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
              <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
              <Descriptions.Item label="popularity">{Movie.original_popularity}</Descriptions.Item>
              </Descriptions>

              <br/>
         <div style={{display:'flex', justifyContent:'center'}}>
              <Button onClick={handleClick}>Toggle Actor View</Button>
             </div>
              <br/>
              {/**Grid Cards for crews */}

              {ActorToggle &&
               <Row gutter={[16,16]}>
               {Crews && Crews.map((crew,index)=>(
                   <React.Fragment key={index}>
                       {
                           crew.profile_path &&
                           <GridCard
                           actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                           />
                       }
                      
                   </React.Fragment>
               )) }

           </Row>

            }

            


         </div>
        
        </div>
    )
}
export default MovieDeatilPage;