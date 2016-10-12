defmodule Regler.EventController do
  use Regler.Web, :controller

  alias Regler.Event

  plug Guardian.Plug.EnsureAuthenticated, handler: Regler.SessionController
  plug :scrub_params, "event" when action in [:create]

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    owned_events = current_user
      |> assoc(:owned_events)
      |> Repo.all

    render(conn, "index.json", owned_events: owned_events)
  end

  def create(conn, %{"event" => event_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:owned_events)
      |> Event.changeset(event_params)

    if changeset.valid? do
      event = Repo.insert!(changeset)

      conn
      |> put_status(:created)
      |> render("show.json", event: event)
    else
      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", changeset: changeset)
    end
  end
end
