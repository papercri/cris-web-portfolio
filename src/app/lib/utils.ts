import type { Locale } from '../i18n';

export function downloadCv(locale: Locale, onDone?: () => void) {
  const cvPath =
    locale === 'es'
      ? '/CV-ES-Cristiana-Sollini.pdf'
      : locale === 'it'
        ? '/CV-IT-Cristiana-Sollini.pdf'
        : '/CV-EN-Cristiana-Sollini.pdf';

  const link = document.createElement('a');
  link.href = cvPath;
  link.download = cvPath.split('/').pop() || 'CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  onDone?.();
}
