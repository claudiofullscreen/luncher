defmodule Luncher.Repo.Migrations.CreateVotePoint do
  use Ecto.Migration

  def change do
    create table(:vote_points) do
      add :value, :integer
      add :option_id, references(:options, on_delete: :nothing)

      timestamps
    end
    create index(:vote_points, [:option_id])

  end
end
