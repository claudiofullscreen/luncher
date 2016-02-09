defmodule Luncher.Option do
  use Luncher.Web, :model

  schema "options" do
    field :name, :string
    belongs_to :question, Luncher.Question

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(name question_id)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
