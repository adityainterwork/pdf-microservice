var fs = require('fs');
var pdf = require('html-pdf');
var Handlebars = require('handlebars');
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

var path = require('path')
var helpers = require('handlebars-helpers')();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var config = {
    "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "landscape", // portrait or landscape
    "border": {
        "top": "0.5cm", // default is 0, units: mm, cm, in, px
        "right": "1.5cm",
        "bottom": "0in",
        "left": "1.5cm"
    },
    paginationOffset: 1, // Override the initial pagination number
    "header": {
        "height": "25mm",
        "contents": '<div align="center"><img alt ="img" height="32" width="auto" src="https://upload.wikimedia.org/wikipedia/commons/a/af/Ranbaxy_Logo.svg"></div>'
    },
    "footer": {
        "height": "20mm",   
        "contents": {      
            default: '<table width="700"><tr><td width="360px" style="text-align: center; vertical-align: middle;"> <div align="right">{{page}}/{{pages}}</div></td><td><div align="right">Powered by <img alt ="img" height="30" width="auto" src="https://dfm.nrr.mybluehost.me/wp-content/uploads/2018/09/Logo-IW_jpg.jpg"> </div></td></tr></table>' // fallback value
        }
    },
    "zoomFactor": "1",  
    "type": "pdf", 
    "quality": "100", 
}

var TEMPLATE;


app.get('/pdf', (req, res) => {

    generatePDF(req, res);

})

function generatePDF(req, res_) {

    TEMPLATE = req.body.TEMPLATE;
  
   

    if (TEMPLATE === 'ts')

    {
        var data = {
            DATE: req.body.DATE,
            BL: req.body.BL,
            SL: req.body.SL,
            BR: req.body.BR
        }
    } else if (TEMPLATE === 'ti') {

        var data = {
            RD: req.body.RD ,
            TD: req.body.TD ,
            SD: req.body.SD ,
            SN: req.body.SN,
            SA: req.body.SA,
            BN: req.body.BN,
            BA: req.body.BA,
            BA: req.body.BA,
            ND: req.body.ND,
            NDC: req.body.NDC,
            SOD: req.body.SOD,
            DF: req.body.DF,
            LN: req.body.LN,
            NC: req.body.NC,
            CS: req.body.CS
        }

        config = {
            "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid
            "orientation": "portrait", // portrait or landscape
            "border": {
                "top": "0.5cm", // default is 0, units: mm, cm, in, px
                "right": "1.5cm",
                "bottom": "0in",
                "left": "1.5cm"
            },
            paginationOffset: 1, // Override the initial pagination number
            "header": {
                "height": "25mm",
                "contents": '<div align="center"><img alt ="img" height="32" width="auto" src="https://upload.wikimedia.org/wikipedia/commons/a/af/Ranbaxy_Logo.svg"></div>'
            },
            "footer": {
                "height": "20mm",   
                "contents": {      
                    default: '<table width="520"><tr><td width="270px" style="text-align: center; vertical-align: middle;"> <div align="right">{{page}}/{{pages}}</div></td><td><div align="right"><span style="font-size: 12px; ">Powered by</span> <img alt ="img" height="20" width="auto" src="https://dfm.nrr.mybluehost.me/wp-content/uploads/2018/09/Logo-IW_jpg.jpg"> </div></td></tr></table>' // fallback value
                }
            },
            "zoomFactor": "1",  
            "type": "pdf", 
            "quality": "100", 
        }
    } else {
        TEMPLATE = "th"
        var data = req.body;
    }

    var file = fs.readFileSync('./templates/' + TEMPLATE + '.hbs', 'utf8').toString();
    var p = Handlebars.compile(file);

    var html = p({
        data: data
    });
    console.log(req.body)
    pdf.create(html, config).toFile('./' + TEMPLATE + '.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
        res_.sendFile(path.join(__dirname, './' + TEMPLATE + '.pdf'))
    });
}



app.listen(4000)