defmodule Luncher.Mailer do
  use Mailgun.Client,
      domain: Application.get_env(:luncher, :mailgun_domain),
      key: Application.get_env(:luncher, :mailgun_key)

 	@from "test@example.com"

	def send_welcome_email(email_address) do
	  send_email to: email_address,
	             from: @from,
	             subject: "Welcome!",
	             text: "Greetings from the Real Luncher!",
	             html: "<strong>Greetings from the Real Luncher!</strong>"
	end
end