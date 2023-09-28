/* eslint-disable no-undef */
;(function () {
  const useSSL = document.location.protocol == 'https:'
  const src =
    (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js'
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>')
})()

window.googletagSetup = false

const _id = setInterval(() => {
  if (googletagSetup) return clearInterval(_id)

  // if (
  //   document.querySelector('#div-gpt-ad-1560871604785-0') ||
  //   document.querySelector('#div-gpt-ad-1560419662721-0')
  // ) {
  if (googletag) {
    googletag?.cmd.push(function () {
      // window['mobiblanc_Pave-2M-MC'] = googletag
      //   .defineSlot(
      //     '/6013939/Pave-2M-MC',
      //     [300, 250],
      //     'div-gpt-ad-1479752411871-0'
      //   )
      //   .addService(googletag?.pubads())
      // window['mobiblanc_Hab-2M-MC'] = googletag
      //   .defineSlot('/6013939/Hab-2M-MC', [1, 1], 'div-gpt-ad-1479752411871-1')
      //   .addService(googletag?.pubads())

      // window.mobiblanc_InVideo = googletag
      //   .defineSlot('/6013939/InVideo', [1, 1], 'div-gpt-ad-1478877602753-0')
      //   .setTargeting('Category', [
      //     'CULTURE',
      //     'EVENT',
      //     'HP',
      //     'INFOS',
      //     'MAG',
      //     'PROGRAMME',
      //   ])
      //   .addService(googletag?.pubads())

      // window.mobiblanc_Habillage_FIGAM = googletag
      //   .defineSlot(
      //     '/6013939/Habillage_FIGAM',
      //     [1, 1],
      //     'div-gpt-ad-1489504070112-0'
      //   )
      //   .addService(googletag?.pubads())
      // window.mobiblanc_Habillage_RAG = googletag
      //   .defineSlot(
      //     '/6013939/Habillage_RAG',
      //     [1, 1],
      //     'div-gpt-ad-1489504133716-0'
      //   )
      //   .addService(googletag?.pubads())

      // window.mobiblanc_Pixel_Desk = googletag
      //   .defineSlot('/6013939/Pixel_Desk', [1, 1], 'div-gpt-ad-1511866594796-0')
      //   .addService(googletag?.pubads())

      // window.mobiblanc_970x90_250_AR = googletag
      //   .defineSlot(
      //     '/6013939/970x90//250_AR',
      //     [
      //       [970, 90],
      //       [970, 250],
      //     ],
      //     'div-gpt-ad-1560871604785-0'
      //   )
      //   .addService(googletag?.pubads())
      // window.mobiblanc_Habillage = googletag
      //   .defineSlot('/6013939/Habillage', [1, 1], 'div-gpt-ad-1475227514533-3')
      //   .setTargeting('Category', [
      //     'CULTURE',
      //     'EVENT',
      //     'HP',
      //     'INFOS',
      //     'MAG',
      //     'PROGRAMME',
      //   ])
      //   .addService(googletag?.pubads())
      // window.mobiblanc_Habillage_Meteo = googletag
      //   .defineSlot(
      //     '/6013939/Habillage_Meteo',
      //     [1, 1],
      //     'div-gpt-ad-1475227514533-4'
      //   )
      //   .setTargeting('Category', ['Meteo'])
      //   .addService(googletag?.pubads())
      // window.mobiblanc_Habillage_JAK_AR = googletag
      //   .defineSlot(
      //     '/6013939/Habillage_JAK_AR',
      //     [1, 1],
      //     'div-gpt-ad-1489599938026-0'
      //   )
      //   .addService(googletag?.pubads())
      // window.mobiblanc_300x250_600_Desk = googletag
      //   .defineSlot(
      //     '/6013939/300x250//600_Desk',
      //     [
      //       [300, 600],
      //       [300, 250],
      //     ],
      //     'div-gpt-ad-1560419662721-0'
      //   )
      //   .addService(googletag?.pubads())

      googletag?.pubads().enableSingleRequest()
      googletag?.pubads().collapseEmptyDivs()
      googletag?.pubads().enableSyncRendering()
      googletag?.enableServices()

      // googletag?.display('div-gpt-ad-1560871604785-0')
      // googletag?.display('div-gpt-ad-1560419662721-0')
    })
    googletagSetup = true
  }
}, 1e3)
