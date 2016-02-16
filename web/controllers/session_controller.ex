defmodule Luncher.SessionController do
  use Luncher.Web, :controller

  def create(conn, %{"session" => %{"first_name" => first_name}}) do
    conn
    |> put_session(:first_name, first_name)
    |> render
  end

  def show(conn, _) do
    render(conn, current_user: conn.assigns[:current_user])
  end

  def delete(conn, _) do
    conn
    |> clear_session
    |> render
  end
end
