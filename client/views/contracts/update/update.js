var pageSession = new ReactiveDict();

Template.ContractsUpdate.onCreated(function() {
	
});

Template.ContractsUpdate.onDestroyed(function() {
	
});

Template.ContractsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContractsUpdate.events({
	
});

Template.ContractsUpdate.helpers({
	
});

Template.ContractsUpdateForm.onCreated(function() {
	
});

Template.ContractsUpdateForm.onDestroyed(function() {
	
});

Template.ContractsUpdateForm.onRendered(function() {
	

	pageSession.set("contractsUpdateFormInfoMessage", "");
	pageSession.set("contractsUpdateFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.ContractsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contractsUpdateFormInfoMessage", "");
		pageSession.set("contractsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contractsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(contractsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contractsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contractsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("contractsUpdate", t.data.contract._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ContractsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contractsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contractsUpdateFormErrorMessage");
	}
	
});
