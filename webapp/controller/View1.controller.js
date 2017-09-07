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
		weather: {},
		sleep: {},
		food: {},
		onPress: function(evt) {
			var steps = this.steps["activities-steps"];
			var calories = this.calories["activities-calories"];
			var sleep = this.sleep["sleep"];
			console.log(sleep[0]);
			for (var i = 0; i < sleep.length; i++) {
				/*var data = JSON.stringify({
					ID: "1000",
					DATUM: steps[i].dateTime,
					STEPS: steps[i].value,
					CALORIES: calories[i].value
				});*/
				
				/*var data = JSON.stringify({
					ID: "1000",
					DATUM: food[i].logDate,
					AMOUNT: food[i].loggedFood.amount.toFixed(2),
					// LOGID: food[i].logId,
					MEAL_NAME: food[i].loggedFood.name,
					CALORIES: food[i].nutritionalValues.calories.toFixed(2),
					MEAL_TYPE_ID: food[i].loggedFood.mealTypeId,
					FAT: food[i].nutritionalValues.fat.toFixed(2),
					PROTEIN: food[i].nutritionalValues.protein.toFixed(2),
					SODIUM: food[i].nutritionalValues.sodium.toFixed(2),
					FIBER: food[i].nutritionalValues.fiber.toFixed(2),
					CARBS: food[i].nutritionalValues.carbs.toFixed(2)
				});*/
				var data = JSON.stringify({
					ID: "1000",
					DATUM: sleep[i].dateOfSleep,
					DURATION: sleep[i].duration,
					LOGID: sleep[i].logId,
					EFFICIENCY: sleep[i].efficiency,
					MINUTES_AFTER_WAKEUP: sleep[i].minutesAfterWakeup,
					MINUTES_ASLEEP: sleep[i].minutesAsleep,
					MINUTES_AWAKE: sleep[i].minutesAwake,
					MINUTES_TO_FALL_ASLEEP: sleep[i].minutesToFallAsleep,
					AWAKE_DURATION: sleep[i].awakeDuration,
					AWAKE_COUNT: sleep[i].awakeCount,
					AWAKINGS_COUNT: sleep[i].awakeningsCount,
					RESTLESS_COUNT: sleep[i].restlessCount,
					RESTLESS_DURATION: sleep[i].restlessDuration,
					TIME_IN_BED: sleep[i].timeInBed
					// START_TIME: sleep[i].startTime,
					// END_TIME: sleep[i].endTime
				});
				
				$.ajax({
					type: "POST",
					url: "/destinations/fit_bit/Team1_Bracelet/activity.xsodata/Sleep",
					dataType: "json",
					data: data,
					cache: false,
					contentType: "application/json",
					error: function(msg, textStatus) {
						console.log(msg.getResponseHeader());
					},
					success: function() {
						console.log(data);

					}
				});
			}
		},
		
		//https://api.apixu.com/v1/current.json?key=2435e29d65104b9bb5c134721172508&q=Hamburg
		
		_loadChannelMessages: function() {

			var oView = this.getView();
			oView.setBusy(true);

			var self = this;

			// var channel = "YOUR_CHANNEL_ID";
			var token =
				// "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzQjdIOUsiLCJhdWQiOiIyMjhQQjYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTAzOTk1NzE4LCJpYXQiOjE1MDMzOTA5MTh9.ZVB6Po3bR9Pco1BXNd88nsk-7t_bXMlWADdNT39qYyo";
				"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzQjdIOUsiLCJhdWQiOiIyMjhQQjYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTA0ODU3NTg4LCJpYXQiOjE1MDQyNTI3ODh9.67r00yDrJID6pX82BSTisv02zFxJdQoP89FhKpBKuEw";
// https://api.fitbit.com/1/user/3B7H9K/activities/calories/date/2017-08-26/1d/15min.json
// https://api.fitbit.com/1/user/3B7H9K/foods/log/date/2017-08-26.json'
					
			$.ajax({
					type: 'GET',
					url: 'https://api.fitbit.com/1/user/3B7H9K/sleep/date/2017-08-05/2017-09-06.json',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).done(function(results1) {
					console.log(results1);
					self.sleep = results1;
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
					url: 'https://api.fitbit.com/1/user/3B7H9K/foods/log/date/2017-08-31.json',
					headers: {
						'Authorization': 'Bearer ' + token
					}
				}).done(function(results2) {
					console.log(results2);
					self.food = results2;
					console.log(self.food.foods[0].loggedFood.name);
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
				
				$.ajax({
					type: 'GET',
					url: 'https://api.apixu.com/v1/current.json?key=2435e29d65104b9bb5c134721172508&q=Hamburg'
				}).done(function(results2) {
					console.log(results2.current.condition.text);
					console.log(results2.current.precip_mm);
					console.log(results2.current.temp_c);
					console.log(results2);
					self.weather = results2;
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