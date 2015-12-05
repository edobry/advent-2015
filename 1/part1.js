var fs = require("fs");

var input = fs.createReadStream("input", { encoding: "utf8" });

var val = {
    '(': 1,
    ')': -1
};

var height = 0;

input.on("readable", function() {
    var symbol;
    while (null !== (symbol = input.read(1))) {
        height += val[symbol];
    }
});

input.on("end", function() {
    console.log("Floor:", height);
});
