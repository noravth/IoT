sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("FitBit.controller.View1", {
		//
		onInit: function() {
			var oMessages = new JSONModel();
			this.getView().setModel(oMessages, "messages");
			this._loadChannelMessages();

		},
		calories: {},
		steps: {},
		onPress: function(evt) {
			var steps = this.steps["activities-steps"];
			var calories = this.calories["activities-calories"];
			console.log(steps);
			for (var i = 0; i < steps.length; i++) {
				var data = JSON.stringify({
					ID: "1000",
					DATUM: steps[i].dateTime,
					STEPS: steps[i].value,
					CALORIES: calories[i].value
				});

				$.ajax({
					type: "POST",
					url: "/destinations/fit_bit/Team1_Bracelet/activity.xsodata/Activity",
					dataType: "json",
					data: data,
					cache: false,
					contentType: "application/json",
					error: function(msg, textStatus) {
						console.log(textStatus);
					},
					success: function() {
						console.log(data);

					}
				});
			}
		},
		_loadChannelMessages: function() {

			var oView = this.getView();
			oView.setBusy(true);

			var self = this;

			// var channel = "YOUR_CHANNEL_ID";
			var token =
				"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzQjdIOUsiLCJhdWQiOiIyMjhQQjYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTAzOTk1NzE4LCJpYXQiOjE1MDMzOTA5MTh9.ZVB6Po3bR9Pco1BXNd88nsk-7t_bXMlWADdNT39qYyo";

			$.ajax({
					type: 'GET',
					url: 'https://api.fitbit.com/1/user/3B7H9K/activities/calories/date/2017-08-01/today.json',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).done(function(results1) {
					console.log(results1);
					self.calories = results1;
					self.getView().getModel("messages").setProperty("/data", results1.messages);
					oView.setBusy(false);
				})
				.fail(function(err) {
					oView.setBusy(false);
					if (err !== undefined) {
						var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show(oErrorResponse.message, {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});

			$.ajax({
					type: 'GET',
					url: 'https://api.fitbit.com/1/user/3B7H9K/activities/steps/date/2017-08-01/today.json',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).done(function(results2) {
					console.log(results2);
					self.steps = results2;
					// self.getView().getModel("messages").setProperty("/data", results.messages);
					oView.setBusy(false);
				})
				.fail(function(err) {
					oView.setBusy(false);
					if (err !== undefined) {
						var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show(oErrorResponse.message, {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});

		}
	});

});