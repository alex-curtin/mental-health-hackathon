class AuthenticationController < ApplicationController
  # POST /auth/login
  def login
    @user = User.find_by_name(params[:name])
    if @user.authenticate(params[:password]) # authenticate method provided by Bcrypt and 'has_secure_password'
      token = encode(id: @user.id, name: @user.name)
      render json: { token: token , user: {id: @user.id, name: @user.name}}, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:name, :password)
  end
end