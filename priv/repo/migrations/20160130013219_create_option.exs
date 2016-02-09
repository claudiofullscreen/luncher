defmodule Luncher.Repo.Migrations.CreateOption do
  use Ecto.Migration

  def change do
    create table(:options) do
      add :name, :string
      add :question_id, references(:questions)

      timestamps
    end
    create index(:options, [:question_id])

  end
end
