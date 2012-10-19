function XMLRequest(sourceURL){
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("GET",sourceURL,false);
  xmlRequest.send();
  return (xmlRequest.responseXML);
}

function clearResultDiv(divID){
  $("#"+divID).empty();
}

//query MBDB
function mbQueryArtist(form){
clearResultDiv("artistResults");
var artistInput = form.artistInput.value;
var artistResults = XMLRequest("http://musicbrainz.org/ws/2/artist?query="+artistInput);
for (var i=1;i<=artistResults.getElementsByTagName("artist").length;i++){
$("#artistResults").append("<p>"+i+" "+artistResults.getElementsByTagName("artist")[i-1].childNodes[0].childNodes[0].nodeValue+"</p>");
}
}
/*

xmlRequest.open("GET","http://musicbrainz.org/ws/2/artist?query="+artistQuery,false);
xmlRequest.send();
xmlDoc = xmlRequest.responseXML;

//display query results

//if not found, ask again

//store name of artist
//copy MBID of artist
var MBIDartist = whatevs

//query MBDB for artist inc=recordings+release-groups
xmlRequest.open("GET","http://musicbrainz.org/ws/2/artist/"+MBIDartist+"?inc=recordings+release-group+-release-rels",false);
xmlRequest.send();
xmlDoc = xmlRequest.responseXML;

//copy MBID of release-group
var MBIDalbum = whatevs

//query MBDB for release-group inc=releases
xmlRequest.open("GET","http://musicbrainz.org/ws/2/release-group/"+MBIDalbum+"?inc=releases",false);
xmlRequest.send();
xmlDoc = xmlRequest.responseXML;

//store name of release
//copy MBID of release
var MBIDrelease = whatevs

//query MBDB for release inc=recordings
xmlRequest.open("GET","http://musicbrainz.org/ws/2/release/"+MBIDrelease+"?inc=recordings",false);
xmlRequest.send();
xmlDoc = xmlRequest.responseXML;

//store name of recording
//copy MBID of recording
var MBIDsong = whatevs

//write name of artist, release, recording
    //to website
    //to show table

//link artist, release, recording to MBIDs
*/
