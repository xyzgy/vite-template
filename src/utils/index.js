export const isMobile = () => {
    return  !!navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
}

// 对象转URL参数 https://www.uviewui.com/js/queryParams.html
export const queryParams = (data = {}, isPrefix = true, arrayFormat = 'brackets') => {
	const prefix = isPrefix ? '?' : ''
	const _result = []
	if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets'
	for (const key in data) {
		const value = data[key]
		// 去掉为空的参数
		if (['', undefined, null].indexOf(value) >= 0) {
			continue
		}
		// 如果值为数组，另行处理
		if (value.constructor === Array) {
			// e.g. {ids: [1, 2, 3]}
			switch (arrayFormat) {
				case 'indices':
					// 结果: ids[0]=1&ids[1]=2&ids[2]=3
					for (let i = 0; i < value.length; i++) {
						_result.push(`${key}[${i}]=${value[i]}`)
					}
					break
				case 'brackets':
					// 结果: ids[]=1&ids[]=2&ids[]=3
					value.forEach((_value) => {
						_result.push(`${key}[]=${_value}`)
					})
					break
				case 'repeat':
					// 结果: ids=1&ids=2&ids=3
					value.forEach((_value) => {
						_result.push(`${key}=${_value}`)
					})
					break
				case 'comma':
					// 结果: ids=1,2,3
					let commaStr = ''
					value.forEach((_value) => {
						commaStr += (commaStr ? ',' : '') + _value
					})
					_result.push(`${key}=${commaStr}`)
					break
				default:
					value.forEach((_value) => {
						_result.push(`${key}[]=${_value}`)
					})
			}
		} else {
			_result.push(`${key}=${value}`)
		}
	}
	return _result.length ? prefix + _result.join('&') : ''
}
