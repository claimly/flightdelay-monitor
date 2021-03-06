var pageSession = new ReactiveDict();

Template.Policies.onCreated(function() {
	
});

Template.Policies.onDestroyed(function() {
	
});

Template.Policies.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Policies.events({
	
});

Template.Policies.helpers({
	
});


Template.PoliciesPoliciesIntroReloadPolicies.onCreated(function() {
	
});

Template.PoliciesPoliciesIntroReloadPolicies.onDestroyed(function() {
	
});

Template.PoliciesPoliciesIntroReloadPolicies.onRendered(function() {
	

	pageSession.set("policiesPoliciesIntroReloadPoliciesInfoMessage", "");
	pageSession.set("policiesPoliciesIntroReloadPoliciesErrorMessage", "");

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

Template.PoliciesPoliciesIntroReloadPolicies.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPoliciesIntroReloadPoliciesInfoMessage", "");
		pageSession.set("policiesPoliciesIntroReloadPoliciesErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPoliciesIntroReloadPoliciesMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPoliciesIntroReloadPoliciesMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPoliciesIntroReloadPoliciesInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPoliciesIntroReloadPoliciesErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call('reloadDatabase', (e,r) => { 
  if (e) {
    console.log('Error reloading database: ' + e.message);
  } else {
    console.log('Database reloaded');
  }
});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
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

Template.PoliciesPoliciesIntroReloadPolicies.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPoliciesIntroReloadPoliciesInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPoliciesIntroReloadPoliciesErrorMessage");
	}
	
});

var PoliciesPoliciesListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PoliciesPoliciesListSearchString");
	var sortBy = pageSession.get("PoliciesPoliciesListSortBy");
	var sortAscending = pageSession.get("PoliciesPoliciesListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["policyId", "customer", "premium", "riskId", "actualPayout", "state", "stateTime", "stateMessage", "currency"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var PoliciesPoliciesListExport = function(cursor, fileType) {
	var data = PoliciesPoliciesListItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.PoliciesPoliciesList.onCreated(function() {
	
});

Template.PoliciesPoliciesList.onDestroyed(function() {
	
});

Template.PoliciesPoliciesList.onRendered(function() {
	pageSession.set("PoliciesPoliciesListStyle", "table");
	
});

Template.PoliciesPoliciesList.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("PoliciesPoliciesListSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("PoliciesPoliciesListSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("PoliciesPoliciesListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PoliciesPoliciesListExport(this.policies_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PoliciesPoliciesListExport(this.policies_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PoliciesPoliciesListExport(this.policies_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PoliciesPoliciesListExport(this.policies_list, "json");
	}

	
});

Template.PoliciesPoliciesList.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.policies_list || this.policies_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.policies_list && this.policies_list.count() > 0;
	},
	"isNotFound": function() {
		return this.policies_list && pageSession.get("PoliciesPoliciesListSearchString") && PoliciesPoliciesListItems(this.policies_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PoliciesPoliciesListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PoliciesPoliciesListStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("PoliciesPoliciesListStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("PoliciesPoliciesListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PoliciesPoliciesListStyle") == "gallery";
	}

	
});


Template.PoliciesPoliciesListTable.onCreated(function() {
	
});

Template.PoliciesPoliciesListTable.onDestroyed(function() {
	
});

Template.PoliciesPoliciesListTable.onRendered(function() {
	
});

Template.PoliciesPoliciesListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PoliciesPoliciesListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PoliciesPoliciesListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PoliciesPoliciesListSortAscending") || false;
			pageSession.set("PoliciesPoliciesListSortAscending", !sortAscending);
		} else {
			pageSession.set("PoliciesPoliciesListSortAscending", true);
		}
	}
});

Template.PoliciesPoliciesListTable.helpers({
	"tableItems": function() {
		return PoliciesPoliciesListItems(this.policies_list);
	}
});


Template.PoliciesPoliciesListTableItems.onCreated(function() {
	
});

Template.PoliciesPoliciesListTableItems.onDestroyed(function() {
	
});

Template.PoliciesPoliciesListTableItems.onRendered(function() {
	
});

Template.PoliciesPoliciesListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("policies.details", mergeObjects(Router.currentRouteParams(), {policyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("policiesUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("policiesRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.PoliciesPoliciesListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
