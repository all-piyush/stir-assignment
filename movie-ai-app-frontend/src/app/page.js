'use client';
import { useState } from "react";
import Image from "next/image";
import styles from './page.module.css'
import { MdReportGmailerrorred } from "react-icons/md";
export default function Home() {
  
  const [loading,setloading]=useState(false);
  const[result,setresult]=useState(null);
  const[error,seterror]=useState(null);
  const[search,setsearch]=useState('');
  function handlesearch(e){
    setsearch(e.target.value);
  }
  
  async function functionsearch(){
    setresult('');
    seterror(null);
    setloading(true);
    const req=await fetch(`/api/v1/fetchdata/${search}`,{
      method:"GET",
      headers:{"Content-type":"application/json"},
      credentials:'include'
    })

    const res=await req.json();
    if(res.success){
    setresult(res.data);
    }
    else{
      seterror(res.message);
    }
    setsearch('');
    setloading(false);
  }
  
   return (
    <div id={styles.app}>
    <div className={styles.appheading}>AI Movie Insight Builder</div>
    <div>
      <input type='text' placeholder='Enter Imdb Id' value={search} onChange={handlesearch} id={styles.searchinput}></input>
      <button className={styles.searchbutton}onClick={functionsearch} disabled={loading}>Search</button>
    </div>
    {error&& <div className={`${styles.text} ${styles.error}`}><MdReportGmailerrorred className={styles.erroricon}/>{error}</div>}
    {loading && <div className={styles.loader}></div>}
    {result &&
    <div className={styles.movie}>
      <div>
      <Image src={result.Poster} width={320} height={320} alt='movie-card'></Image>
      </div>
      <div className={styles["movie-content"]}>
      <div className={styles.title}><span className={styles.key}>Title: </span>{result.Title}</div>
      <div ><span className={styles.key}>Director: </span>{result.Director}</div>
      <div><span className={styles.key}>Writer: </span>{result.Writer}</div>
      <div><span className={styles.key}>Cast: </span>{result.Actors}</div>
      <div className={styles.plot}><span className={styles.key}>Plot: </span>{result.Plot}</div>
      <div ><span className={styles.key}>Year: </span>{result.Year} </div>
      <div className={styles.rating}><span className={styles.key}>Rating: </span>{result.imdbRating}</div>
      <div className={`${styles.aisummary} ${styles.ai}`}><span className={styles.key}>AI summary of audience sentiment: </span>{result.sentiment_summary}</div>
      <div className={styles.ai}><span className={styles.key}>Overall sentiment: </span>{result.overall_sentiment}</div>
      </div>
    </div>
    }
    {!error && !loading && !result && <div className={styles.text}>Enter an IMDb ID to fetch movie insights<br/>One Tool For All Movies</div>}
    </div>
  );
}
