defmodule Luncher.Repo.Migrations.CreateQuestion do
  use Ecto.Migration

  def change do
    create table(:question) do
      add :text, :string

      timestamps
    end

  end
end
