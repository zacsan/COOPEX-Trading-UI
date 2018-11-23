TradingView.onready( () => {

    var Datafeed = {
	/* mandatory methods for realtime chart */
	onReady: cb => {

	    const config = {
		supported_resolutions: ["1", "5", "15", "30", "60", "240", "D"]
	    }
	    window.setTimeout( () => cb(config), 0);
	},
	// only need searchSymbols when search is enabled
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {

	    var symbol_stub = {
		name: symbolName,
		description: '',
		type: 'crypto',
		session: '24x7',
		timezone: 'Etc/UTC',
		ticker: symbolName,
		minmov: 1,
		pricescale: Math.pow(10, gon.market.bid_precision),
		has_intraday: true,
		intraday_multipliers: ["1", "5", "15", "30", "60", "240"],
		supported_resolution:  ["1", "5", "15", "30", "60", "240", "D"],
		volume_precision: 8,
		data_status: 'streaming',
	    }

	    window.setTimeout( () => onSymbolResolvedCallback(symbol_stub), 0)

	},
	getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
            console.log(resolution);
	    $.get(`https://coopex.market/api/v2/k?market=${symbolInfo.ticker.toLowerCase()}&time_from=${from}&time_to=${to}&period=${resolution}&limit=10000`, (data) => {

		var bars = data.map( (bar) => {
		    return {
			time: bar[0] * 1000,
			open: bar[1],
			high: bar[2],
			low: bar[3],
			close: bar[4],
			volume: bar[5]
		    }
		})

		onHistoryCallback(bars, {noData: false})

	    })
	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {},
	unsubscribeBars: subscriberUID => {},

	/* optional methods */
	getServerTime: cb => {},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {}
    }

    var widget = window.tvWidget = new TradingView.widget({
	debug: false,
	symbol: window.gon.market.id.toUpperCase(),
	datafeed: Datafeed, // our datafeed object
	interval: '60',
	container_id: 'tv_chart_container',
	library_path: '/trading-ui-assets/charting_library/',
	locale: 'en',
	disabled_features: ['use_localstorage_for_settings'],
	enabled_features: [],
	client_id: 'test',
	user_id: 'public_user_id',
	fullscreen: false,
	autosize: true,
	/*overrides: {
	    "paneProperties.background": "#131722",
	    "paneProperties.vertGridProperties.color": "#363c4e",
	    "paneProperties.horzGridProperties.color": "#363c4e",
	    "symbolWatermarkProperties.transparency": 90,
	    "scalesProperties.textColor" : "#AAA",
	    "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
	    "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
	}*/
    });


});  
