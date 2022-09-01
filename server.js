/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs= require('express-handlebars');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/* ---------------------- Instancia de servidor ----------------------*/
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//engine plantilla
app.engine('hbs', exphbs.engine ({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs'
}))
//motor plantilla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//BD
const MENSAJE_DB=[];
const PRODUCTO_DB=[
    {
      "nombre": "Escuadra",
      "precio": "123.45",
      "thumbail": "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-6/64/ArtificialIntelligence8-128.png"
    },
    {
      "nombre": "Calculadora",
      "precio": 234.56,
      "thumbail": "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-6/64/ArtificialIntelligence24-128.png"
    },
    {
      "nombre": "Globo Terraqueo",
      "precio": 345.67,
      "thumbail": "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-6/64/ArtificialIntelligence18-128.png"
    }
  ];
  //Rutas
  
  
/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './views/layouts', 'main.hbs'));
   //res.render('productos',{PRODUCTO_DB});
});


/* ---------------------- Servidor ----------------------*/
const PORT = 3000;
const server = http.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket)=>{

    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-producto', {PRODUCTO_DB});

    socket.on('from-client-producto', producto => {
      
        PRODUCTO_DB.push(producto);
        io.sockets.emit('from-server-producto', {PRODUCTO_DB});
    
    });
    socket.on('from-client-mensaje', mensaje => {
      
      MENSAJE_DB.push(mensaje);
      io.sockets.emit('from-server-mensaje', {MENSAJE_DB});
  
  });

})
