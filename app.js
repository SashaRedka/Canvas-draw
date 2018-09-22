var cnv = document.getElementById('canvas'),
	ctx    = cnv.getContext('2d'),
	isMouseDown = false,
	coords = []; //context

cnv.width = window.innerWidth; 
cnv.height = window.innerHeight; 

ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';

cnv.addEventListener('mousedown', function(){
	isMouseDown = true;
});

cnv.addEventListener('mouseup', function(){
	isMouseDown = false;
	ctx.beginPath();
	coords.push('mouseup');
});

ctx.lineWidth = 10;

cnv.addEventListener('mousemove', function (e){
	if(isMouseDown)
	{
		coords.push([e.clientX, e.clientY]);
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
		ctx.fill();	

		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	}
	
});


function save(){
	localStorage.setItem('coords', JSON.stringify(coords));
}

function clear(){
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, cnv.width, cnv.height);

	ctx.beginPath();
	ctx.fillStyle = 'red';
}

function replay(){
	var timer = setInterval(function() {
		if(!coords.length)
		{
			clearInterval(timer);
			ctx.beginPath();
			return;
		}

		var crd = coords.shift(),
				e = {
					clientX: crd['0'],
					clientY: crd['1']
				};

				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2);
				ctx.fill();	

				ctx.beginPath();
				ctx.moveTo(e.clientX, e.clientY);
	}, 20);
}

document.addEventListener('keydown', function(e) {
	
	if(e.keyCode == 83)
	{
		save();
		console.log('Saved');
	}

	if(e.keyCode == 82){
		console.log('Replayed...');
		coords = JSON.parse(localStorage.getItem('coords'));

		clear();
		replay();
	}

	if(e.keyCode == 67)
	{
		clear();
		console.log('Cleared');
	}

});
