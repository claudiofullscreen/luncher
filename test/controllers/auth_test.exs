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

  test "call adds user to assigns if first_name defined in session", %{conn: conn} do
    conn =
      conn
      |> put_session(:first_name, "Jim")
      |> Auth.call()

    assert conn.assigns.current_user.first_name == "Jim"
  end

  test "call with no first name in session sets current_user assign to nil", %{conn: conn} do
    conn = Auth.call(conn)
    assert conn.assigns.current_user == nil
  end

  test "user_identified? returns true if current user exists", %{conn: conn} do
    conn = assign(conn, :current_user, %{user_is_not: nil})
    assert Auth.user_identified?(conn)
  end

  test "user_identified? returns false if current user does not exist", %{conn: conn} do
    refute Auth.user_identified?(conn)
  end
end