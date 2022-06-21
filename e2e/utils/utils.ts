import { Page } from "playwright";

/**
 * Set the local storage object
 *
 * @param {Page} page
 * @param {string} key
 * @param {string} value
 * @return {*}  {Promise<void>}
 */
const setLocalStorage = async (
  page: Page,
  key: string,
  value: string
): Promise<void> => {
  await page.evaluate(
    (obj) => window.localStorage.setItem(obj.key, obj.value),
    { key: key, value: value }
  );
};

export { setLocalStorage };
