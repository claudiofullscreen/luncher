defmodule Luncher.Auth do
  import Plug.Conn
  # import Phoenix.Controller
  # alias Luncher.Router.Helpers
  # def init(opts) do
  # end

  # def call(conn) do
  #   conn
  # end

  def user_identified?(conn) do
    first_name = get_session(conn, :first_name)
    cond do
      nil == first_name ->
        false
      true ->
        true
    end
  end  

  # def identify_user(conn, _opts) do
  #   if conn.assigns[:current_user] do
  #     conn
  #   else
  #     conn
  #     |> put_flash(:error, "Please identify yourself")
  #     |> redirect(to: Helpers.page_path(conn, :index))
  #     |> halt()
  #   end
  # end
end