defmodule Regler.EventView do
  use Regler.Web, :view

  def render("index.json", %{owned_events: owned_events}) do
    %{owned_events: owned_events}
  end

  def render("show.json", %{event: event}) do
    %{
      id: event.id,
      name: event.name,
      description: event.description,
      starts_at: event.starts_at,
      ends_at: event.ends_at
    }
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, render_detail(detail))
    end)

    %{
      errors: errors
    }
  end

  defp render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end
end
