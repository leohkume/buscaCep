const puppeteer = require('puppeteer');
const fs = require('fs');

class Correios {
  constructor() {
    this.URL = 'http://www.buscacep.correios.com.br/sistemas/buscacep/'
  }
  async findCep({ cep }) {
    let ret = {}
    const browser = await puppeteer.launch();
    await this.logs({ type: "logs", text: "const browser = await puppeteer.launch();" })
    const page = await browser.newPage();
    await this.logs({ type: "logs", text: "const page = await browser.newPage();" })
    await page.goto(this.URL);
    await this.logs({ type: "logs", text: "await page.goto(this.URL);" })
    await page.type('[name=relaxation]', cep);
    await this.logs({ type: "logs", text: "await page.type('[name=relaxation]', cep);" })
    await page.click('input.btn2.float-right');
    await this.logs({ type: "logs", text: "await page.click('input.btn2.float-right');" })

    await page.waitForXPath('/html/body/div[1]/div[3]/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody/tr[2]/td[1]')
      .then(async () => {
        await this.logs({ type: "logs", text: "page.waitForXPath('/html/body/div[1]/div[3]/div[2]/div/div/div[2]/div[2]/div[2]/table/tbody/tr[2]/td[1]')" })

        let elm = await page.$$('td');
        await this.logs({ type: "logs", text: "let elm = await page.$$('td');" })
        let end = await page.evaluate(elm => elm.textContent, elm[0]);
        await this.logs({ type: "logs", text: "let end = await page.evaluate(elm => elm.textContent, elm[0]);" })
        let bairro = await page.evaluate(elm => elm.textContent, elm[1]);
        await this.logs({ type: "logs", text: "let bairro = await page.evaluate(elm => elm.textContent, elm[1]);" })
        let local = await page.evaluate(elm => elm.textContent, elm[2]);
        await this.logs({ type: "logs", text: "let local = await page.evaluate(elm => elm.textContent, elm[2]);" })

        await browser.close();
        await this.logs({ type: "logs", text: "await browser.close();" })

        ret = {
          'cep': cep,
          'end': end,
          'bairro': bairro,
          'local': local
        }
        await this.logs({ type: "logs", text: "let ret = {'cep': cep,'end': end,'bairro': bairro,'local': local }" })

      })
    return ret;

  }
  async showLogs() {
    let ret = ""
    try {
      if (fs.existsSync('logs.txt')) {
        ret = fs.readFileSync('logs.txt').toString()
      } else {
        ret = "Você ainda não tem logs para a aplicação."
      }
    } catch(err){
      ret = "Você ainda não tem logs para a aplicação."
    }
    return ret;
  }
  async logs({ type, text }) {

    let date = new Date()
    let logs = ""

    fs.access('logs.txt', fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFile('logs.txt', "", () => {
          console.log("Arquivo criado")
        })
      } else {
        logs = fs.readFileSync('logs.txt')
      }
      fs.writeFile('logs.txt', logs + `\r ${date.toISOString()}[${type}]: ${text}`, function (err) {
        if (err) throw err;
        // console.log(`${date.toISOString()}[${type}]: ${text}`);
      });
    });



  }
}
module.exports = Correios