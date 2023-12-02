import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

dotenv.config();
const sessionCookie = process.env.SESSION;

export const getData = async (day: number) => {
  const dayUrl = `https://adventofcode.com/2023/day/${day}`;
  const inputUrl = `https://adventofcode.com/2023/day/${day}/input`;

  const data = await (await fetch(dayUrl)).text();
  const dom = new JSDOM(data);
  const document = dom.window.document;

  const info = document.querySelector('main article');
  const examples = Array.from(document.querySelectorAll<HTMLElement>('pre code')).map((e) => e.textContent);

  const input = await (await fetch(inputUrl, { headers: { Cookie: `session=${sessionCookie}` } })).text();

  return {
    info: info ? info.textContent : '',
    examples,
    input,
  };
};
