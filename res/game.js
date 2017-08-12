document.getElementById("myid").readOnly=true;
var you;
var conn;
var erx=0;

function CONNECT(){
	pollPeers();
	if(you&&conn)return;
	waitForPeers();
}

function waitForPeers(){
	for(i = 0; i < 25;i++){
		genPeerObj("wait"+i);
		if(you)break;
	}
	if(you)return;
	error("All Waits Are Taken -- Please Try Autoconecting Again");
}



function pollPeers(){
	
	genSelf();
	
	if(!you){
		error("Unknown Error!!");
		return;
	}
	
	var i;
	for(i = 0; i < 25;i++){
		connectToPeer();
		if(conn)break;
	}
	
}

function genTimer(){
	if(!you&&!erx)
		setTimeout(genTimer,40);
}

function genSelf(){
	you = new Peer({key: 'zrmyjhtegr6swcdi'});
	
	you.on('error', error);
	you.on('open', opened);
	you.on('close', exited);
}

function connectToPeer(peerId){
	
	conn = peer.connect(peerId);
	
}

function genPeerObj(idx){
//function createRandomPeer(){
	var peer = new Peer(idx,{key: 'zrmyjhtegr6swcdi'});
	erx=0;
	peer.on('error', error);
	peer.on('open', opened);
	
	genTimer();
	
	if(peer)
		you=peer;
	
}

function error(err){
	console.log("!!PEER ERROR: "+err);
		document.getElementById("myid").value=""+err;
		erx=1;
}


function opened(id){
	console.log('Your peer ID is: ' + id);
		//document.getElementById("myid").textContent="My ID: "+id;
		document.getElementById("myid").value=""+id;
}

function exited(nrr){
	console.log('Your peer exited: ' + nrr);
		you.destroy();
		document.getElementById("myid").value="";
}

/*
var conn = peer.connect('another-peers-id');
conn.on('open', function(){
  conn.send('hi!');
});*/

