const express = require("express");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", async(req, res) => {
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/svg',
        quality: 0.3,
        margin: 5,
        color: {
          dark:"#010599FF",
          light:"#FFBF60FF"
        }
      }
    
   const src= await qr.toDataURL(`https://www.hotstar.com/in/subscribe/my-account`,opts)
   res.render("index", { src });
    
});


app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url,{ errorCorrectionLevel: 'H' }, (err, src) => {
        if (err) res.send("Error occured");

        res.render("scan", { src });
    });
});

app.listen(port, () => console.log("Server at 5000"));
