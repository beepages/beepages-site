const express = require("express"), app = express();
const fs = require("fs");

app.use(express.static("public"));
app.set('port', (process.env.PORT || 5000));

let routeData = fs.readFileSync(".route", "utf-8");
let routeLines = routeData.split("\n");

let latestDownload = "BeePages-v1.0.0.rar";

var Database = {
	load: function()
	{
		fs.readFile('./.db', 'utf8', function (err, data)
		{
			if (err) { return console.log(err); }

			Database.vals = JSON.parse(data); 
		})
	},
	vals: {},
	add: function(name)
	{
		console.log(name);
		Database.vals[name] = (Database.vals[name] === undefined ? 0 : Database.vals[name] + 1);
	},
	saveCount: function()
	{
		fs.writeFile("./.db", JSON.stringify(Database.vals, null, 2), function(err) {
			if(err) { return console.log(err); }
		}); 
	}
}

Database.load();
setInterval(Database.saveCount, 10 * 1000);

for(let i = 0; i < routeLines.length; i++)
{
	let spl = routeLines[i].split(" ");
	app.get('/' + spl[0].trim(), function(req, res)
	{
		let p = './public/' + spl[1].trim();
		if(fs.existsSync(p))
		{
			fs.readFile(p, 'utf8', function (err, data)
			{
				if (err) { throw err; }
				res.send(data.toString());
			});
		}
	});
}

app.get("/latest", function(req, res)
{
	res.download(__dirname + "/public/downloads/" + latestDownload);
	Database.add(latestDownload);
});

app.get("/dc", function(req, res)
{
	res.send("c" + Database.vals[latestDownload]);
});


app.listen(app.get('port'), function()
{
	console.log('PORT: ', app.get('port'));
});
