(function() {
	var viewModel = {
		XLWB: ko.observableArray()
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

	_callJSONP(map['XLWB']);

	ko.applyBindings(viewModel);
})(); 