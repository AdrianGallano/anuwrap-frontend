import { Injectable } from '@angular/core';
import * as puppeteer from 'puppeteer';

@Injectable({
  providedIn: 'root',
})
export class PuppeteerService {
  constructor() {}

  async printWholePageContent(htmlContent: string): Promise<void> {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setContent(htmlContent);

    // // Select the element with class .whole-page
    // const element = await page.$('.whole-page');

    // if (element) {
    //   // Print the selected element
    //   await page.evaluate(element => {
    //     element.scrollIntoView();
    //   }, element);

    //   const pdf = await page.pdf({
    //     path: 'whole-page-content.pdf',
    //     format: 'A4',
    //     printBackground: true,
    //   });

    //   console.log('PDF generated successfully!');
    // } else {
    //   console.error('Element with class .whole-page not found!');
    // }

    // await browser.close();
  }
}
