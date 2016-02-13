defmodule Luncher.OptionTest do
  use Luncher.ModelCase

  alias Luncher.Option

  @valid_attrs %{name: "some content", question_id: 3}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Option.changeset(%Option{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Option.changeset(%Option{}, @invalid_attrs)
    refute changeset.valid?
  end
end
