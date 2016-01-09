defmodule Luncher.Mailer do
	@config domain: Application.get_env(:luncher, :mailgun_domain),
      		key: Application.get_env(:luncher, :mailgun_key)

 	@from "test@example.com"

  use Mailgun.Client, @config

	def send_welcome_email(email_address) do
	  send_email to: email_address,
	             from: @from,
	             subject: "Welcome!",
	             text: "Greetings from the Luncher App!",
	             html: "<strong>Greetings from the Luncher App!</strong>"
	end
end