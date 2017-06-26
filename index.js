const express = require("express"), app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static("public"));
const fs = require("fs");

let routeData = fs.readFileSync(".route", "utf-8");
let routeLines = routeData.split("\n");
for(let i = 0; i < routeLines.length; i++)
{
	let spl = routeLines[i].split(" ");
	app.get('/' + spl[0].trim(), function(req, res)
	{
		fs.readFile('./public/' + spl[1].trim(), 'utf8', function (err, data)
		{
			if (err) {
				throw err;
			}
			res.send(data.toString());
		});
	});
}

app.listen(app.get('port'), function()
{
	console.log('PORT: ', app.get('port'));
});