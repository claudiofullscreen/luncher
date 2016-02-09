defmodule Luncher.OptionController do
  use Luncher.Web, :controller

  alias Luncher.Option

  plug :scrub_params, "option" when action in [:create]

  def create(conn, %{"option" => option_params}) do
    changeset = Option.changeset(%Option{}, option_params)
    case Repo.insert(changeset) do
    {:ok, _option} ->
      conn
      |> put_flash(:info, "Option created successfully.")
      |> redirect(to: question_path(conn, :index))
    {:error, changeset} ->
      render(conn, Luncher.QuestionView, "new.html", changeset: changeset)
    end
	end
end