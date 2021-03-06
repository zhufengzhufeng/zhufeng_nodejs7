var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var app = http.createServer(function (req,res) {
    var urlObj = require('url').parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/clock'){
        res.end(JSON.stringify({time:new Date().toLocaleString()}))
        //res.end(new Date().toLocaleString());
    }else{
        var flag = fs.existsSync('.'+pathname);
        if(flag){
            res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
            fs.createReadStream('.'+pathname).pipe(res);
        }else{
            var _http_server  = require('_http_server').STATUS_CODES;
            var status = 404;
            res.statusCode = status;
            res.end(_http_server[status]);
        }
    }
});
app.listen(8080);