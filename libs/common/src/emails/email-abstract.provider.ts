export type SendEmailProps = {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
};

export default abstract class EmailAbstractProvider {
  abstract sendEmail(email: SendEmailProps): Promise<void>;
}
