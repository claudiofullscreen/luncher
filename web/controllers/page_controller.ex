defmodule Luncher.PageController do
  use Luncher.Web, :controller

  def create(conn, _params) do
    Luncher.Mailer.send_welcome_email(_params["email_data"]["email"])
    redirect conn, to: page_path(conn, :show, 3)
  end

  def index(conn, _params) do
    render conn, "index.html"
  end

  def new(conn, _params) do
    render conn, "new.html"
  end

  def show(conn, _params) do
    render conn, "show.html"
  end
end
