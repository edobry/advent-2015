var fs = require("fs");

var input = fs.createReadStream("input", { encoding: "utf8" });

var val = {
    '(': 1,
    ')': -1
};

var height = 0;
var pos = 1;

input.on("readable", function() {
    var symbol;
    for(; null !== (symbol = input.read(1)); pos++) {
        height += val[symbol];
        if(height < 0) {
            input.destroy();
            break;
        }
    }
});

input.on("close", function() {
    console.log("Pos:", pos);
});
