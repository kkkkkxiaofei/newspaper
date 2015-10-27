(function() {
	var viewModel = {
		XLWB: ko.observableArray(),
		XL_WEATHER: ko.observable()
	}
	var map = {
		'XLWB': { 
					url: 'http://cre.mix.sina.com.cn/api/v3/get?cre=sinapc&mod=picg&statics=1&merge=3&type=1&length=20&cateid=t_s&fields=url,stitle,title,thumb&callback=?',
					callback: function(response) {
						viewModel.XLWB(_.map(response.data, function(data) {
							return {
								thumb: data.thumb,
								title: data.title,
								url: data.url
							}
						}));
					}
				},
		'XL_WEATHER': { 
			url: 'http://open.weather.sina.com.cn/api/weather/sinaForecast?length=1&air=1&city=%E8%A5%BF%E5%AE%89&callback=?',
			callback: function(response) {
				console.log(response);
				viewModel.XL_WEATHER({
					location: response.result.data.info.name,
					dayWeatherTemperature: response.result.data.days.day[0].day_temperature,
					dayWeatherType: response.result.data.days.day[0].day_weather_type,
					dayWindPower: response.result.data.days.day[0].day_wind_power,
					dayWindType: response.result.data.days.day[0].day_wind_type,
					nightWeatherTemperature: response.result.data.days.day[0].night_temperature,
					nightWeatherType: response.result.data.days.day[0].night_weather_type,
					nightWindPower: response.result.data.days.day[0].night_wind_power,
					nightWindType: response.result.data.days.day[0].night_wind_type
				});
			}
		},
		'JRTT': 'http://i.snssdk.com/2/article/hot_comments/?callback=jQuery11110026725587202236056_1445440133029&_=1445440133030',
		'JRTT1': 'http://i.snssdk.com/2/article/hot_comments/?callback=?',

	}

	function _callJSONP(map) {
		// $.ajax({
		//   	dataType: "jsonp",
		//   	url: url ,
		// }).done(function (data) {
		// 	console.log(data);
		// });

		$.getJSON(map.url, {
			tags: "mount rainier",
			tagmode: "any",
			format: "json"
		}).done(function(data) {
			map.callback(data);
		});
	}

	_callJSONP(map['XL_WEATHER']);

	ko.applyBindings(viewModel);
})(); 