defmodule Rumbl.AuthTest do
  use Luncher.ConnCase
  alias Luncher.Auth

  setup %{conn: conn} do
    conn =
      conn
      |> bypass_through(Luncher.Router, :browser)
      |> get("/")
    {:ok, %{conn: conn}}
  end

  test "user_identified? returns true if first_name is specified in session", %{conn: conn} do
    conn = put_session(conn, :first_name, "Fred")
    assert Auth.user_identified?(conn)
  end

  test "user_identified? returns false if session does not contain first_name", %{conn: conn} do
    refute Auth.user_identified?(conn)
  end
end