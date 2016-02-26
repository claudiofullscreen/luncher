defmodule Luncher.OptionView do
  use Luncher.Web, :view

  def render("option.json", %{option: option}) do
    %{
      id: option.id,
      name: option.name,
      questionId: option.question_id,
      currentScore: 32
    }
  end
end
