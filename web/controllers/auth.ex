defmodule Luncher.Auth do
  import Plug.Conn

  def init(opts) do
  end

  def call(conn, _opts \\ []) do
    first_name = get_session(conn, :first_name)
    user = first_name && %Luncher.User{first_name: first_name}

    assign(conn, :current_user, user)
  end

  def user_identified?(conn) do
    cond do
      nil == conn.assigns[:current_user] ->
        false
      true ->
        true
    end
  end
end