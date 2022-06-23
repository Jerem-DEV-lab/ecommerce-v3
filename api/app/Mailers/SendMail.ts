import {BaseMailer, MessageContract} from '@ioc:Adonis/Addons/Mail'

export default class SendMail extends BaseMailer {
  constructor(private options, private html) {
    super();
  }


  public prepare(message: MessageContract) {
    message
      .subject(this.options.subject)
      .from('epicerie.abjat@gmail.com', "Épicerie d'Abjat sur Bandiat")
      .replyTo("epicerie.abjat@gmail.com", "Épicerie d'Abjat sur Bandiat")
      .to(this.options.sendTo)
      .html(this.html)
  }
}
