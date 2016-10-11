defmodule Regler.Event do
  use Regler.Web, :model

  schema "events" do
    field :name, :string
    field :description, :string
    field :starts_at, Ecto.DateTime
    field :ends_at, Ecto.DateTime
    belongs_to :user, Regler.User

    timestamps()
  end

  @required_fields ~w(name starts_at ends_at user_id)
  @optional_fields ~w(description)

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
