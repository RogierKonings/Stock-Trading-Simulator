const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);

const index = require('./routes/index');
const load = require('./routes/api/load');
const order = require('./routes/api/order');
const stock = require('./routes/api/stock');
const user = require('./routes/api/user');

/**
 * Socket.io - for future implementation, sending the stock information will contain less overhead
 */
const io = require('socket.io')(server);
app.set('socketio', io);
io.sockets.on('connection', function(socket) {
    setInterval(function() {
        socket.emit('updateStockList', StockListStorage.getStockList());
    }, 5000);
    // Disconnect
    socket.on('disconnect', function(data) {
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

app.use('/', index);
app.use('/load', load);
app.use('/order', order);
app.use('/stock', stock);
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server.listen(process.env.PORT || 1337, function () {
    console.log('Listening on port: ' + 1337);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
