const WHATSAPP_PHONE = '5511983160820'; // confirme se este número está correto e ativo no WhatsApp

const DEFAULT_MESSAGE = 'Olá! Gostaria de agendar um horário no Helena Fashion Hair.';

export function getWhatsAppLink(message: string = DEFAULT_MESSAGE): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMessage}`;
}