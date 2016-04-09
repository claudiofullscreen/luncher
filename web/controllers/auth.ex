defmodule Luncher.Auth do
  import Plug.Conn

  def init(opts) do
  end

  def call(conn, _opts \\ []) do
    first_name = get_session(conn, :first_name)
    uuid = get_session(conn, :uuid)

    cond do
      first_name && uuid ->
        put_current_user(conn)
      true ->
        clear_current_user(conn)
    end
  end

  def user_identified?(conn) do
    cond do
      nil == conn.assigns[:current_user] ->
        false
      true ->
        true
    end
  end

  defp put_current_user(conn) do
    user = %Luncher.User{
      first_name: get_session(conn, :first_name),
      uuid:  get_session(conn, :uuid)
    }
    token = Phoenix.Token.sign(conn, "user socket", user.uuid)
    conn
    |> assign(:current_user, user)
    |> assign(:user_token, token)
  end

  defp clear_current_user(conn) do
    conn
    |> assign(:current_user, nil)
    |> assign(:user_token, nil)
  end

end