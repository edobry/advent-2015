var fs = require("fs"),
    byline = require("byline");

var area = 0;

var parse = function(line) {
    console.log(line);
    return line.split('x').map(x => parseInt(x, 10));
};

var isLast = (i, arr) => i == arr.length - 1;

var surfaceArea = function(box) {
    return 2 * box.reduce((total, dim, i, arr) =>
        total + arr.slice(i+1)
            .map(x => dim * x)
            .reduce((total, x) => total + x, 0), 0);
};

var maxOf_i = arr => arr.reduce((max_i, x, i) => x > arr[max_i] ? i : max_i, 0);

var smallestSide = function(box) {
    return box.reduce((smallest, dim) => {
        var secondSmallest = maxOf_i(smallest);

        if(dim < smallest[secondSmallest])
            smallest[secondSmallest] = dim;

        return smallest;
    }, [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])
    .reduce((total, dim) => total *= dim, 1);
};

var input = byline(fs.createReadStream("input", { encoding: "utf8" }));
input.on("data", function(line) {
    var present = parse(line);
    area += surfaceArea(present) + smallestSide(present);
    console.log(area);
});

input.on("end", function() {
    console.log("Total area:", area);
});
