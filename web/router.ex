defmodule Luncher.Router do
  use Luncher.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Luncher.Auth
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Luncher.Auth
  end

  scope "/api", Luncher do
    pipe_through :api

    get "/session", SessionController, :show
    delete "/session", SessionController, :delete
    post "/session", SessionController, :create
  end

  scope "/", Luncher do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/signup", SignupController
    resources "/questions", QuestionController
    resources "/options", OptionController
  end

  # Other scopes may use custom stacks.
  # scope "/api", Luncher do
  #   pipe_through :api
  # end
end
