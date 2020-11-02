const helmet = require('helmet')
const express = require('express');
const app = express();

// app.use(helmet({
//   frameguard: {
//     action: 'deny'
//   }
// }))
app.use(express.static(__dirname));

app.get('/api', (req, res) => {
  res.send(`<h1>Hello World</h1><script>try{

    　　top.location.hostname;
    
    　　if (top.location.hostname != window.location.hostname) {
    
    　　　　top.location.href =window.location.href;
    
    　　}
    
    }
    
    catch(e){
    
    　　top.location.href = window.location.href;
    
    }</script>`);
});

app.listen(3000);