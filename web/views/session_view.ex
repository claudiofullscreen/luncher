defmodule Luncher.SessionView do
  use Luncher.Web, :view
  def render("create.json", options) do
    %{}
  end

  def render("show.json", options ) do
    %{data: options[:current_user]}
  end

  def render("delete.json", options) do
    %{}
  end
end