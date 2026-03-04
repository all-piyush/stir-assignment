import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config();
export const fetchdata=async(req,res)=>{
    try{
        const {imdbid}=req.params;
        const request=await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbid}`);
        const response=await request.json();
        if(response.Response==="False"){
            return res.status(400).json({
                success:false,
                message:"Movie Not Found. Retry With Different Id"
            })
        }
        const movierequest=await fetch(`https://api.themoviedb.org/3/find/${imdbid}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`);
        const movieresponse=await movierequest.json();
        const id=movieresponse.movie_results[0].id.toString();
        const reviewrequest=await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_API_KEY}`);
        const reviewresponse=await reviewrequest.json();
        const filteredreview=reviewresponse.results.map((review,index)=>`Review ${index+1} :${review.content}`);
        const prompt = `You are an expert movie critic. Read the following audience reviews:${filteredreview}
        Based on those reviews, complete the JSON object below. 
        For "sentiment_summary": Write a descriptive 2-sentence summary of the audience's opinions.
        For "overall_sentiment": Choose strictly from "Positive", "Mixed", or "Negative".
        Respond only with valid JSON. Do not include markdown formatting, backticks, or extra text.
        {"sentiment_summary": "","overall_sentiment": ""}`;
        const ai = new GoogleGenAI({});
        const airesponse = await ai.models.generateContent({
            model: "gemma-3-1b-it",
            contents: prompt
        });
        const cleaned=airesponse.text.replace(/```json/g, "").replace(/```/g, "").trim();
        const parseddata=JSON.parse(cleaned);
        
        const combined={...response,...parseddata}
        return res.status(200).json({
            success:true,
            message:"data etched successfully",
            data:combined,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Servor Error"
        })
    }
}