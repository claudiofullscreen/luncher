defmodule Luncher.VotePointTest do
  use Luncher.ModelCase

  alias Luncher.VotePoint

  @valid_attrs %{value: 42, option_id: 32}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = VotePoint.changeset(%VotePoint{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = VotePoint.changeset(%VotePoint{}, @invalid_attrs)
    refute changeset.valid?
  end
end
