
exports.initialize = function(server, console, io) {


	var sio = io.listen(server);
	sio.set("transports", ["xhr-polling"]);
	sio.set("polling duration", 1);

	/**MongoDB**/
	this.collection;
	var mongo = require('mongodb');
	var mongoserver = new mongo.Server("localhost", 27017);
	var client = new mongo.Db('jpm_test', mongoserver);

	client.open(function (err, client) {
		if (err) { throw err; }
		collection = new mongo.Collection(client, 'transactions');
		client.close();
	});

	/**MongoDB**/

	sio.sockets.on("connection", function (socket, collection) {
		var myVar = setInterval(function(){myTimer(socket)},1000);
		console.log('Connection to Sockets!');

		socket.on("TransactionEvent", function(data) {
			console.log('TransactionEvent!');
			storeTransaction(data);
		});
	});

	function storeTransaction(data){
		var writeResult;
		/**MongoDB**/
		client.open(function (err, client) {
			if (err) { throw err; }
			writeResult = collection.insert(data);
			client.close();
		});
		/**MongoDB**/
		console.log(writeResult);
	};

	sio.sockets.on("disconnect", function () {
		console.log('Connection Lost!');
	});

};

function myTimer(socket) {
	var rNumLow = Math.round(Math.random() * (85 - 81) + 81);
	var rNumHigh = Math.round(Math.random() * (87 - 85) + 85);
	socket.broadcast.send(JSON.stringify({type: 'USD-GBP', rlow: rNumLow, rhigh: rNumHigh}));
	//console.log("Sending figures Pair USD-GBP: " +rNumLow +" " +rNumHigh);

    var rNumLow = Math.round(Math.random() * (75 - 71) + 71);
    var rNumHigh = Math.round(Math.random() * (77 - 75) + 75);
    socket.broadcast.send(JSON.stringify({type: 'USD-EUR', rlow: rNumLow, rhigh: rNumHigh}));
    //console.log("Sending figures Pair USD-EUR: " +rNumLow +" " +rNumHigh);

    var rNumLow = Math.round(Math.random() * (55 - 51) + 51);
    var rNumHigh = Math.round(Math.random() * (57 - 55) + 55);
    socket.broadcast.send(JSON.stringify({type: 'JPY-GBP', rlow: rNumLow, rhigh: rNumHigh}));
    //console.log("Sending figures Pair JPY-GBP: " +rNumLow +" " +rNumHigh);

	var rNumLow = Math.round(Math.random() * (85 - 81) + 81);
	var rNumHigh = Math.round(Math.random() * (87 - 85) + 85);
	socket.broadcast.send(JSON.stringify({type: 'JPY-USD', rlow: rNumLow, rhigh: rNumHigh}));
	//console.log("Sending figures Pair JPY-USD: " +rNumLow +" " +rNumHigh);

	var rNumLow = Math.round(Math.random() * (75 - 71) + 71);
	var rNumHigh = Math.round(Math.random() * (77 - 75) + 75);
	socket.broadcast.send(JSON.stringify({type: 'AUD-CAD', rlow: rNumLow, rhigh: rNumHigh}));
	//console.log("Sending figures Pair AUD-CAD: " +rNumLow +" " +rNumHigh);

	var rNumLow = Math.round(Math.random() * (55 - 51) + 51);
	var rNumHigh = Math.round(Math.random() * (57 - 55) + 55);
	socket.broadcast.send(JSON.stringify({type: 'CHF-GBP', rlow: rNumLow, rhigh: rNumHigh}));
	//console.log("Sending figures Pair CHF-GBP: " +rNumLow +" " +rNumHigh);

};

