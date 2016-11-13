var five = require('johnny-five');
var fs = require('fs');

var logStream = fs.createWriteStream('log.txt', {'flags': 'a'});
var board = new five.Board();

board.on('ready', function() {
  // This requires OneWire support using the ConfigurableFirmata
  var thermometer = new five.Thermometer({
    controller: 'DS18B20',
    pin: 2,
    freq: 3600000
  });

  thermometer.on('data', function() {
    logStream.write(new Date().toLocaleString() + ' - ' + this.celsius + '°C\n');
  });
});

board.on('exit', function() {
    logStream.end('=======================================================\n');
});
