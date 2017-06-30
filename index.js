const express = require("express"), app = express();
const fs = require("fs");

app.use(express.static("public"));
app.set('port', (process.env.PORT || 5000));

let routeData = fs.readFileSync(".route", "utf-8");
let routeLines = routeData.split("\n");

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

app.listen(app.get('port'), function()
{
	console.log('PORT: ', app.get('port'));
});
