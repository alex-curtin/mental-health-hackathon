class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:create, :index, :show]
  
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user, status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
      token = encode(id: @user.id, name: @user.name)
      render json: {token: token, user: @user}, status: :created, location: @user
    else
      render json: @user.errors.to_a, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user, status: :ok
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      head 204
    end
  end

  def verify
    begin
      @user = {
      id: @current_user[:id],
      name: @current_user[:name],
      email: @current_user[:email],
      location: @current_user[:location]
      }
      render json: @user
    rescue
      render json: {error: 'yes'} 
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :mood, :password)
  end

end