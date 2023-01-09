export function currencyFetch () {
  return fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then(r => r.json())
    .catch(err => {
      console.log(err)})
}