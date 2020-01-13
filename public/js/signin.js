$(document).ready(function () {
	$("form").submit(function (e) {
		e.preventDefault();
		var data = {
			username: $("#username").val(),
			password: $("#password").val()
		}
		$.post("/api/auth/signin", data,
			function (resp, textStatus, jqXHR) {
				alert(JSON.stringify(resp));
			}
		);
	});
});