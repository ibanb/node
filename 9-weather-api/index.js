import express from 'express';
import axios from 'axios';

// new app
const app = express();


app.get('/weather/:city', async (req, res) => {
    try {
 
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: req.params.city,
                appid: '6762aed8033f58a58a74a86aed242297',
                lang: 'ru',
                units: 'metric'
            }
        })
        
        res.json(data);
    
       } catch(e) {
        console.log(e)
       }
})


app.listen(9000, () => {
    console.log('SERVER is running!')
})