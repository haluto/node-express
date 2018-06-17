var express = require('express');

var app = express();

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.use(express.static(__dirname + '/public'));

//设置handlebars视图引擎
var handlebars = require('express3-handlebars')
	.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//使用handlebars视图作为新的路由
app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    //res.render('about');
    var randomFortune = 
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

//404 catch-all处理器（中间件）
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

//500错误处理器（中间件）
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

/**
app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Meadowlark Travel');
});
app.get('/about', function(re, res){
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

//定制404页面
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});
*/

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
               app.get('port') + '; press Ctrl-C to terminate.');
});