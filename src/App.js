import './App.css';
import React,{useState, useEffect} from "react";
import Axios from 'axios';
import toastr, { error } from 'toastr';
function App() {
  const [movieName,setMovieName] = useState(" ");
  const [movieReview, setMovieReview] = useState(" ");
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieReviewList(response.data);
    })

  },[])
  const submitReview = () =>{
      Axios.post("http://localhost:3001/api/insert",{movieName:movieName , movieReview:movieReview});
      
      setMovieReviewList([...movieReviewList,{movieName: movieName,movieReview:movieReview},]);
  };
  return (
    <div>
      <h1>Hello world</h1>
      <div>
        <div>
            <div className='formControl'>
                <label >Movie Name</label>
                <input name='movieName' type='text' onChange={(e)=>{setMovieName(e.target.value)}}/>
            </div>
            <div className='formControl'>
                <label >Movie review</label>
                <input name='movieReview' type='text' onChange={(e)=>{setMovieReview(e.target.value)}}/>
            </div>
            <div className='formGroupButton'>
                <button onClick={submitReview} >Submit</button>
               {movieReviewList.map((response)=>{
                  return <h2 >movie_name :{response.movie_name} | movie review :{response.movie_review}</h2>
               })}
                
            </div>
          </div>
        
    </div>
    </div>
  );
}

export default App;
