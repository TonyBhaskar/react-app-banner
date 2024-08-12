
import express from 'express'
import cors from 'cors'
import { getBanners, getBanner, updateBanner, createBanner } from './config.js'



const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});



app.get('/', async (req, res) => {
    const banners = await getBanners();
    res.send(banners);
});


app.post('/create', async (req, res) => {
    const { banner_desc, banner_timer, banner_link, is_visible } = req.body;
    const banner = await createBanner(banner_desc, banner_timer, banner_link, is_visible);
    res.status(201).send(banner);
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { banner_desc, banner_timer, banner_link, is_visible } = req.body;
    const banner = await updateBanner(id, banner_desc, banner_timer, banner_link, is_visible);
    res.status(200).send(banner);
});

app.listen(3000, () => {
    console.log('express is running on the server');
});
