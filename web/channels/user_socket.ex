defmodule Regler.UserSocket do
  use Phoenix.Socket

  alias Regler.{ GuardianSerializer }

  ## Channels
  channel "users:*", Regler.UserChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case GuardianSerializer.from_token(claims["sub"]) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error


  def id(socket), do: "users_socket:#{socket.assings.current_user.id}"
end
