import axios from "axios";

const data = {
    all:[],
    scifi:[],
    horror:[],
    comedy:[],
    romantic:[],
    action:[]
}

const genres = ["all","scifi","action","comedy","romantic","horror"]

console.log(genres)

genres.forEach(genre=>{
    axios.get(`http://localhost:3000/api/movies/cache/popular/${genre}`).
    then(res=> data[genre]=res)
})

console.log(data)

export default data