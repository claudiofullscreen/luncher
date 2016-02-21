defmodule Luncher.QuestionView do
  use Luncher.Web, :view

  def render("question.json", %{question: question}) do
    %{
      id: question.id,
      text: question.text
    }
  end  
end
