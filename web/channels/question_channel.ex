defmodule Luncher.QuestionChannel do
  use Luncher.Web, :channel

  def join("questions:" <> question_id, _params, socket) do
    question_id = String.to_integer(question_id)
    question = Repo.get!(Luncher.Question, question_id)
    question = Repo.preload(question, :options)

    resp = %{
      question: Phoenix.View.render_one(
        question, Luncher.QuestionView, "question.json"
      ),
      options: Phoenix.View.render_many(
        question.options, Luncher.OptionView, "option.json"
      )
    }

    {:ok, resp, assign(socket, :question_id, question_id)}
  end

  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push socket, "ping", %{count: count}

    {:noreply, assign(socket, :count, count+ 1)}
  end
end