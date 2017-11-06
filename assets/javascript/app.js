$(document).ready(function(){

	var comicChar = [ "Thor","spiderman","ironman","captain america","pikachu","goku","one punch man" ];

	
	buttonDisplay();


	function buttonDisplay (){

		$("#button-placement").empty();

		for(var i=0; i < comicChar.length;i++){
			var newBtn = $("<button>");
			newBtn.text(comicChar[i]);

			var string = comicChar[i].replace(/\s/g,"+");
			newBtn.attr("data-type",string);
			newBtn.attr("class", "btn");

			$("#button-placement").append(newBtn);
		};
	};

	$("#add-button").on("click",function(){
		var newbutton = $("#text-field").val().trim();
		console.log(newbutton);
		
		if( comicChar.indexOf(newbutton) === -1){
		comicChar.push(newbutton);
		buttonDisplay();
		};
		
	});

	// $(document).on("click",".gif",function()

	$(document).on("click",".btn",function(){
		var searchTerm = $(this).text();
		console.log(searchTerm);

		var apiKey = "&api_key=oJM25RNGQWEytmY1sp1UGYLzozNlVv4K&limit=10";
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+searchTerm+apiKey;

		$.ajax({
			url: queryUrl,
			method: "GET",
		}).done(function(results){
			console.log(results);
			console.log(results.data[0].rating);
			console.log("still" + results.data[0].images.fixed_width_still.url);
			console.log("ani" +results.data[0].images.fixed_width.url);
			
			for (var i=0;i<10;i++){

			var newDiv = $("<div>");
			var p = $("<span>");
			var showImg = $("<img>");
			var rating = "Rating: "+ results.data[i].rating;
			var stillImg = results.data[i].images.fixed_width_still.url;
			var aniImg = results.data[i].images.fixed_width.url;

			newDiv.attr("class","box");

			p.text(rating);

			showImg.attr("src",stillImg);
			showImg.attr("class","gif");
			showImg.attr("still",stillImg);
			showImg.attr("animate",aniImg);
			showImg.attr("state","still");

			newDiv.append(p, showImg)

			if(i%2==0){
			$("#gif-upload1").prepend(newDiv);
			}
			else{
			$("#gif-upload2").prepend(newDiv)	
			}

			};

		});


	});

	$(document).on("click",".gif",function(){

		console.log("this worked");

		var currentState = $(this).attr("state");
		console.log($(this).attr("state"));

		if( currentState === "still"){
			var change = $(this).attr("animate");

			$(this).attr("src",change);
			$(this).attr("state","animate")
		}
		else{
			var change = $(this).attr("still");
			$(this).attr("src",change);
			$(this).attr("state","still")
		}
	});



});