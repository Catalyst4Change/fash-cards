import puppeteer from 'puppeteer'
import fs from 'fs/promises'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let globalSymbols = []
  let globalImages = []
  let globalDescriptions = []

  for (let i = 0; i < 11; i++) {
    await page.goto('https://www.adl.org/resources/hate-symbols/search?sort_by=title&keywords=&page=' + i)
    
    const symbols = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.field--name-title')).map(element => element.textContent)
    })

    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.image-style-content-card-image-large')).map(element => element.src)
    })
    
    const descriptions = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.search-result__description')).map(element => element.textContent)
    })
    
    globalSymbols.push(...symbols)
    globalImages.push(...images)
    globalDescriptions.push(...descriptions)
  }

  const hateSymbols = () => {
    return globalSymbols.map((globalSymbol, i) => { 
      
      return {
        symbol: globalSymbol,
        image: globalImages[i],
        desc: globalDescriptions[i]
      }
    })
  } 
  await fs.writeFile("../server/data.json", JSON.stringify(hateSymbols()))

  console.log(hateSymbols) // for dramatic effect

  await browser.close()
})();