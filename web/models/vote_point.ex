defmodule Luncher.VotePoint do
  use Luncher.Web, :model

  schema "vote_points" do
    field :value, :integer
    belongs_to :option, Luncher.Option

    timestamps
  end

  @required_fields ~w(value option_id)
  @optional_fields ~w()

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
