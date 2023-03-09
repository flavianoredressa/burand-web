export function onlyDigits(text: string): string {
  return text.replace(/\D/g, '');
}
