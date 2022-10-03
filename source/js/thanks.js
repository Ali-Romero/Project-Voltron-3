function getTitleTemplate(name, city) {
  var name = name || 'Спасибо'
  var nameTemplate = [
    '<h1 class="thanks-section__title">',
    name,
    ',',
    ' благодарим Вас',
    '<span>',
    ' за обращение в компанию VOLTRON©',
    '</span>',
    '</h1>',
  ]
  var cityTemplate = [
    '<h1 class="thanks-section__title">',
    name,
    ',',
    ' благодарим Вас ',
    '<span>',
    'за заявку на город ',
    city,
    ' на франшизу VOLTRON©',
    '</span>',
    '</h1>',
  ]

  return city ? cityTemplate.join('') : nameTemplate.join('')
}

function getDocumentTitle(name) {
  return name
    ? name + ', спасибо, ваша заявка принята'
    : 'Cпасибо, ваша заявка принята'
}

function setTitle() {
  var lead_name = localStorage.getItem('lead_name')
  var city = localStorage.getItem('city')
  
  document.querySelector('[data-thanks-title]').innerHTML = getTitleTemplate(lead_name, city)
  document.title = getDocumentTitle(lead_name)
}

$(document).ready(function () {
  setTitle()
})
