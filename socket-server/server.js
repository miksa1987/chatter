const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
  
const people = {};
const sockmap = {};
const messageque = {};
//const stringHash = require('string-hash');

// Attach session
app.use(session);

io.on('connection', (socket) => { 
	socket.on("join", (nick,room) => {
		socket.join(room);
		//const id=stringHash(nick);
		if(!people.hasOwnProperty(room)){
			people[room]={};
		}
		
		people[room][socket.id] = {
			nick : nick,
			id : socket.id
		};
		sockmap[socket.id] = {
			nick : nick,
			room : room
		}
		if(messageque.hasOwnProperty(room)){
			for(i=0;i<messageque[room].length;i++){
				io.to(room).emit('message que', messageque[room][i].nick,messageque[room][i].msg);
			}
		}
		if(room=='')
			socket.emit("update", "You have connected to the default room.");
		else	
		socket.emit("update", `You have connected to room ${room}.`);
		socket.emit("people-list", people[room]);
		socket.to(room).broadcast.emit("add-person",nick,socket.id);
		console.log(nick);
		socket.to(room).broadcast.emit("update", `${nick} has come online. `);
	});

	socket.on('chat message', (msg,room) => {
		io.to(room).emit('chat message', people[room][socket.id].nick,msg);
		if(!messageque.hasOwnProperty(room)){
			messageque[room]=[]
		}
		messageque[room].push({
			nick : people[room][socket.id].nick,
			msg : msg
		})
		if(messageque[room].length>50)
			messageque[room].shift()
	});

	socket.on('disconnect', () => {
		if(sockmap[socket.id]){
			const room=sockmap[socket.id].room;
			socket.to(room).broadcast.emit("update", `${sockmap[socket.id].nick} has disconnected. `);
			io.emit("remove-person",socket.id);
			delete people[room][socket.id];
			delete sockmap[socket.id];	
		}	
	});
});

const port = process.env.PORT || 8081;

http.listen(port, () => {
	console.log(`http://localhost:${port}`);
});