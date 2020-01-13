$(document).ready(function () {
	$("form").submit(function (e) {
		e.preventDefault();
		if (checkPasswords()) {
			var data = {
				username: $("#username").val(),
				password: $("#password").val()
			}
			$.post("/api/auth/signup", data,
				function (resp, textStatus, jqXHR) {
					alert(JSON.stringify(resp));
				}
			);
		}
	});
});

function checkPasswords() {
	if ($("#password") !== undefined && $("#retypePass") !== undefined) {
		if ($("#password").val() == $("#retypePass").val()) {
			return true;
		}
		return false;
	}
	console.log("Check Ids");
	return false;
}