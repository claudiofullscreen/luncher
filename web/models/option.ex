defmodule Luncher.Option do
  use Luncher.Web, :model

  schema "options" do
    field :name, :string
    belongs_to :question, Luncher.Question

    timestamps
  end

  @required_fields ~w(name question_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:name, min: 3, max: 100)
  end
end
