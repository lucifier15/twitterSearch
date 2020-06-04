/**
 * Api request
 */

export const request = (requestUrl) => {
   return fetch(requestUrl)
    .then(res => res.json())
    .then((response) => {
        return response
    })
}