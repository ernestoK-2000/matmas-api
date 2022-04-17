const express = require('express')


    console.log(express);
    const app = express();

    app.use(express.json());
    const PORT = process.env.PORT || 8080;

    let sponsors = [
        {id: 1, images: ['https://static.wikia.nocookie.net/starcraft/images/d/d2/Artanis_SC2-LotV_Portrait.jpg/revision/latest/scale-to-width-down/150?cb=20160104065255']},
        {id: 2, images: ['https://oyster.ignimgs.com/mediawiki/apis.ign.com/starcraft-2/e/e4/500full.jpg']},
        {id: 3, images: ['http://cdn.pastemagazine.com/www/articles/starcraft_james_raynor.jpg']}
    ]

    app.listen(
        PORT,
        () => console.log(`it's alive on http://localhost:${PORT}`)
    )

app.get('/api/sponsors', (req, res) => {
    res.status(200).send({
        sponsors: sponsors,
        amount: sponsors.length
    })
})

app.get('/api', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/sponsors/:id', (req, res) => {
    let reqSponsor = sponsors.find(s => s.id == req.params.id);
    if(!reqSponsor){
        res.status(404).send("The sponsor with the given id was not found");
    }else{
        res.send(reqSponsor);
    }
});

app.post('/api/sponsors', (req, res) => {
    if(!req.body.images){
        res.status(400).send("At least one image should be provided");
    }else{
        let sponsor = {
            id: sponsors.length + 1,
            images: req.body.images
        };
        sponsors.push(sponsor);
        res.send(sponsor);
    }   
});



