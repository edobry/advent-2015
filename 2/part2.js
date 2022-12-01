var fs = require("fs"),
    byline = require("byline");

var parse = line => line.split('x').map(x => parseInt(x, 10));

var isLast = (i, arr) => i == arr.length - 1;

var maxOf_i = arr => arr.reduce((max_i, x, i) => x > arr[max_i] ? i : max_i, 0);

var twoSmallest = tuple => tuple.reduce((smallest, val) => {
        var secondSmallest = maxOf_i(smallest);

        if(val < smallest[secondSmallest])
            smallest[secondSmallest] = val;

        return smallest;
    }, [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);

var duplicate = x => [x,x];

var flatten = (arr, el) => arr.concat(...el);

var multiplying = (total, val) => total * val;
var summing = (total, val) => total + val;

var smallestSide_perimeter = function(box) {
    return twoSmallest(box).map(duplicate).reduce(flatten).reduce(summing, 0);
};

var volume = box => box.reduce(multiplying, 1);

var input = byline(fs.createReadStream("input", { encoding: "utf8" }));
input.on("data", function(line) {
    var present = parse(line);

    area += volume(present) + smallestSide_perimeter(present);
});

input.on("end", function() {
    console.log("Total area:", area);
});
