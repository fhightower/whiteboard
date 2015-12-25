var static = require('node-static');
var file = new static.Server('./UI');

//Define
var whiteboard = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        file.serve(request, response);
    }).resume();
});

var io = require('socket.io')(whiteboard);

whiteboard.listen(process.env.PORT || 9999);
var activeBoards = {};

//socket connection

io.on('connection', function(socket) {

    socket.on('create_board', function(data) {
        var board = gen_id();

        activeBoards[board] = {
            users: []
        };
        var user = {
            id: activeBoards[board].users.length + 1,
            name: data.name,
            is_admin: true,
            socket_id: socket.id
        };

        activeBoards[board].users.push(user);

        socket.join(board);

        socket.emit('connected_to_board', {
            board_id: board,
            user: user,
            socket_id: socket.id
        });

        io.to(board).emit('user_connected', activeBoards[board]);
    });

    socket.on('join_board', function(data) {
        if (data.board_id) {
            activeBoards[data.board_id] = {
                users: []
            };

            var user = {
                id: activeBoards[data.board_id].users.length + 1,
                name: data.name,
                socket_id: socket.id
            };

            activeBoards[data.board_id].users.push(user);

            socket.join(data.board_id);
            io.to(data.board_id).emit('user_connected', activeBoards[data.board_id]);
            io.to(data.board_id).emit('user_joined', data.name);


            socket.emit('connected_to_board', {
                board_id: data.board_id,
                user: user,
                socket_id:socket.id
            });
        }
         console.log("user joined-"+user.name+" @ "+data.board_id+"socid-"+socket.id);
    });

    socket.on('draw', function(data) {
        console.log('draw', data);
         if (data.room) {
            io.to(data.room).emit('draw', data);
        }
    });

    socket.on('clear_page', function(data) {
        console.log("got clear page request");
        if (data.room) {
            io.to(data.room).emit('clear_page', data);
        }
    });

    //chat
    socket.on('chat',function(data){
        console.log('chat',data);
         if(data.room){
            io.to(data.room).emit('chat',data);
         }
    });
});