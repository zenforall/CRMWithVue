/**
 *  @param cssClassName
 *  Il nome della classe CSS deve essere preceduto dal carattere .
 *  Ad esempio : Se il nome della classe v-label --> Il vero nome della classe è .v-label
 *
 * @returns
 */

export function CssClassInfo(cssClassName: string) : string {
  const element = document.querySelector(cssClassName);
  if (element) {
      const styles = getComputedStyle(element);
      const cssProperties: { [key: string]: string } = {};

      for (let i = 0; i < styles.length; i++) {
          const propertyName = styles[i];
          cssProperties[propertyName] = styles.getPropertyValue(propertyName);
      }

      return JSON.stringify(cssProperties);
  } else {
      return "No Class "+cssClassName+" found!";
  }
}
