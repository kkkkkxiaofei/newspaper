(function() {
	var viewModel = {
		XLWB: ko.observableArray(),
		XL_WEATHER: ko.observable(),
		JRTT: ko.observableArray()
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
		'JRTT': {
			url: 'http://toutiao.com/api/article/recent/?source=2&count=20&category=__all__&max_behot_time=1445956489.33&utm_source=toutiao&offset=0&_=1445956489505',
			callback: function(response) {
				var topics = response.data;
				var topicsWithImage = _.filter(topics, function(t){
					return t.middle_image && t.image_url && t.abstract;

				});
				viewModel.JRTT(topicsWithImage.sort(function(a, b) {
					return parseInt(b.digg_count) - parseInt(a.digg_count);
				}));
			}
		}
	}

	function _callJSONP(map) {
		$.ajax({
		  	dataType: "jsonp",
		  	url: map.url ,
		}).done(function (data) {
			map.callback(data);
		});

		// $.getJSON(map.url, {
		// 	tags: "mount rainier",
		// 	tagmode: "any",
		// 	format: "json"
		// }).done(function(data) {
		// 	map.callback(data);
		// });
	}

	function grip() {
		var keys = Object.keys(map);
		_.each(keys, function(key) {
			_callJSONP(map[key]);
		});
	}

	grip();

	ko.applyBindings(viewModel);
})(); 