window.onload = function()
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            settext(xmlHttp.responseText.substring(1));
    }
    xmlHttp.open("GET", window.location.origin + "/dc", true);
    xmlHttp.send(null);
}

function settext(text)
{
    document.getElementById("zip-download").innerHTML += " (" + text + " times downloaded)";
}