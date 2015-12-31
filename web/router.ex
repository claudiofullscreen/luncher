defmodule Luncher.Router do
  use Luncher.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Luncher do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/pages", PageController
  end

  # Other scopes may use custom stacks.
  # scope "/api", Luncher do
  #   pipe_through :api
  # end
end
