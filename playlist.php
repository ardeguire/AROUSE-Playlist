<?php include 'inc/html-head'; ?>
<!-- javascript includes -->
<script type="text/javascript" src="js/playlist.js"></script>
</head>
<body style="margin:2%;">
<div class="container">
<div class="row">
<div class="span6" id="searchFrame"><!-- eventually to be moved to external file -->
<h2>Playlist Entry</h2>
<form class="form-horizontal">
<div class="control-group">
<label class="control-label" for="artistInput">Enter an artist</label>
<div class="controls">
<input type="text" id="artistInput"/>
<button type="button" class="btn" onclick="mbQueryArtist(this.form)" id="artistInput">Search</button>
</div>
</div>
</form>
<div id="artistResults">
<p>Artist Results</p>
</div>
<div id="albumResults">
Album Results
</div>
<div id="releaseResults">
Release Results
</div>
<div id="songResults">
Song Results
</div>
</div>
<div class="span6" id="displayFrame"><!-- eventually to be moved to external file -->
<h2>Display</h2>
<table class="table"><!-- eventually to be pulled from show DB -->
<tr>
<th>#</th>
<th>Artist</th>
<th>Album</th>
<th>Song</th>
</tr>
<tr>
<td>1</td>
<td><a href=#MBIDartist>artist</a></td>
<td><a href=#MBIDrelease>release</td>
<td><a href=#MBIDrecording>recording</td>
<tr>
</table>
</div>
</div>
</div>
</body>
</html>
