// Dot
function Dot(centerX, centerY, minRadius, maxRadius, radiusSteps, canvasContext) {
	var that = this;
	this.centerX = centerX;
	this.centerY = centerY;
	this.minRadius = minRadius;
	this.maxRadius = maxRadius;
	this.radiusSteps = radiusSteps;
	this.canvasContext = canvasContext;
	this.radiusStep = ((maxRadius - minRadius) / radiusSteps);
	this.currentRadius = minRadius;
	
	// Draw the dot on the canvas
	this.draw = function() {
		this.canvasContext.beginPath();
		this.canvasContext.arc(this.centerX,
			this.centerY,
			this.currentRadius,
			0,
			2 * Math.PI,
			false);
		this.canvasContext.fill();
		this.canvasContext.closePath();
		this.canvasContext.stroke();
	};
	
	// Change the currentRadius of the dot
	this.grow = function() {
		this.currentRadius += this.radiusStep;
		
		if (this.currentRadius > this.maxRadius) {
			this.currentRadius = this.minRadius;
		}
	};
	
	// Return if the mouseX and mouseY points are inside the dot's maxRadius
	this.isInsideMaxRadius = function(mouseX, mouseY) {
		return ((Math.pow(mouseX - this.centerX, 2) + Math.pow(mouseY - this.centerY, 2)) <= Math.pow(this.maxRadius, 2));
	};
}

// Canvas
function Canvas(elementId, horizintalDotCount, verticalDotCount, minRadius, maxRadius, radiusSteps) {
	var that = this;
	this.elementId = elementId;
	this.horizintalDotCount = horizintalDotCount;
	this.verticalDotCount = verticalDotCount;
	this.maxRadius = maxRadius;
	this.minRadius = minRadius;
	this.radiusSteps = radiusSteps;
	
	this.canvas = document.getElementById(elementId);
	this.canvas.width = (horizintalDotCount + 1) * ((2 * maxRadius) / Math.sqrt(2)) + (2 * maxRadius);
	this.canvas.height = (verticalDotCount + 1) * ((2 * maxRadius) / Math.sqrt(2)) + (2 * maxRadius);
	
	this.canvasContext = this.canvas.getContext("2d");
	this.dots = new Array();
	this.dotOffset = (2 * maxRadius) / Math.sqrt(2);
	
	for (i = 0; i < horizintalDotCount; i++) {
		for (j = 0; j < verticalDotCount; j++) {
			this.dots.push(new Dot(this.maxRadius + ((i + 1) * this.dotOffset), this.maxRadius + ((j + 1) * this.dotOffset), this.minRadius, this.maxRadius, this.radiusSteps, this.canvasContext));
		}
	}
	
	// Draw the dots on the canvas
	this.draw = function() {
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		for (i in this.dots) {
			this.dots[i].draw();
		}
	}
	
	// Save the canvas as SVG image
	this.saveAsSVG = function() {
		var svgContent = "";
		var fileName = "canvas.svg"
		
		// Generate the contents of the SVG file by iterating over the dots on the canvas
		svgContent += "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n";
		svgContent += "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" " +
			"height=\"" + that.canvas.height + "px\" width=\"" + that.canvas.width + "px\">\n";
		for (i in that.dots) {
			svgContent += "\t<circle cx=\"" + that.dots[i].centerX + "px\" cy=\"" +
				that.dots[i].centerY + "px\" r=\"" + that.dots[i].currentRadius +
				"px\" fill=\"black\" />\n";
		}
		svgContent += "</svg>\n";
		
		// Create a blob from the generated SVG image
		var svgAsBlob = new Blob([svgContent], {type: "octet/stream"});
		
		// Create a hidden download link for the created blob and click it
		var svgLink = document.createElement("a");
		svgLink.download = fileName;
		svgLink.href = window.URL.createObjectURL(svgAsBlob);
		svgLink.style.display = "none";
		document.body.appendChild(svgLink);
		svgLink.click();
		document.body.removeChild(svgLink);
		//window.URL.revokeObjectURL(svgLink.href);
	};
	
	// Save the canvas as PNG image
	this.saveAsPNG = function() {
		var fileName = "canvas.png"
		
		// Get PNG data URL
		var pngDataURL = that.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		
		// Create a hidden download link for the data URL and click it
		var pngLink = document.createElement("a");
		pngLink.download = fileName;
		pngLink.href = pngDataURL;
		pngLink.style.display = "none";
		document.body.appendChild(pngLink);
		pngLink.click();
		document.body.removeChild(pngLink);
		window.URL.revokeObjectURL(pngLink.href);
	};
	
	// Return the position of the mouse cursor on the canvas on any event
	this.getMousePosition = function(event) {
		var boundingRectangle = that.canvas.getBoundingClientRect();
		var mouseX = event.clientX - boundingRectangle.left;
		var mouseY = event.clientY - boundingRectangle.top;
		
		return {"mouseX": mouseX, "mouseY": mouseY};
	};
	
	// Change the currentRadius of the dots if they are clicked
	this.onClick = function(event) {
		var mousePosition = that.getMousePosition(event);
		
		for (i in that.dots) {
			var insideDot = that.dots[i].isInsideMaxRadius(mousePosition.mouseX, mousePosition.mouseY);
			
			if (insideDot) {
				that.dots[i].grow();
			}
		}
		
		that.draw();
	};
	
	this.canvas.addEventListener("click", this.onClick, false);
	
	this.draw();
}

$(document).ready(function() {
	var canvas = new Canvas("canvas", 24, 24, 1, 16, 5);
	var svgButton = document.getElementById("svgButton");
	var pngButton = document.getElementById("pngButton");
	
	$("#wrapper").css({
		"position": "absolute",
		"left": "50%",
		"top": "50%",
		"margin-left": -$("#canvas").outerWidth() / 2,
		"margin-top": -$("#wrapper").outerHeight() / 2
	});
	
	pngButton.addEventListener("click", canvas.saveAsPNG, false);
	svgButton.addEventListener("click", canvas.saveAsSVG, false);
});
