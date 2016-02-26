require IEx
defmodule Luncher.QuestionChannel do
  use Luncher.Web, :channel

  def join("questions:" <> question_id, _params, socket) do
    question_id = String.to_integer(question_id)
    question = Repo.get!(Luncher.Question, question_id)
    options = Repo.all(
      from o in Luncher.Option,
      where: o.question_id == ^question_id,
      order_by: o.inserted_at
    )

    resp = %{
      question: Phoenix.View.render_one(
        question, Luncher.QuestionView, "question.json"
      ),
      options: Phoenix.View.render_many(
        options, Luncher.OptionView, "option.json"
      )
    }

    {:ok, resp, assign(socket, :question_id, question_id)}
  end

  def handle_in("new_option_added", params, socket) do
    option_params = %{name: params["name"], question_id: socket.assigns.question_id}
    changeset = Luncher.Option.changeset(%Luncher.Option{}, option_params)
    {:ok, option} = Repo.insert changeset

    broadcast! socket, "new_option_added", %{name: params["name"], id: option.id}
    {:reply, :ok, socket}
  end

  def handle_in("new_vote_point", params, socket) do
    vp_params = %{option_id: params["option_id"], value: params["value"]}

    changeset = Luncher.VotePoint.changeset(%Luncher.VotePoint{}, vp_params)
    Repo.insert changeset

    broadcast! socket, "new_vote_point", vp_params
    {:reply, :ok, socket}
  end
end
