function XMLRequest(sourceURL){
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET",sourceURL,false);
  xmlRequest.send();
  return (xmlRequest.responseXML);
}
function clearResultDiv(divID){
  $("#"+divID).empty();
}
function nodeListToString(nodeList){
  string = "";
  for (var i=0;i<nodeList.length;i++) {
    string = string.concat(nodeList[i].childNodes[0].nodeValue);
    if (i+1!=nodeList.length){
    string = string.concat(", ");
    }
  }
  return string;
}
function pad2(number){
return ((number<10)?"0":"") + number;
}

function writeTable(divToWrite, xmlNodeList) {
  divToWrite.innerHTML="<table class=\"table\"></table>";
  tableToInsert = divToWrite.childNodes[0];
  tableBody = tableToInsert.createTBody();
  tableHead = tableToInsert.createTHead();
  headRow = tableHead.insertRow(-1);
  numHead = headRow.insertCell(0);
  numHead.innerHTML="<th>#</th>";
  if (xmlNodeList.length==0){
    cell = headRow.insertCell(1);
    cell.outerHTML="<th>This artist doesn't have any releases in the database.</th>";
  }
  else if (xmlNodeList[0].nodeName == "artist"){
    artistHead = headRow.insertCell(1);
    artistHead.outerHTML="<th>Artist</th>";
    aliasHead = headRow.insertCell(2);
    aliasHead.outerHTML="<th>Aliases</th>";
  } else if (xmlNodeList[0].nodeName == "release-group"){
    albumHead = headRow.insertCell(1);
    albumHead.outerHTML="<th>Album/Single</th>";
    dateHead = headRow.insertCell(2);
    dateHead.outerHTML="<th>Release Date</th>";
  } else if (xmlNodeList[0].nodeName == "release") {
    releaseHead = headRow.insertCell(1);
    releaseHead.outerHTML="<th>Release Version</th>";
    releaseDateHead = headRow.insertCell(2);
    releaseDateHead.outerHTML="<th>Release Date</th>";
  } else if (xmlNodeList[0].nodeName == "track") {
    trackHead = headRow.insertCell(1);
    trackHead.outerHTML="<th>Track</th>";
    lengthHead = headRow.insertCell(2);
    lengthHead.outerHTML="<th>Length</th>";
  }
  for (var i=1;i<=xmlNodeList.length;i++) {
    item = xmlNodeList[i-1];
    row=tableBody.insertRow(-1);
    cellNum = row.insertCell(0);
    cellNum.innerHTML=i;
    if (item.nodeName == "artist"){
      cellArtist = row.insertCell(1);
      if (item.getElementsByTagName("disambiguation").length != 0){
      cellArtist.innerHTML="<a onclick=\"mbQueryAlbums(this.id)\" id=\""+item.getAttribute("id")+"\">"+item.childNodes[0].childNodes[0].nodeValue+"</a> ("+item.getElementsByTagName("disambiguation")[0].childNodes[0].nodeValue+")";
      } else {
      cellArtist.innerHTML="<a onclick=\"mbQueryAlbums(this.id)\" id=\""+item.getAttribute("id")+"\">"+item.childNodes[0].childNodes[0].nodeValue+"</a>";
      }
      cellAlias = row.insertCell(2);
      cellAlias.innerHTML=nodeListToString(item.getElementsByTagName("alias"));
    }
    else if (item.nodeName == "release-group"){
      cellAlbum = row.insertCell(1);
      cellAlbum.innerHTML="<a onclick=\"mbQueryReleases(this.id)\" id=\""+item.getAttribute("id")+"\">"+item.childNodes[0].childNodes[0].nodeValue+"</a> ("+item.getAttribute("type")+")";
      var cellDate = row.insertCell(2);
      if (item.getElementsByTagName("first-release-date")[0].childNodes[0] === undefined){
        cellDate.innerHTML="";
      } else {
        cellDate.innerHTML=item.getElementsByTagName("first-release-date")[0].childNodes[0].nodeValue;
      }
    }
    else if (item.nodeName == "release"){
      cellRelease = row.insertCell(1);
      cellRelease.innerHTML="<a onclick=\"mbQueryTracks(this.id)\" id=\""+item.getAttribute("id")+"\">"+item.getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a> ("+item.getElementsByTagName("country")[0].childNodes[0].nodeValue+")";
      var cellDate = row.insertCell(2);
      if (item.getElementsByTagName("date")[0] === undefined){
      cellDate.innerHTML="";
      } else {
      cellDate.innerHTML=item.getElementsByTagName("date")[0].childNodes[0].nodeValue;
      }
    }
    else if (item.nodeName == "track"){
      cellTrack = row.insertCell(1);
      cellTrack.innerHTML="<a onclick=\"function(this.id)\" id=\""+item.getAttribute("id")+"\">"+item.getElementsByTagName("title")[0].childNodes[0].nodeValue+"</a>";
      cellLength = row.insertCell(2);
      length = item.getElementsByTagName("length")[0].childNodes[0].nodeValue;
      seconds = length/1000;
      minutes = seconds/60;
      minutes= Math.floor(minutes);
      remainderSeconds = pad2(Math.round(seconds%60));
      cellLength.innerHTML=minutes+":"+remainderSeconds;
    }
  }
}

function mbQueryArtist(form){
clearResultDiv("artistResults");
clearResultDiv("albumResults");
clearResultDiv("releaseResults");
clearResultDiv("songResults");
var artistInput = form.artistInput.value;
artistResults = XMLRequest("http://musicbrainz.org/ws/2/artist?limit=10&query="+artistInput);
divArtistResults = document.getElementById("artistResults");
artistElements = artistResults.getElementsByTagName("artist");
writeTable(divArtistResults,artistElements);
}

function mbQueryAlbums(artistID){
artistMBID = artistID;
clearResultDiv("albumResults");
clearResultDiv("releaseResults");
clearResultDiv("songResults");
albumResults = XMLRequest("http://musicbrainz.org/ws/2/artist/"+artistMBID+"?inc=release-groups");
divAlbumResults = document.getElementById("albumResults");
albumElements = albumResults.getElementsByTagName("release-group");
writeTable(divAlbumResults,albumElements);
}

function mbQueryReleases(albumID){
clearResultDiv("releaseResults");
clearResultDiv("songResults");
releaseResults = XMLRequest("http://musicbrainz.org/ws/2/release-group/"+albumID+"?inc=releases");
divReleaseResults = document.getElementById("releaseResults");
releaseElements = releaseResults.getElementsByTagName("release");
writeTable(divReleaseResults,releaseElements);
}

function mbQueryTracks(releaseID){
albumMBID = releaseID;
clearResultDiv("songResults");
trackResults = XMLRequest("http://musicbrainz.org/ws/2/release/"+albumMBID+"?inc=recordings");
divSongResults = document.getElementById("songResults");
trackElements = trackResults.getElementsByTagName("track");
writeTable(divSongResults,trackElements);
}
