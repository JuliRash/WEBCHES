$function(){

	$('#search').keyup(function(){
		$.ajax({
			type: "POST"
			url: "/cocoa/search" 
		})
	})
}