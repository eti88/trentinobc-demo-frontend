export function responseError (res) {
  let message
  if (typeof res.data.error !== 'undefined') {
    if (typeof res.data.error === 'object') {
      message = Object.values(res.data.error).join(', ')
    } else if (typeof res.data.error === 'string' && res.data.error.length > 0) {
      message = res.data.error
    } else if (res.error.length > 0) {
      // eslint-disable-next-line no-console
      console.log(res.error)
      message = res.error
    }
  }
  return message
}

export function findCommonElements (a1, a2) {
  return a1.some(item => a2.includes(item))
}

/**
 * Multifilter
 * https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 */
export const multiFilter = (item, condition) => {
  const filterKeys = Object.keys(condition)
  return item.filter((eachObj) => {
    return filterKeys.every((eachKey) => {
      if (!condition[eachKey].length) {
        return true // passing an empty filter means that filter is ignored
      }
      // this works, but is not case insensitive
      // return Array.prototype.includes.call(condition[eachKey], eachObj[eachKey].toString().toLowerCase())
      const lowercaseArray = condition[eachKey].map(x => x.toString().toLowerCase())
      return Array.prototype.includes.call(lowercaseArray, eachObj[eachKey].toString().toLowerCase())
    })
  })
}

export const cleanObject = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
  return obj
}
