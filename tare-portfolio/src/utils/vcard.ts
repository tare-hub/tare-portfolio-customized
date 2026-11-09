export function downloadVCard() {
  const vcardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Tariku Meseret',
    'N:Meseret;Tariku;;;',
    'NICKNAME:Tare',
    'TITLE:Full-Stack Web Developer',
    'EMAIL;TYPE=INTERNET,PREF:meserettariku921@gmail.com',
    'URL:https://github.com/tare-hub',
    'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/tariku-meseret-b9165741b',
    'ADR;TYPE=HOME:;;Addis Ababa;;;Ethiopia',
    'NOTE:Full-Stack Web Developer specializing in Laravel, PHP, Vue 3, TypeScript, MySQL and high-performance web systems.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Tariku_Meseret_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

