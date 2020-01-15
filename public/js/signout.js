$(document).ready(function () {
	$("#signoutBtn").click(function (e) {
		e.preventDefault();
		var data = {};
		$.post("/api/auth/signout", data,
			function (resp, textStatus, jqXHR) {
				alert(JSON.stringify(resp));
				if (resp.success) {
					window.location.replace("/");
				}
			}
		);
	});
});