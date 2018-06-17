# 初识Express

## 初识Express

Express是精简的、灵活的Node.js Web程序框架，为构建单页、多页及混合的Web程序提供了一系列健壮的功能特性。

## Node

一种新型的Web服务器，比微软的互联网信息服务（IIS）或Apache等，更精简，搭建和配置容易。

Node和传统Web服务器之间的另一个主要区别是：**Node是单线程的**。如果需要多线程程序的性能，只需要启用更多的Node实例，就可以得到多线程的性能优势。

Node所用的JavaScript引擎（谷歌的V8）确实会将JavaScript编译为本地机器码，但这一操作是透明的（通常被称作“即时”编译）。

## Node的生态系统

Node支持所有主流关系型数据库（MySQL、MariaDB、PostgreSQL、Oracle、SQL Server），同时支持NoSQL数据库（称为“文档型数据库”或“键/值对数据库”）。

描述网站构建基础“技术栈”的缩略语：

LAMP：Linux、Apache、MySQL、PHP

MEAN：MongoDB、Express、Angular、Node

## 授权

npm中有几个包会试图帮你确定项目中每个依赖项的授权。

在npm中搜索**license-sniffer**或**license-spelunker**。

Node开发包中最常见的是MIT授权，它是毫不费力的许可，几乎允许你做任何想做的事情，包括把开发包放到闭源的软件中。还有其它授权：

* GNU通用公共授权（GPL）

GPL是非常流行的开源授权，它为保证软件的自由做了精巧的构思。这意味着如果你在项目中用了GPL授权的代码，那么你的项目必须也是GPL授权的。这自然也就意味着你的项目布恩那个是闭源的。

* Apache2.0

这个授权像MIT一样，你可以为自己的项目使用不同的授权，包括闭源的授权。然而，你必须对那些使用Apache2.0授权的组件做出声明。

* 伯克利软件分发（BSD）

与Apache类似，这个授权允许你为自己的项目使用任何授权，只是你声明使用了BSD授权的组件。



# 从Node开始

## 使用终端

在很多类Unix系统上，**Ctrl-S**都有特殊的含义：它会“冻结”终端（它曾被用来暂停快速滚动）。

解冻终端是用**Ctrl-Q**。

## 用Node实现简单Web服务器

### Hello World

*创建一个文件hello.js*：

```js
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world!!!');
}).listen(3000);
console.log('server started on localhost:3000; press Ctrl-C to terminate...');
```

*执行*：

```shell
$ node hello.js
```

### 事件驱动编程

Node的核心理念是事件驱动编程。

在上面的例子中，事件是隐含的：HTTP请求就是要处理的事件。

### 路由

路由是指客户端提供它所发出的请求内容的机制。对基于Web的客户端/服务器端程序而言，客户端在URL中指明它想要的内容，具体来说就是路径和查询字符串。

*扩展一下“Hello world”的例子，做一个有首页、关于页面和未找到页面的网站。*

```js
var http = require('http');

http.createServer(function(req,res){
    //规范化url，去掉查询字符串、可选的反斜杠，并把它变成小写
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case '':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
            break;
    }
}).listen(3000);
console.log('server started on localhost:3000; press Ctrl-C to terminate...');
```

*运行后可以发现，可以访问首页（http://localhost:3000）和关于页面（http://localhost:3000/about）。所有查询字符串都会被忽略（http://localhost:3000/?foo=bar也是返回首页）。其他所有URL返回找不到页面。*

### 静态资源服务

注意：

用Node提供静态资源只适用于初期的小型项目，对于比较大的项目，应该会想用Nginx或CDN之类的代理服务器来提供静态资源。

*在项目里创建一个名为public的目录。在这个目录下创建home.html、about.html、404.html，子目录img，以及一个名为img/logo.jpg的图片。*

*接下来修改hello.js：*

```js
var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 - Internal Error');
        } else{
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req,res){
    //规范化url，去掉查询字符串、可选的反斜杠，并把它变成小写
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
}).listen(3000);
console.log('server started on localhost:3000; press Ctrl-C to terminate...');
```

fs.readFile是异步方法，同步方法对应的是readFileSync。

__dirname会被解析为正在执行的脚本所在的目录。



# 省时省力的Express

## 脚手架

balabala。

HTML5 Boilerplate（http://html5boilerplate.com/），能生成一个很不错的空白HTML5网站。

## 草地鹨旅行社网站

本书的例子。

## 初始步骤

* *创建项目目录meadowlark。*
* *执行`npm init`*
* *安装Express：`npm install --save express`*
* *创建meadowlark.js文件：*

```js
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

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

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
               app.get('port') + '; press Ctrl-C to terminate.');
});
```

因为还没给Express任何路由信息，所以访问localhost:3000会返回一个404页面。

* *接下来给首页和关于页面加上路由：*

```js
app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Meadowlark Travel');
});
app.get('/about', function(re, res){
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});
```

注意：

我们对定制的404和500页面的处理与对普通页面的处理应有所区别：用的不是app.get，而是app.use。

