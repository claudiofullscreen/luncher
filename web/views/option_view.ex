defmodule Luncher.OptionView do
  use Luncher.Web, :view

  def render("option.json", %{option: option}) do
    %{
      id: option.id,
      name: option.name,
      question_id: option.question_id
    }
  end
end
