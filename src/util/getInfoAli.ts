import { Orders } from '../Interface/Orders';

export const getInfoAli = () => {
  const elementoInput: HTMLInputElement | null = document.querySelector(
    '.comet-checkbox-group',
  );
  const object: Array<Orders> = [];
  if (elementoInput) {
    try {
      const items = elementoInput.children;
      Array.from(items).forEach((element) => {
        object.push({
          fecha: element
            .querySelector(
              'div.order-item-header > div.order-item-header-right > div > div:nth-child(1)',
            )
            ?.textContent.replace('Pedido efectuado el:', ''),
          estado: element.querySelector(
            ' div.order-item-header > div.order-item-header-status > span',
          )?.textContent,
          nombre: element.querySelector(
            'div.order-item-content-body > div > div.order-item-content-info-name > a > span',
          )?.textContent,
          precioUni: Number(
            element
              .querySelector(
                'div.order-item-content-body > div > div.order-item-content-info-number > div',
              )
              ?.textContent.replace(/\D/g, ''),
          ),
          cantidad: Number(
            element
              .querySelector(
                'div.order-item-content-body > div > div.order-item-content-info-number > span',
              )
              ?.textContent.replace(/\D/g, ''),
          ),
          url: element
            .querySelector(' div.order-item-store > span > a')
            ?.getAttribute('href')
            .replace('//', ''),
          urlImagen: element
            .querySelector(
              'div.order-item-content > div.order-item-content-body > a > div',
            )
            ?.getAttribute('style')
            .match(/https:\/\/[^'")]*/)[0]
            .replace('_220x220.jpg', ''),
          precioTotal: Number(
            element
              .querySelector(
                'div.order-item-content > div.order-item-content-opt > div.order-item-content-opt-price > span > div',
              )
              .textContent.replace(/\D/g, ''),
          ),
        });
      });
      return new Promise((resolve) => {
        resolve(object);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.error('Elemento no encontrado');
  }
};
