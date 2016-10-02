defmodule Regler.PageController do
  use Regler.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
