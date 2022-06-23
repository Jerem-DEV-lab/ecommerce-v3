import {BaseMailer, MessageContract} from '@ioc:Adonis/Addons/Mail'
import View from "@ioc:Adonis/Core/View";

export default class ReplyMessage extends BaseMailer {
  constructor(private message, private options) {
    super();
  }
  public html = View.render('emails/welcome.edge', {content_message: this.message})

  public prepare(message: MessageContract) {
    message
      .subject('Réponse à votre demande de contact')
      .from('epicerie.abjat@gmail.com', "Épicerie d'Abjat sur Bandiat")
      .replyTo("epicerie.abjat@gmail.com", "Épicerie d'Abjat sur Bandiat")
      .to(this.options.replyTo)
      .html(this.html)
  }
}