**app.use是Express添加中间件的一种方法**。先把它看作处理所有没有路由匹配路径的处理器。

**在Express中，路由和中间件的添加顺序至关重要。**如果上例中处理404的中间件放在路由前面，路由将不能用。

Express路由还支持通配符，同样要注意顺序，`app.get('/about*')`将会拦截掉它后面的`app.get('/about/contact')`，`app.get('/about/directions')`等。

### 视图和布局

MVC（模型-视图-控制器）模式。视图本质上是要发送给用户的东西。对网站而言，视图通常就是HTML。也可以是PNG或PDF等等。这里我们指HTML。

视图与静态资源（比如图片或CSS文件）的区别是它不一定是静态的：HTML可以动态构建，为每个请求提供定制的页面。

Express支持多种不同的视图引擎，它们有不同层次的抽象。Express比较偏好的视图引擎是Jade（因为它也是TJ Holowaychuk开发的）。Jade将HTML抽象处理。另一个抽象程度较低的模板框架Handlebars。Handlebars（基于与语言无关的流行模板预研Mustache）不会试图对HTML进行抽象：你编写的是带特殊标签的HTML，Handlebars可以借此插入内容。

为支持Handlebars，需要安装express3-handlerbars（尽管名字中是express3，但这个包在Express 4.0中也可以使用）。

* *执行：*

```shell
$ npm install --save express3-handlebars
```

* *在创建app之后，把下面代码加到meadowlark.js中：*

```js
var app = express();

//设置handlebars试图引擎
var handlebars = require('express3-handlebars')
	.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
```

[这段代码创建了一个试图引擎，并对Express进行了配置，将其作为默认的试图引擎。]

* *接下来创建views目录，在其中创建一个子目录layouts。*

[在开发网站时，每个页面上肯定有一定数量的HTML是相同的，或者非常接近。在每个页面上重复写这些代码不仅非常繁琐，还会导致潜在的维护困境：如果你想在每个页面上做一些修改，那就要修改所有文件。布局可以解决这个问题，它为网站上的所有页面提供了一个通用的框架。]

* *给网站创建一个模板。创建一个views/layouts/main.handlebars文件：*

```html
<!doctype html>
<html>
    <head>
        <title>Meadowlark Travel</title>
    </head>
    <body>
        {{{body}}}
    </body>
</html>
```

[{{{body}}}这个表达式会被每个视图自己的HTML取代。在创建Handlebars实例时，我们指明了默认布局（defaultLayout:'main'）。这就意味着除非特别指明，否则所有视图用的都是这个布局。]

* *接下来给首页创建视图页面，views/home.handlebars：*

```html
<h1>Welcome to Meadowlark Travel</h1>
```

* *关于页面，views/about.handlebars：*

```html
<h1>About Meadowlark Travel</h1>
```

* *未找到页面，views/404.handlebars：*

```html
<h1>404 - Not Found</h1>
```

* *服务器错误页面，views/500.handlebars：*

```html
<h1>500 - Server Error</h1>
```

* *将使用这些视图的新路由替换旧路由：*

```js
app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    res.render('about');
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
```

[注意，我们已经不再制定内容类型和状态码了：视图引擎默认会返回text/html的内容类型和200的状态码。在catch-all处理器（提供定制的404页面）以及500处理器中，我们必须明确设定状态码。]

### 视图和静态文件

**Express靠中间件处理静态文件和视图**。关于中间件会在后续章节有详细介绍。先只需了解中间件是一种模块化手段，它使得请求的处理更加容易。

**static中间件**可以将一个或多个目录指派为包含静态资源的目录。其中可放图片、CSS文件、客户端JavaScrpit文件之类的资源。

* *在项目目录下创建名为public的子目录，然后把static中间件加在所有路由之前：*

```js
app.use(express.static(__dirname + '/public'));
```

[static中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端。]

* *接下来在public下面创建一个子目录img，并把logo.png文件放在其中。*
* *修改一下布局文件，以便让我们的logo出现在所有页面上：*

```html
<body>
    <header><img src="/img/logo.jpg" alt="Meadowlark Travel Logo"></header>
    {{{body}}}
</body>
```

[<header>是HTML5中引入的元素，它出现在页面顶部，提供一些与内容有关的额外语义信息，比如logo、标题文本或导航等。]

### 视图中的动态内容

视图并不只是一种传递静态HTML的复杂方式（尽管它们当然能做到）。视图真正的强大之处在于它可以包含动态信息。

比如在关于页面上发送”虚拟幸运饼干“。

* *在meadowlark.js中定义一个幸运饼干数组：*

```js
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];
```

* *修改视图（/views/about.handlebars）以显示幸运饼干：*

```html
<h1>About Meadowlark Travel</h1>

<p>Your fortune for the day:</p>
<blockquote>
    {{fortune}}
</blockquote>
```

* *接下来修改路由/about，随机发送幸运饼干：*

```js
app.get('/about', function(req, res){
    var randomFortune = 
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});
```

